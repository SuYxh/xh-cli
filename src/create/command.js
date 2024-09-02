// const { executeNodeScript } = require('../utils/index')
// const { COMMAND_SOURCE } = require('../settings/index')

// <name> 必选项 [key]可选项
const command = {
  command: 'create <name>',
  describe: '创建项目',
  // 属性是一个函数，用于配置命令的参数
  builder: (yargs) => {
    // 定义了一个位置参数 name，类型为字符串，并提供了描述信息
    yargs.positional('name', {
      type: 'string',
      describe: '项目名称'
    })
  },
  handler: async function (argv) {
    //在这时开启一个子进程执行命令 你在哪个目录下执行命令，process.cwd()指向当前的工作目录
    const args = { projectName: argv.name, currentDirectory: process.cwd() }
    // await executeNodeScript({cwd:__dirname},COMMAND_SOURCE,args);
    require('./index')(args)
  }
}

module.exports = command
