//执行命令脚本
exports.COMMAND_SOURCE = `
const args = JSON.parse(process.argv[1]);
const factory = require('.');
factory(args);
`
//配置文件名称
exports.RC_NAME = '.xhrc'

//模板存放名称
exports.TEMPLATES = '.xhrc_templates'

exports.GIT_TYPE_LIST = ['github']
exports.ORG_NAME_LIST = ['ironorg']
exports.GIT_TYPE_KEY = 'GIT_TYPE'
exports.ORG_NAME_KEY = 'ORG_NAME'

// 默认的 git 类型类型， github、gitee
exports.DEFAULT_GIT_TYPE = 'github'

// 默认的组织名称
exports.DEFAULT_ORG_NAME = 'ironorg'
