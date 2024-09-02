const { log } = require('../utils/index')

async function factory(argv) {
  const { value } = argv
  try {
    const url = value ?? 'https://github.com/ironorg'
    const open = (await import('open')).default
    await open(url)
    log.info(`已成功在浏览器中打开 ${url}`)
  } catch (error) {
    log.error(`打开 URL 时出错: ${error.message}`)
  }
}

module.exports = factory
