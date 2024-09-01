const path = require('path');
//提取当前代码执行的目录
function extractCallDir(){
    const obj = {}
    Error.captureStackTrace(obj)
    const callSite = obj.stack.split('\n')[3]
    const namedStackRegExp = /\s\((.*):\d+:\d+\)$/
    let matchResult = callSite.match(namedStackRegExp)
    const fileName = matchResult[1]
    //c:\aproject\vite8\packages\utils\extractCallDir.js
    return path.dirname(fileName)
}
module.exports = extractCallDir;