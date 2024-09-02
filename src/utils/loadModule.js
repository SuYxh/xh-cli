const path = require('path')
// 引入Module模块，用于自定义模块加载路径
const Module = require('module')

/**
 * 动态加载模块的函数
 *
 * @param {string} request - 指定要加载的模块的名称或路径
 * @param {string} contextDir - 定义上下文目录，用于解析相对路径和确定package.json的位置
 * @returns 返回加载的模块
 */
function loadModule(request, contextDir) {
  // 使用Module.createRequire方法创建一个自定义的require函数，该函数基于给定的package.json文件
  // 然后使用这个自定义的require函数来加载请求的模块
  return Module.createRequire(path.resolve(contextDir, 'package.json'))(request)
}

module.exports = loadModule

/**
 * 
 * 请你详细解释一下 module 这个模块， 还有就是 这样写和直接使用 require 有什么区别呢？
 *  
 * ### `module` 模块详解

`module` 是 Node.js 中的一个核心模块，它提供了与模块系统相关的功能。主要用途包括：

1. **模块加载**：`module` 模块可以用来动态地加载其他模块。
2. **模块缓存**：Node.js 的模块系统会缓存已加载的模块，避免重复加载。
3. **模块路径解析**：`module` 模块可以帮助解析模块路径，并支持自定义模块加载路径。

### 代码中的 `Module.createRequire` 与直接使用 `require` 的区别

在提供的代码中，使用了 `Module.createRequire` 方法来创建一个自定义的 `require` 函数。这种方式与直接使用 `require` 有以下几点不同：

1. **上下文路径**：通过 `Module.createRequire` 创建的 `require` 函数可以根据指定的上下文路径来加载模块。这使得可以在不同的目录下加载模块，而不会受到当前执行脚本路径的影响。
2. **灵活性**：使用 `Module.createRequire` 可以更灵活地控制模块加载的上下文，例如可以在不同的目录下加载相同的模块，而不影响全局模块缓存。
3. **动态加载**：这种方式更适合动态地加载模块，特别是在需要根据运行时参数决定模块加载路径的情况下。
 */
