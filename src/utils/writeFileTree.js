const fs = require('fs-extra')
const path = require('path')

/**
 * 根据给定的文件列表，在指定的项目目录中写入文件内容
 * @param {string} projectDir - 项目目录的路径
 * @param {Object} files - 包含文件名和内容的对象，其中文件名可以是字符串或EJS模板
 */
function writeFileTree(projectDir, files) {
  // 遍历files对象的每一个属性
  Object.keys(files).forEach((file) => {
    // 获取当前文件的内容
    let content = files[file]
    // 如果文件名以'.ejs'结尾，移除后缀，保留原始文件名
    if (file.endsWith('.ejs')) file = file.slice(0, -4)
    // 拼接出文件的完整路径
    let filePath = path.join(projectDir, file)
    // 确保文件所在的目录存在，如果不存在则创建
    fs.ensureDirSync(path.dirname(filePath))
    // 将内容写入到文件中
    fs.writeFileSync(filePath, content)
  })
}

module.exports = writeFileTree
