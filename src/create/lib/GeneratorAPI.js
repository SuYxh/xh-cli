const path = require('path')
const { promisify } = require('util')
const glob = promisify(require('glob'))
const { extractCallDir, mergeDeps, isObject, isString } = require('../../utils/index')
const fs = require('fs-extra')
const { isBinaryFile } = require('isbinaryfile')
const { render } = require('ejs')
const { runTransformation } = require('vue-codemod')
class GeneratorAPI {
  constructor(id, creator, options) {
    this.id = id
    this.creator = creator
    this.options = options
  }
  get entryFile() {
    return 'src/index.js'
  }
  async _injectFileMiddleware(middleware) {
    this.creator.fileMiddlewares.push(middleware)
  }
  injectImport(file, newImport) {
    // 这一步只是缓存数据，并不影响代码
    if (!this.creator.imports[file]) this.creator.imports[file] = []
    this.creator.imports[file].push(newImport)
  }
  transformScript(file, codemod, options = {}) {
    this._injectFileMiddleware((files) => {
      files[file] = runTransformation({ path: file, source: files[file] }, codemod, options)
    })
  }
  // 把模板进行渲染并输出到项目
  render(templateDir) {
    const execDir = extractCallDir()
    if (isString(templateDir)) {
      templateDir = path.resolve(execDir, templateDir)
      this._injectFileMiddleware(async (files, projectOptions) => {
        const templateFiles = await glob('**/*', {
          cwd: templateDir,
          nodir: true
        }) //['routesConfig.js','App.js.ejs']
        for (let i = 0; i < templateFiles.length; i++) {
          let templateFile = templateFiles[i]
          //key是文件名 值是模板文件渲染的结果
          files[templateFile] = await renderFile(
            path.resolve(templateDir, templateFile),
            projectOptions
          )
        }
      })
    }
  }
  //添加依赖包
  extendPackage(toMerge) {
    const pkg = this.creator.pkg
    for (const key in toMerge) {
      const value = toMerge[key]
      let existing = pkg[key]
      if (isObject(value) && (key === 'dependencies' || key === 'devDependencies')) {
        pkg[key] = mergeDeps(existing || {}, value)
      } else {
        pkg[key] = value
      }
    }
  }
}
async function renderFile(templatePath, projectOptions) {
  if (await isBinaryFile(templatePath)) {
    return await fs.readFile(templatePath) //返回Buffer
  }
  let template = await fs.readFile(templatePath, 'utf8')
  return render(template, projectOptions)
}
module.exports = GeneratorAPI
