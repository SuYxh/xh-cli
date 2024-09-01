const fs = require("fs-extra");
const { log ,config} = require("../utils/index");
async function factory(argv) {
  console.log('factory', argv);
  const { key, value } = argv;
  if (key && value) {
    config[key] = value;
    await fs.writeJSON(config.configPath, config, { spaces: 2 });
    log.info("config","(%s=%s)配置成功保存至%s", key, value, config.configPath);
  }else if(key){
      console.log('%s=%s',key, config[key]);
  }else{
    console.log(config);
  }
}
module.exports = factory;