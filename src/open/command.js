const { executeNodeScript } = require('../utils/index')
const { COMMAND_SOURCE } = require('../settings/index')

const command = {
  command: 'open [value]',
  describe: '打开 [value], 如果 [value] 为空，则打开模板仓库',
  builder: (yargs) => {},
  handler: async function (argv) {
    await executeNodeScript({ cwd: __dirname }, COMMAND_SOURCE, argv)
  }
}
module.exports = command
