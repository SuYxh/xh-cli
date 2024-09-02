const fs = require('fs-extra')
const config = require('./config')

exports.config = config
exports.log = require('./log')
exports.executeNodeScript = require('./executeNodeScript')
exports.withLoading = require('./withLoading')
exports.request = require('./request')
exports.loadModule = require('./loadModule')
exports.extractCallDir = require('./extractCallDir')
exports.mergeDeps = require('./mergeDeps')
exports.writeFileTree = require('./writeFileTree')
exports.gitInfo = require('./gitInfo')

exports.isObject = (val) => typeof val === 'object'
exports.isString = (val) => typeof val === 'string'

exports.setConfig = async (key, value) => {
  config[key] = value
  await fs.writeJSON(config.configPath, config, { spaces: 2 })
}
