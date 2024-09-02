const execa = require('execa')

// 获取当前用户的姓名
async function getUserName() {
  try {
    const { stdout } = await execa('git', ['config', 'user.name'])
    return stdout.trim()
  } catch (err) {
    throw new Error('获取用户姓名失败: ' + err.message)
  }
}

// 获取当前用户的电子邮件地址
async function getUserEmail() {
  try {
    const { stdout } = await execa('git', ['config', 'user.email'])
    return stdout.trim()
  } catch (err) {
    throw new Error('获取用户电子邮件地址失败: ' + err.message)
  }
}

// 获取所有配置信息
async function getAllConfig() {
  try {
    const { stdout } = await execa('git', ['config', '--list'])
    const config = stdout
      .trim()
      .split('\n')
      .reduce((acc, line) => {
        const [key, value] = line.split('=')
        acc[key] = value
        return acc
      }, {})
    return config
  } catch (err) {
    throw new Error('获取所有配置信息失败: ' + err.message)
  }
}

module.exports = {
  getUserName,
  getUserEmail,
  getAllConfig
}
