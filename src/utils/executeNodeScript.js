// 导入cross-spawn模块，用于跨平台执行子进程
const spawn = require('cross-spawn')

/**
 * 异步函数 executeNodeScript 用于在指定的工作目录中执行一段JavaScript代码
 * @param {Object} config - 包含工作目录的对象
 * @param {string} source - 要执行的JavaScript代码
 * @param {Array} args - 传递给代码的参数
 * @returns {Promise} 返回一个Promise对象，表示代码执行的完成
 */
async function executeNodeScript({ cwd }, source, args) {
  // 将代码执行过程通过子进程方式异步执行
  return new Promise((resolve) => {
    // 创建子进程，使用Node.js环境运行给定的代码和参数
    const childProcess = spawn(process.execPath, ['-e', source, '--', JSON.stringify(args)], {
      // 子进程的工作目录
      cwd,
      // 子进程继承父进程的输入输出流
      stdio: 'inherit'
    })
    // 监听子进程关闭事件，一旦关闭，则调用resolve函数，完成Promise
    childProcess.on('close', resolve)
  })
}
module.exports = executeNodeScript
