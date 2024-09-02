/**
 * 该异步函数用于处理带有加载提示的操作
 * 它通过使用 'ora' 库来显示一个旋转的加载提示，直到操作完成
 * 这个函数可以用于需要执行一些可能耗时的操作，同时提供一个视觉上的反馈表明操作正在进行
 *
 * @param {string} message - 显示在加载提示旁边的文本信息
 * @param {Function} fn - 需要执行的异步函数
 * @param {...*} args - 需要传递给 fn 的参数
 * @returns {Promise<*>} - 返回 fn 的执行结果
 */
async function withLoading(message, fn, ...args) {
  // 动态导入 'ora' 模块，用于创建加载提示
  const ora = await import('ora')
  // 创建一个加载提示实例，使用传入的消息
  const spinner = ora.default(message)
  // 开始旋转加载提示
  spinner.start()
  // 等待传入的函数 fn 执行完毕，并捕获结果
  const result = await fn(...args)
  // 当操作完成后，将加载提示标记为成功
  spinner.succeed()
  // 返回操作结果
  return result
}
module.exports = withLoading
