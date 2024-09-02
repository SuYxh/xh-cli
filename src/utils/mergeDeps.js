/**
 * 合并依赖函数
 *
 * 此函数用于将两套依赖关系合并成一个新的对象它首先复制现有的依赖关系对象，
 * 然后将新的依赖关系添加到这个复制的对象中，最后返回这个包含了新旧依赖关系的对象
 *
 * @param {Object} sourceDeps - 原有的依赖关系对象
 * @param {Object} depsToInject - 要注入的新依赖关系对象
 * @returns {Object} - 包含了新旧依赖关系的合并对象
 */
function mergeDeps(sourceDeps, depsToInject) {
  // 复制原有的依赖关系对象，以便在不修改原对象的情况下进行操作
  const result = Object.assign({}, sourceDeps)
  // 遍历要注入的新依赖关系对象
  for (const depName in depsToInject) {
    // 将新的依赖关系添加到复制的对象中
    result[depName] = depsToInject[depName]
  }
  // 返回包含了新旧依赖关系的合并对象
  return result
}

module.exports = mergeDeps
