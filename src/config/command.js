const { executeNodeScript } = require('../utils/index')
const { COMMAND_SOURCE, GIT_TYPE_LIST, ORG_NAME_LIST } = require('../settings/index')

const command = {
  command: 'config [key] [value]',
  describe: `设置或查看配置项 \nGIT_TYPE 设置仓库类型, 可选值 ${GIT_TYPE_LIST}; \n ORG_NAME 设置组织名, 可选值 ${ORG_NAME_LIST} `,
  builder: (yargs) => {},
  // builder: (yargs) => {
  //   yargs
  //     .option('verbose', {
  //       alias: 'v',
  //       type: 'boolean',
  //       describe: '启用详细输出'
  //     })
  //     .positional('key', {
  //       describe: '配置项的键',
  //       type: 'string',
  //       demandOption: true
  //     })
  //     .positional('value', {
  //       describe: '配置项的值',
  //       type: 'string',
  //       default: ''
  //     })
  //     // 自定义错误提示
  //     .fail((msg, err, yargs) => {
  //       console.error('自定义错误提示:', msg)
  //       console.error('使用 --help 查看帮助信息')
  //       process.exit(1)
  //     })
  // },
  handler: async function (argv) {
    await executeNodeScript({ cwd: __dirname }, COMMAND_SOURCE, argv)
  }
}
module.exports = command
