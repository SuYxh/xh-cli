const { prompt } = require('inquirer')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const fs = require('fs-extra')
const { red } = require('chalk')
const userhome = require('userhome')
const execa = require('execa')
const clone = promisify(require('clone-git-repo'))
const {
  log,
  config,
  withLoading,
  request,
  loadModule,
  writeFileTree
} = require('../../utils/index')
const { TEMPLATES } = require('../../settings/index')
const PromptModuleAPI = require('./PromptModuleAPI')
const path = require('path')
const GeneratorAPI = require('./GeneratorAPI')
const { isBinaryFile } = require('isbinaryfile')
const { runTransformation } = require('vue-codemod')

const defaultFeaturePrompt = {
  name: 'features',
  type: 'checkbox',
  message: '请选择项目特性:',
  choices: []
}

class Creator {
  constructor(projectName, projectDir, promptModules) {
    // projectName: create 命令后面的字符串
    // projectDir: /Users/jarvis/Desktop/xh-cli/tmp 执行命令的路径
    // promptModules:  [ [Function (anonymous)] ] 一个函数数组

    // 项目名称
    this.projectName = projectName
    // 项目路径
    this.projectDir = projectDir
    this.promptModules = promptModules
    // 默认选项框
    this.featurePrompt = defaultFeaturePrompt
    // 由 promptModules 插入的新的选项框
    this.injectPrompts = []
    // 选择结束的回调数组
    this.promptCompleteCbs = []

    // 启用的插件
    this.plugins = []
    // 文件处理的中间件数组
    this.fileMiddlewares = []
    // 此处存放文件里额外添加的import语句
    this.imports = {}
    // key是文件路径，值是文件内容 插件在执行过程中写入的都是这个对象files， 最后再统一写入硬盘
    this.files = {}

    // 向 featurePrompt.choices 、injectPrompts、promptCompleteCbs 插入一些值
    const promptModuleAPI = new PromptModuleAPI(this)
    promptModules.forEach((module) => module(promptModuleAPI))
  }

  async create() {
    // 获取选择项，内容大致如下：
    // {
    //   // plugins：包名：对应的配置数据，prompt 选择后的数据
    //   plugins: { 'cli-plugin-router': { historyMode: 'hash' } },
    //   historyMode: 'hash',
    //   appTitle: 'AppTitle'
    // }
    const projectOptions = (this.projectOptions = await this.promptAndResolve())
    // console.log('projectOptions', projectOptions)

    // 准备项目目录
    await this.prepareProjectDir()

    // 下载模板，给 templateDir 赋值
    await this.downloadTemplate()

    //把项目拷贝到模板中
    await fs.copy(this.templateDir, this.projectDir)

    // 修改当前项目中package.json的开发依赖，添加插件的依赖
    const pkgPath = path.join(this.projectDir, 'package.json')
    const pkg = (this.pkg = await fs.readJSON(pkgPath))
    const pluginDeps = Reflect.ownKeys(projectOptions.plugins) // ['cli-plugin-router']
    pluginDeps.forEach((dep) => (pkg.devDependencies[dep] = 'latest'))
    await fs.writeJSON(pkgPath, pkg, { spaces: 2 })

    //初始化git仓库
    // await execa("git", ["init"], { cwd: this.projectDir, stdio: "inherit" });
    // log.info("vite100", "在%s安装依赖", this.projectDir);
    // await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });

    //初始化files对象
    await this.initFiles()
    // console.log("this.files", this.files);
    //找到插件并执行插件
    let innerPlugins = projectOptions.plugins //内置插件对象
    let customPlugins = Object.keys(pkg.devDependencies).filter((npmName) =>
      npmName.startsWith('cli-')
    )
    let pluginObj = {}
    customPlugins.forEach((pluginName) => {
      pluginObj[pluginName] = {}
    })
    // 在这里可以增加一次去重
    const resolvedPlugins = await this.resolvePlugins({
      ...innerPlugins,
      ...pluginObj
    })
    // console.log('resolvedPlugins', resolvedPlugins)
    // 执行应用插件，执行插件的时候只是添加了中间件的函数
    await this.applyPlugins(resolvedPlugins)
    // 插件执行的时候 并不会真正的修改this.files,而是会修改this.imports  this.fileMiddlewares
    // 开始调用中间件真正处理文件 this.files
    await this.renderFiles()

    //此插件只在项目生成阶段有用，后面开发运行是没有用的，所以删除掉
    pluginDeps.forEach((dep) => delete pkg.devDependencies[dep])
    this.files['package.json'] = JSON.stringify(pkg, null, 2)
    // 把files写入项目目录
    await writeFileTree(this.projectDir, this.files)
    // 因为插件可能会扩展依赖包 react-router-dom
    // await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });
  }

