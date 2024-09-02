const fs = require('fs-extra')
const { log, config, setConfig } = require('../utils/index')

async function factory(argv) {
  const { key, value } = argv
  if (key && value) {
    await setConfig(key, value)
    log.info('config', '(%s=%s)配置成功保存至%s', key, value, config.configPath)
  } else if (key) {
    console.log('%s=%s', key, config[key])
  } else {
    console.log(config)
  }
}

module.exports = factory
