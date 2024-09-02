const path = require('path')
const { red } = require('chalk')
const execa = require('execa')
const { prompt } = require('inquirer')
const fs = require('fs-extra')
const { config, log } = require('../utils/index')
const Creator = require('./lib/Creator')
const getPromptModules = require('./lib/getPromptModules')

async function factory(argv) {
  const { currentDirectory, projectName } = argv
  const { GIT_TYPE, ORG_NAME } = config
  if (!GIT_TYPE) {
    throw new Error(red('X') + ' 尚未配置仓库类型!')
  }
  if (!ORG_NAME) {
    throw new Error(red('X') + ' 尚未配置组织名称!')
  }
  const projectDir = path.join(currentDirectory, projectName)
  log.info('create命令', '创建的项目目录为%s', projectDir)

  const promptModules = getPromptModules()
  console.log('promptModules', promptModules) //函数的数组

  const creator = new Creator(projectName, projectDir, promptModules)
  await creator.create()

  // 启动服务
  // log.info("vite100", "启动服务");
  // await execa("npm", ["run", "dev"], { cwd: projectDir, stdio: "inherit" });
}

module.exports = factory
