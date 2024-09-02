const userhome = require('userhome')
const fs = require('fs-extra')
const { RC_NAME } = require('../settings/index')

const configPath = userhome(RC_NAME)

let config = {}

if (fs.existsSync(configPath)) {
  config = fs.readJSONSync(configPath)
}

config.configPath = configPath
config.autoStart = 0

module.exports = config
