const path = require('path')
const execa = require('execa')
const { config, log, setConfig } = require('../utils/index')
const Creator = require('./lib/Creator')
const getPromptModules = require('./lib/getPromptModules')
const {
  DEFAULT_GIT_TYPE,
  DEFAULT_ORG_NAME,
  GIT_TYPE_KEY,
  ORG_NAME_KEY
} = require('../settings/index')

async function factory(argv) {
  const { currentDirectory, projectName } = argv
  const { GIT_TYPE, ORG_NAME, autoStart } = config

  if (!GIT_TYPE) {
    await setConfig(GIT_TYPE_KEY, DEFAULT_GIT_TYPE)
  }
  if (!ORG_NAME) {
    await setConfig(ORG_NAME_KEY, DEFAULT_ORG_NAME)
  }

  const projectDir = path.join(currentDirectory, projectName)

  const promptModules = getPromptModules()

  const creator = new Creator(projectName, projectDir, promptModules)
  await creator.create()

  // 启动服务
  if (autoStart) {
    log.info('启动服务')
    // TODO 判断一下当前使用的包管理工具，然后使用对应的包管理工具进行启动
    await execa('npm', ['run', 'dev'], { cwd: projectDir, stdio: 'inherit' })
  }
}

module.exports = factory
