const path = require('path')
/**
 * 提取当前代码执行的目录,  __dirname
 * 该函数通过创建一个错误对象并捕获堆栈跟踪来确定调用位置
 * 然后从堆栈信息中提取出调用文件的目录路径
 * 主要用于在运行时动态获取调用点的目录信息，对于调试和错误追踪有重要作用
 *
 * @return {string} 调用文件的目录路径
 */
function extractCallDir() {
  // 创建一个对象以存储错误堆栈信息
  const obj = {}
  // 捕获当前堆栈信息并存储到obj对象中
  Error.captureStackTrace(obj)
  // 提取调用堆栈中的第三行，通常这行包含调用文件的信息
  const callSite = obj.stack.split('\n')[3]
  // 正则表达式用于匹配文件名和行号信息
  const namedStackRegExp = /\s\((.*):\d+:\d+\)$/
  // 使用正则表达式匹配调用堆栈中的文件信息
  let matchResult = callSite.match(namedStackRegExp)
  // 提取出文件名
  const fileName = matchResult[1]
  // 返回文件的目录路径, 比如： c:\aproject\vite8\packages\utils\extractCallDir.js
  return path.dirname(fileName)
}
module.exports = extractCallDir
