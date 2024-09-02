function getPromptModules() {
  // TODO： 目前没有任何内置插件，所以这里就直接返回了 []
  return []
  // return ['router'].map((file) => require(`./promptModules/${file}`))
  // return [
  //     require(`./promptModules/router`)
  // ]
}

module.exports = getPromptModules