  async downloadTemplate() {
    // 获取配置信息
    const { GIT_TYPE, ORG_NAME } = config

    // 读取模板列表
    const repos = await withLoading('读取模板列表', async () =>
      request.get(`/orgs/${ORG_NAME}/repos`)
    )

    const { repo } = await prompt({
      name: 'repo',
      type: 'list',
      message: '请选择模板',
      choices: repos.map((repo) => repo.name)
    })

    // 读取标签列表
    const tags = await withLoading('读取标签列表', async () =>
      request.get(`/repos/${ORG_NAME}/${repo}/tags`)
    )

    let _tag = null
    if (tags?.length) {
      const { tag } = await prompt({
        name: 'tag',
        type: 'list',
        message: '请选择版本',
        choices: tags
      })
      _tag = tag
    }

    // 拼接仓库地址
    let repository = GIT_TYPE + `:${ORG_NAME}/${repo}`
    if (_tag) {
      repository += `#${_tag}`
    }

    // 下载的目录
    const downloadDirectory = userhome(TEMPLATES)
    const _downloadDirectory = _tag
      ? `${downloadDirectory}/${repo}/${_tag}`
      : `${downloadDirectory}/${repo}`

    const templateDir = (this.templateDir = _downloadDirectory)

    log.info('Creator', '准备下载模板到%s', templateDir)

    try {
      // 如果目录存在了，就不在 clone 了
      await fs.access(templateDir)
    } catch (error) {
      log.info('Creator', '从仓库下载%s', repository)
      await clone(repository, templateDir, { clone: true })
    }
  }

  async prepareProjectDir() {
    let { projectDir } = this
    try {
      await fs.access(projectDir)
      const files = await fs.readdir(projectDir)
      if (files.length > 0) {
        const { overwrite } = await prompt({
          type: 'confirm',
          name: 'overwrite',
          message: `目标目录非空，是否要移除存在的文件并继续?`
        })
        if (overwrite) {
          await fs.emptyDir(projectDir)
        } else {
          throw new Error(red('X') + ' 操作被取消')
        }
      }
    } catch (error) {
      await fs.mkdirp(projectDir)
    }
    log.info('create命令', '%s目录已经准备就绪', projectDir)
  }

  async renderFiles() {
    const { files, projectOptions } = this
    for (const middleware of this.fileMiddlewares) {
      await middleware(files, projectOptions)
    }
    Reflect.ownKeys(files).forEach((file) => {
      let imports = this.imports[file]
      if (imports && imports.length > 0) {
        files[file] = runTransformation(
          { path: file, source: files[file] },
          require('./codemod/injectImports'),
          { imports }
        )
      }
    })
  }

  // 把当前项目中的文件全部写入 this.files 里，等待被改写或者处理
  async initFiles() {
    const projectFiles = await glob('**/*', {
      cwd: this.projectDir,
      nodir: true,
      ignore: '**/node_modules/**'
    })
    // console.log('projectFiles', projectFiles)
    // [
    //   'package-lock.json',
    //   'package.json',
    //   'README.md',
    //   'src/App.js',
    //   'src/index.html',
    //   'src/index.js',
    //   'webpack.config.js',
    //   'yarn.lock'
    // ]
    for (let i = 0; i < projectFiles.length; i++) {
      let projectFile = projectFiles[i]
      let projectFilePath = path.join(this.projectDir, projectFile)
      let content
      if (await isBinaryFile(projectFilePath)) {
        content = await fs.readFile(projectFilePath)
      } else {
        content = await fs.readFile(projectFilePath, 'utf8')
      }
      this.files[projectFile] = content
    }
  }

  async applyPlugins(plugins) {
    for (const plugin of plugins) {
      const { id, apply, options } = plugin
      const generatorAPI = new GeneratorAPI(id, this, options)
      await apply(generatorAPI, options)
    }
  }
  async resolvePlugins(rawPlugins) {
    // {'cli-plugin-router':{}}
    let plugins = []
    for (const id of Reflect.ownKeys(rawPlugins)) {
      // apply 是一个函数
      const apply = loadModule(`${id}/generator`, this.projectDir)
      // 插件配置的选项 { historyMode:'hash' }
      const options = rawPlugins[id]
      plugins.push({ id, apply, options })
    }
    return plugins
  }

  async promptAndResolve() {
    let prompts = [this.featurePrompt, ...this.injectPrompts]
    let answers = await prompt(prompts)
    let projectOptions = { plugins: {} }
    this.promptCompleteCbs.forEach((cb) => cb(answers, projectOptions))
    return projectOptions
  }
}

module.exports = Creator
