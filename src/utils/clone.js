const simpleGit = require('simple-git')
const ProgressBar = require('progress')

async function clone(repository, projectDir) {
  const git = simpleGit()

  // 自动检测并转换为 HTTPS 协议
  if (repository.startsWith('github:')) {
    repository = repository.replace('github:', 'https://github.com/')
    repository += '.git'
  }

  return new Promise((resolve, reject) => {
    git.clone(repository, projectDir, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })

    git.outputHandler((command, stdout, stderr) => {
      let bar = null
      stdout.on('data', (data) => {
        const str = data.toString()
        const match = str.match(/Receiving objects:\s+(\d+)%/)
        if (match) {
          const percent = parseInt(match[1], 10)
          if (!bar) {
            bar = new ProgressBar('Cloning [:bar] :percent :etas', {
              complete: '=',
              incomplete: ' ',
              width: 20,
              total: 100
            })
          }
          bar.update(percent / 100)
        }
      })
    })
  })
}

module.exports = clone
