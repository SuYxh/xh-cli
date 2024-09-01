exports.log = require('./log');
exports.executeNodeScript = require('./executeNodeScript');
exports.config = require('./config');
exports.withLoading = require('./withLoading');
exports.request = require('./request');
exports.loadModule = require('./loadModule');
exports.extractCallDir = require('./extractCallDir');
exports.mergeDeps = require('./mergeDeps');
exports.writeFileTree = require('./writeFileTree');


exports.isObject = val => typeof val === 'object'
exports.isString = val => typeof val === 'string'
