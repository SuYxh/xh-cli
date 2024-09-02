## CLI 开发教程

### 1.1 create-vite简介

-   [vite官网](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)
-   [create-vite包](https://www.npmjs.com/package/create-vite)
-   [create-vite源码](https://github.com/vitejs/vite/tree/main/packages/create-vite)

### 1.2 使用

```
npm init vite
Need to install the following packages:
  create-vite
Ok to proceed? (y) y
√ Project name: ... vite-project
√ Select a framework: » react
√ Select a variant: » react

Scaffolding project <span>in</span> C:\aprepare\t1\vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
```

### 1.3 create-vite源码调试

-   [minimist](https://www.npmjs.com/package/minimist)解析参数选项,类似的还有[yargs](https://www.npmjs.com/package/yargs)和[commander](https://www.npmjs.com/package/commander)
-   [kolorist](https://www.npmjs.com/package/kolorist)在控制台打印颜色,类似的还有[chalk](https://www.npmjs.com/package/chalk)
-   [prompts](https://www.npmjs.com/package/prompts)交互式命令行，类似还有[inquirer](https://www.npmjs.com/package/inquirer)

```
git clone https:<span>//github.com/vitejs/vite.git</span>
cd vite
yarn install
packages\create-vite\index.js
```

.vscode\\launch.json

```
{
    <span>"version"</span>: <span>"0.2.0"</span>,
    <span>"configurations"</span>: [
        {
            <span>"type"</span>: <span>"pwa-node"</span>,
            <span>"request"</span>: <span>"launch"</span>,
            <span>"name"</span>: <span>"Launch Program"</span>,
            <span>"skipFiles"</span>: [
                <span>"&lt;node_internals&gt;/**"</span>
            ],
            <span>"program"</span>: <span>"${workspaceFolder}\\packages\\create-vite\\index.js"</span>,
            <span>"args"</span>: [<span>"create"</span>,<span>"vite-project"</span>]
        }
    ]
}
```

### 1.4 create-vite功能

-   \[√\] 支持参数解析
-   \[√\] 支持自定义项目名
-   \[√\] 支持空目录检查
-   \[√\] 支持静态项目模板
-   \[×\] 不支持lerna [lerna](https://github.com/lerna/lerna)
-   \[×\] 不支持文件异步写入 [create-react-app](https://github.com/facebook/create-react-app)
-   \[×\] 不支持多进程执行命令 [create-react-app](https://github.com/facebook/create-react-app)
-   \[×\] 不支持执行动态`node`命令 [create-react-app](https://github.com/facebook/create-react-app)
-   \[×\] 不支持自动安装依赖 [create-react-app](https://github.com/facebook/create-react-app)
-   \[×\] 不支持自动启动服务 [create-react-app](https://github.com/facebook/create-react-app)
-   \[×\] 不支持参数配置 [yarn](https://github.com/yarnpkg/yarn)
-   \[×\] 不支持`gitub`和`gitee`仓库动态读取
-   \[×\] 不支持模板标签选择
-   \[×\] 不支持动态模板渲染
-   \[×\] 不支持插件化配置技术栈 [vue-cli](https://github.com/vuejs/vue-cli)

## 2.初始化项目

### 2.1 lerna初始化

```
mkdir vite100
cd vite100
lerna init
```

### 2.2 使用yarn workspace

-   开发多个互相依赖的package时，workspace会自动对package的引用设置软链接(symlink),比yarn link更加方便，且链接仅局限在当前workspace中，不会对整个系统造成影响
-   所有package的依赖会安装在根目录的`node_modules`下，节省磁盘空间，且给了yarn更大的依赖优化空间
-   Yarn workspace只会在根目录安装一个node\_modules，这有利于提升依赖的安装效率和不同package间的版本复用。而Lerna默认会进到每一个package中运行yarn/npm install，并在每个package中创建一个node\_modules
-   yarn官方推荐的方案，是集成yarn workspace和lerna,使用yarn workspace来管理依赖，使用lerna来管理npm包的版本发布

#### 2.2.1 lerna.json

```
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
<span>+ "npmClient": "yarn",</span>
<span>+ "useWorkspaces": true</span>
}
```

#### 2.2.2 package.json

```
{
  "name": "root",
  "private": true,
  "devDependencies": {
    "lerna": "^4.0.0"
  },
<span>+  "workspaces": [</span>
<span>+    "packages/*"</span>
<span>+ ]  </span>
}

```

### 2.3 创建子包

```
lerna create @vite100/config -y <span>//配置项</span>
lerna create @vite100/create -y <span>//创建项目</span>
lerna create vite100 -y  <span>//核心命令</span>
lerna create @vite100/settings -y  <span>//常量定义</span>
lerna create @vite100/utils -y <span>//工具方法</span>
lerna create @vite100/cli-plugin-router -y <span>//工具方法</span>
```

### 2.4 安装依赖

-   [fs-extra](https://www.npmjs.com/package/fs-extra) 加强版的读写模块
-   [clone-git-repo](https://www.npmjs.com/package/clone-git-repo) 克隆git仓库
-   [axios](https://www.npmjs.com/package/axios) 请求接口
-   [cross-spawn](https://www.npmjs.com/package/cross-spawn) 开启子进程
-   [userhome](https://www.npmjs.com/package/userhome) 获取用户主目录
-   [chalk](https://www.npmjs.com/package/chalk) 控制台打印彩色文字
-   [ejs](https://www.npmjs.com/package/ejs) 模板渲染
-   [execa](https://www.npmjs.com/package/execa) 通过子进程执行命令
-   [glob](https://www.npmjs.com/package/glob) 按模式匹配文件
-   [inquirer](https://www.npmjs.com/package/inquirer) 交互式命令行选择
-   [isbinaryfile](https://www.npmjs.com/package/isbinaryfile) 判断是否是二进制文件
-   [vue-codemod](https://www.npmjs.com/package/vue-codemod) 通过AST修改源代码
-   [jscodeshift](https://www.npmjs.com/package/jscodeshift) 通过语法树修改源代码
-   [vite100](http://www.zhufengpeixun.com/strong/html/vite100) 核心命令
-   [@vite100/settings](http://www.zhufengpeixun.com/strong/html/@vite100/settings) 常量配置
-   [@vite100/utils](http://www.zhufengpeixun.com/strong/html/@vite100/utils) 帮助方法
-   [@vite100/config](http://www.zhufengpeixun.com/strong/html/@vite100/config) 配置参数
-   [@vite100/create](http://www.zhufengpeixun.com/strong/html/@vite100/create) 创建项目

#### 2.4.1 config\\package.json

packages\\config\\package.json

```
{
  <span>"dependencies"</span>: {
    <span>"@vite100/settings"</span>: <span>"^0.0.0"</span>,
    <span>"@vite100/utils"</span>: <span>"^0.0.0"</span>,
    <span>"fs-extra"</span>: <span>"^10.0.0"</span>,
    <span>"userhome"</span>: <span>"^1.0.0"</span>
   }
}
```

#### 2.4.2 create\\package.json

packages\\create\\package.json

```
{
  <span>"dependencies"</span>: {
    <span>"@vite100/settings"</span>: <span>"^0.0.0"</span>,
    <span>"@vite100/utils"</span>: <span>"^0.0.0"</span>,
    <span>"chalk"</span>: <span>"^4.1.2"</span>,
    <span>"clone-git-repo"</span>: <span>"^0.0.2"</span>,
    <span>"ejs"</span>: <span>"^3.1.6"</span>,
    <span>"execa"</span>: <span>"^5.1.1"</span>,
    <span>"fs-extra"</span>: <span>"^10.0.0"</span>,
    <span>"glob"</span>: <span>"^7.1.7"</span>,
    <span>"inquirer"</span>: <span>"^8.1.2"</span>,
    <span>"isbinaryfile"</span>: <span>"^4.0.8"</span>,
    <span>"vue-codemod"</span>: <span>"^0.0.5"</span>
  }
}
```

#### 2.4.3 utils\\package.json

packages\\utils\\package.json

```
{
  <span>"dependencies"</span>: {
    <span>"@vite100/settings"</span>: <span>"^0.0.0"</span>,
    <span>"axios"</span>: <span>"^0.21.2"</span>,
    <span>"cross-spawn"</span>: <span>"^7.0.3"</span>,
    <span>"userhome"</span>: <span>"^1.0.0"</span>,
    <span>"npmlog"</span>: <span>"^5.0.1"</span>,
    <span>"ora"</span>: <span>"^6.0.0"</span>,
    <span>"userhome"</span>: <span>"^1.0.0"</span>
  }
}
```

#### 2.4.4 vite100\\package.json

packages\\vite100\\package.json

```
{
  <span>"dependencies"</span>: {
    <span>"@vite100/config"</span>: <span>"^0.0.0"</span>,
    <span>"@vite100/create"</span>: <span>"^0.0.0"</span>
  }
}
```

#### 2.4.5 publishConfig

```
{
  <span>"publishConfig"</span>: {
    <span>"access"</span>: <span>"public"</span>,
    <span>"registry"</span>: <span>"http://registry.npmjs.org"</span>
  }
}
```

![vite100](https://upload-markdown-images.oss-cn-beijing.aliyuncs.com/vite41_1630771189288.jpg)

### 2.5 配置命令

#### 2.5.1 package.json

packages\\vite100\\package.json

```
{
  "name": "vite100",
  "version": "0.0.0",
  "dependencies": {
    "@vite100/config":"^0.0.0",
    "@vite100/create":"^0.0.0"
  },
<span>+ "bin":{</span>
<span>+   "vite100": "index.js"</span>
<span>+ }</span>
}
```

#### 2.5.2 index.js

packages\\vite100\\index.js

```
<span>#!/usr/bin/env node</span>

<span>async</span> <span><span>function</span> <span>main</span>(<span></span>) </span>{
   <span>let</span> argv = process.argv.slice(<span>2</span>);
   <span>console</span>.log(argv);
}

main().catch(<span>(<span>err</span>) =&gt;</span> {
    <span>console</span>.error(err);
});

```

#### 2.5.3 link

-   一定要先添加`#!/usr/bin/env node`再link,否则会用文本编辑器打开
-   这种情况可以`vite100\packages\vite100`目录中执行`yarn unlink`，再重新link

```
yarn link
yarn global bin 
<span>C</span>:\Users\zhangrenyang\AppData\Local\Yarn\bin
<span>C</span>:\Users\zhangrenyang\AppData\Local\Yarn\Data\link\vite100
npm bin -g
<span>C</span>:\Users\zhangrenyang\AppData\Roaming\npm
vite100 create vite-project
```

## 3.实现配置命令

### 3.1 安装依赖

```
yarn workspace @vite100/config  add userhome fs-extra
yarn workspace @vite100/utils  add cross-spawn userhome fs-extra
```

### 3.2 settings\\index.js

packages\\settings\\index.js

```
<span>//执行命令脚本</span>
exports.COMMAND_SOURCE = <span>`
const args = JSON.parse(process.argv[1]);
const factory = require('.');
factory(args);
`</span>
<span>//配置文件名称</span>
exports.RC_NAME = <span>".vite100rc"</span>;
```

### 3.3 config.js

packages\\utils\\config.js

```
<span>const</span> userhome = <span>require</span>(<span>"userhome"</span>);
<span>const</span> fs = <span>require</span>(<span>"fs-extra"</span>);
<span>const</span> { RC_NAME } = <span>require</span>(<span>"@vite100/settings"</span>);
<span>const</span> configPath = userhome(RC_NAME);
<span>let</span> config = {};
<span>if</span> (fs.existsSync(configPath)) {
  config = fs.readJSONSync(configPath);
}
config.configPath=configPath;
<span>module</span>.exports = config;
```

### 3.4 executeNodeScript.js

packages\\utils\\executeNodeScript.js

```
<span>const</span> spawn = <span>require</span>(<span>"cross-spawn"</span>);
<span>async</span> <span><span>function</span> <span>executeNodeScript</span>(<span>{ cwd }, source, args</span>) </span>{
    <span>return</span> <span>new</span> <span>Promise</span>(<span>(<span>resolve</span>) =&gt;</span> {
      <span>const</span> childProcess = spawn(
        process.execPath,
        [<span>"-e"</span>, source, <span>"--"</span>, <span>JSON</span>.stringify(args)],
        { cwd, <span>stdio</span>: <span>"inherit"</span> }
      );
      childProcess.on(<span>"close"</span>, resolve);
    });
}
<span>module</span>.exports = executeNodeScript;
```

### 3.5 log.js

packages\\utils\\log.js

```
<span>const</span> log = <span>require</span>(<span>'npmlog'</span>);
log.heading = <span>'vite100'</span>;
<span>module</span>.exports = log;
```

### 3.6 utils\\index.js

packages\\utils\\index.js

```
exports.log = <span>require</span>(<span>'./log'</span>);
exports.executeNodeScript = <span>require</span>(<span>'./executeNodeScript'</span>);
exports.config = <span>require</span>(<span>'./config'</span>);
```

### 3.7 config\\command.js

packages\\config\\command.js

```
<span>const</span> {executeNodeScript} = <span>require</span>(<span>'@vite100/utils'</span>);
<span>const</span> {COMMAND_SOURCE} = <span>require</span>(<span>'@vite100/settings'</span>);
<span>const</span> command = {
  <span>command</span>: <span>"config [key] [value]"</span>,
  <span>describe</span>: <span>"设置或查看配置项,比如GIT_TYPE设置仓库类型，ORG_NAME设置组织名"</span>,
  <span>builder</span>: <span>(<span>yargs</span>) =&gt;</span> {},
  <span>handler</span>:<span>async</span> <span><span>function</span>(<span>argv</span>)</span>{
    <span>//await executeNodeScript({ cwd: __dirname }, COMMAND_SOURCE,argv);</span>
    <span>require</span>(<span>'.'</span>)(argv);
  },
};
<span>module</span>.exports = command;
```

### 3.8 config\\index.js

packages\\config\\index.js

```
<span>const</span> fs = <span>require</span>(<span>"fs-extra"</span>);
<span>const</span> { log ,config} = <span>require</span>(<span>"@vite100/utils"</span>);
<span>async</span> <span><span>function</span> <span>factory</span>(<span>argv</span>) </span>{
  <span>const</span> { key, value } = argv;
  <span>if</span> (key &amp;&amp; value) {
    config[key] = value;
    <span>await</span> fs.writeJSON(config.configPath, config, { <span>spaces</span>: <span>2</span> });
    log.info(<span>"vite100"</span>,<span>"(%s=%s)配置成功保存至%s"</span>, key, value, config.configPath);
  }<span>else</span> <span>if</span>(key){
      <span>console</span>.log(<span>'%s=%s'</span>,key, config[key]);
  }<span>else</span>{
    <span>console</span>.log(config);
  }
}
<span>module</span>.exports = factory;
```

### 3.9 vite100\\index.js

packages\\vite100\\index.js

```
#!/usr/bin/env node
const yargs = require("yargs/yargs");
const configCmd = require("@vite100/config/command");
async function main() {
    const cli = yargs();
    cli
    .usage(`Usage: vite100 &lt;command&gt; [options]`)
    .demandCommand(1, "至少需要一个命令")
    .strict() 
    .recommendCommands()
<span>+   .command(configCmd)</span>
    .parse(process.argv.slice(2));
}

main().catch((err) =&gt; {
    console.error(err);
});
```

## 4.创建项目目录

### 4.1 create\\command.js

packages\\create\\command.js

```
<span>const</span> {COMMAND_SOURCE} = <span>require</span>(<span>'@vite100/settings'</span>);
<span>const</span> {executeNodeScript} = <span>require</span>(<span>'@vite100/utils'</span>);
<span>const</span> command = {
  <span>command</span>: <span>"create &lt;name&gt;"</span>,
  <span>describe</span>: <span>"创建项目"</span>,
  <span>builder</span>: <span>(<span>yargs</span>) =&gt;</span> {
    yargs.positional(<span>"name"</span>, {
      <span>type</span>: <span>"string"</span>,
      <span>describe</span>: <span>"项目名称"</span>,
    });
  },
  <span>handler</span>:<span>async</span> <span><span>function</span>(<span>argv</span>)</span>{
    <span>let</span> args = {<span>projectName</span>:argv.name,<span>workingDirectory</span>:process.cwd()};
    <span>//await executeNodeScript({ cwd: __dirname }, COMMAND_SOURCE,args);</span>
    <span>require</span>(<span>'.'</span>)(args);
  }
};
<span>module</span>.exports = command;
```

### 4.2 create\\index.js

packages\\create\\index.js

```
<span>const</span> path = <span>require</span>(<span>"path"</span>);
<span>const</span> fs = <span>require</span>(<span>"fs-extra"</span>);
<span>const</span> execa = <span>require</span>(<span>"execa"</span>);
<span>const</span> { red } = <span>require</span>(<span>"chalk"</span>);
<span>const</span> { config, log } = <span>require</span>(<span>"@vite100/utils"</span>);

<span>async</span> <span><span>function</span> <span>create</span>(<span>argv</span>) </span>{
    <span>const</span> { workingDirectory, projectName } = argv;
    <span>const</span> { GIT_TYPE, ORG_NAME } = config;
    <span>if</span> (!GIT_TYPE) {
        <span>throw</span> <span>new</span> <span>Error</span>(red(<span>"X"</span>) + <span>" 尚未配置仓库类型!"</span>);
    }
    <span>if</span> (!ORG_NAME) {
        <span>throw</span> <span>new</span> <span>Error</span>(red(<span>"X"</span>) + <span>" 尚未配置组织名称!"</span>);
    }
    <span>const</span> projectDir = path.join(workingDirectory, projectName);
    log.info(<span>"vite100"</span>, <span>"创建的项目目录为%s"</span>, projectDir);
}
<span>module</span>.exports = <span>(<span>...args</span>) =&gt;</span> {
    <span>return</span> create(...args).catch(<span><span>err</span> =&gt;</span> {
        <span>console</span>.error(err);
    });
};
```

### 4.3 vite100\\index.js

packages\\vite100\\index.js

```
#!/usr/bin/env node
const yargs = require("yargs/yargs");
const configCmd = require("@vite100/config/command");
<span>+const createCmd = require("@vite100/create/command");</span>
async function main() {
    const cli = yargs();
    cli
    .usage(`Usage: vite100 &lt;command&gt; [options]`)
    .demandCommand(1, "至少需要一个命令")
    .strict() 
    .recommendCommands()
<span>+   .command(createCmd)</span>
    .command(configCmd)
    .parse(process.argv.slice(2));
 }

 main().catch((err) =&gt; {
     console.error(err);
 });
```

## 5\. 获取选择项

### 5.1 router.js

packages\\create\\lib\\promptModules\\router.js

```
<span>module</span>.exports = <span><span>cli</span> =&gt;</span> {
    cli.injectFeature({
        <span>name</span>: <span>'Router'</span>,
        <span>value</span>: <span>'router'</span>,
        <span>description</span>: <span>'请选择路由模式'</span>,
        <span>link</span>: <span>'https://www.npmjs.com/package/react-router-dom'</span>
    })
    cli.injectPrompt({
        <span>name</span>: <span>'historyMode'</span>,
        <span>when</span>: <span><span>answers</span> =&gt;</span> answers.features.includes(<span>'router'</span>),
        <span>message</span>: <span>'请选择history的模式'</span>,
        <span>type</span>: <span>'list'</span>,
        <span>choices</span>: [
            {
                <span>name</span>: <span>'hash'</span>,
                <span>value</span>: <span>'hash'</span>
            },
            {
                <span>name</span>: <span>'browser'</span>,
                <span>value</span>: <span>'browser'</span>
            }
        ],
        <span>default</span>: <span>'browser'</span>
    })
    cli.injectPrompt({
        <span>name</span>: <span>'appTitle'</span>,
        <span>when</span>: <span><span>answers</span> =&gt;</span> answers.features.includes(<span>'router'</span>),
        <span>message</span>: <span>'请输入根组件的标题'</span>,
        <span>type</span>: <span>'text'</span>,
        <span>default</span>: <span>'AppTitle'</span>
    })
    cli.onPromptComplete(<span>(<span>answers, projectOptions</span>) =&gt;</span> {
        <span>if</span> (answers.features.includes(<span>'router'</span>)) {
            projectOptions.historyMode =answers.historyMode;
            projectOptions.appTitle=answers.appTitle;
        }
    })
}
```

### 5.2 getPromptModules.js

packages\\create\\lib\\getPromptModules.js

```
<span><span>function</span> <span>getPromptModules</span>(<span></span>) </span>{
    <span>return</span> [<span>'router'</span>].map(<span><span>file</span> =&gt;</span> <span>require</span>(<span>`./promptModules/<span>${file}</span>`</span>));
}
<span>module</span>.exports = getPromptModules;
```

### 5.3 create\\index.js

packages\\create\\index.js

```
const path = require("path");
const { red } = require("chalk");
const { config, log } = require("@vite100/utils");
<span>+const getPromptModules = require('./lib/getPromptModules');</span>
async function create(argv) {
    const { workingDirectory, projectName } = argv;
    const { GIT_TYPE, ORG_NAME } = config;
    if (!GIT_TYPE) {
        throw new Error(red("X") + " 尚未配置仓库类型!");
    }
    if (!ORG_NAME) {
        throw new Error(red("X") + " 尚未配置组织名称!");
    }
    const projectDir = path.join(workingDirectory, projectName);
    log.info("vite100", "创建的项目目录为%s", projectDir);
<span>+   let promptModules = getPromptModules();</span>
<span>+   console.info("选择项promptModules", promptModules);</span>
}
module.exports = (...args) =&gt; {
    return create(...args).catch(err =&gt; {
        console.error(err);
    });
};
```

## 6\. 获取回答

### 6.1 PromptModuleAPI.js

packages\\create\\lib\\PromptModuleAPI.js

```
<span><span>class</span> <span>PromptModuleAPI</span> </span>{
    <span>constructor</span>(creator) {
        <span>this</span>.creator = creator;
    }
    <span>//插入特性</span>
    injectFeature(feature) {
        <span>this</span>.creator.featurePrompt.choices.push(feature)
    }
    <span>//插入选项</span>
    injectPrompt(prompt) {
        <span>this</span>.creator.injectedPrompts.push(prompt)
    }
    <span>//选择完成后的回调</span>
    onPromptComplete(cb) {
        <span>this</span>.creator.promptCompleteCbs.push(cb)
    }
}
<span>module</span>.exports = PromptModuleAPI;
```

### 6.2 Creator.js

packages\\create\\lib\\Creator.js

```
<span>const</span> { prompt } = <span>require</span>(<span>"inquirer"</span>);
<span>const</span> PromptModuleAPI = <span>require</span>(<span>"./PromptModuleAPI"</span>);
<span>const</span> defaultFeaturePrompt = {
    <span>name</span>: <span>"features"</span>,
    <span>type</span>: <span>"checkbox"</span>,
    <span>message</span>: <span>"请选择项目特性:"</span>,
    <span>choices</span>: [],
}
<span><span>class</span> <span>Creator</span> </span>{
    <span>constructor</span>(projectName, projectDir, promptModules) {
        <span>this</span>.projectName = projectName;<span>//项目名称</span>
        <span>this</span>.projectDir = projectDir;<span>//项目路径</span>
        <span>this</span>.featurePrompt = defaultFeaturePrompt;<span>//默认选项框</span>
        <span>this</span>.injectedPrompts = [];<span>//插入插入的选择框</span>
        <span>this</span>.promptCompleteCbs = [];<span>//选择结束之后的回调</span>
        <span>const</span> promptModuleAPI = <span>new</span> PromptModuleAPI(<span>this</span>);
        promptModules.forEach(<span>(<span><span>module</span></span>) =&gt;</span> <span>module</span>(promptModuleAPI));
    }
    <span>async</span> create() {
        <span>//获取选择项</span>
        <span>const</span> projectOptions = (<span>this</span>.projectOptions = <span>await</span> <span>this</span>.promptAndResolve());
        <span>console</span>.log(<span>'projectOptions'</span>,projectOptions);
        <span>//{historyMode: 'browser',appTitle: 'AppTitle'}</span>



    }
    <span>async</span> promptAndResolve() {
        <span>let</span> prompts = [<span>this</span>.featurePrompt, ...this.injectedPrompts];
        <span>let</span> answers = <span>await</span> prompt(prompts);
        <span>let</span> projectOptions = {<span>plugins</span>: {},};
        <span>this</span>.promptCompleteCbs.forEach(<span>(<span>cb</span>) =&gt;</span> cb(answers, projectOptions));
        <span>return</span> projectOptions;
      }
}
<span>module</span>.exports = Creator;
```

### 6.3 create\\index.js

packages\\create\\index.js

```
const path = require("path");
const { red } = require("chalk");
const { config, log } = require("@vite100/utils");
const getPromptModules = require('./lib/getPromptModules');
<span>+const Creator = require('./lib/Creator');</span>
async function create(argv) {
    const { workingDirectory, projectName } = argv;
    const { GIT_TYPE, ORG_NAME } = config;
    if (!GIT_TYPE) {
        throw new Error(red("X") + " 尚未配置仓库类型!");
    }
    if (!ORG_NAME) {
        throw new Error(red("X") + " 尚未配置组织名称!");
    }
    const projectDir = path.join(workingDirectory, projectName);
    log.info("vite100", "创建的项目目录为%s", projectDir);
    let promptModules = getPromptModules();
    console.info("选择项promptModules", promptModules);
<span>+   let creator = new Creator(projectName, projectDir, promptModules);</span>
<span>+   await creator.create();</span>
}
module.exports = (...args) =&gt; {
    return create(...args).catch(err =&gt; {
        console.error(err);
    });
};
```

## 7\. 准备项目目录

### 7.1 Creator.js

packages\\create\\lib\\Creator.js

```
const { prompt } = require("inquirer");
<span>+const fs = require("fs-extra");</span>
<span>+const { red } = require("chalk");</span>
const PromptModuleAPI = require("./PromptModuleAPI");
<span>+const { log } = require("@vite100/utils");</span>
const defaultFeaturePrompt = {
    name: "features",
    type: "checkbox",
    message: "请选择项目特性:",
    choices: [],
}
class Creator {
    constructor(projectName, projectDir, promptModules) {
        this.projectName = projectName;//项目名称
        this.projectDir = projectDir;//项目路径
        this.featurePrompt = defaultFeaturePrompt;//默认选项框
        this.injectedPrompts = [];//插入插入的选择框
        this.promptCompleteCbs = [];//选择结束之后的回调
        const promptModuleAPI = new PromptModuleAPI(this);
        promptModules.forEach((module) =&gt; module(promptModuleAPI));
    }
    async create() {
        //获取选择项
        const projectOptions = (this.projectOptions = await this.promptAndResolve());
        console.log('projectOptions', projectOptions);
        //{historyMode: 'browser',appTitle: 'AppTitle'}
<span>+       //准备项目目录</span>
<span>+       await this.prepareProjectDir();</span>
    }
<span>+   async prepareProjectDir() {</span>
<span>+       let { projectDir } = this;</span>
<span>+       try {</span>
<span>+           await fs.access(projectDir);</span>
<span>+           const files = await fs.readdir(projectDir);</span>
<span>+           if (files.length &gt; 0) {</span>
<span>+               const { overwrite } = await prompt({</span>
<span>+                   type: "confirm",</span>
<span>+                   name: "overwrite",</span>
<span>+                   message: `目标目录非空，是否要移除存在的文件并继续?`,</span>
<span>+               });</span>
<span>+               if (overwrite) {</span>
<span>+                   await fs.emptyDir(projectDir);</span>
<span>+               } else {</span>
<span>+                   throw new Error(red("X") + " 操作被取消");</span>
<span>+               }</span>
<span>+           }</span>
<span>+       } catch (error) {</span>
<span>+           await fs.mkdirp(projectDir);</span>
<span>+       }</span>
<span>+       log.info("vite100", "%s目录已经准备就绪", projectDir);</span>
<span>+   }</span>
    async promptAndResolve() {
        let prompts = [this.featurePrompt, ...this.injectedPrompts];
        let answers = await prompt(prompts);
        let projectOptions = { plugins: {}, };
        this.promptCompleteCbs.forEach((cb) =&gt; cb(answers, projectOptions));
        return projectOptions;
    }
}
module.exports = Creator;
```

## 8\. 下载模板

### 8.1 request.js

packages\\utils\\request.js

```
<span>const</span> axios = <span>require</span>(<span>"axios"</span>);
<span>const</span> { GIT_TYPE } = <span>require</span>(<span>"./config"</span>);
<span>const</span> GITEE = <span>"https://gitee.com/api/v5"</span>;
<span>const</span> GITHUB = <span>"https://api.github.com"</span>;

<span>const</span> BASE_URL = GIT_TYPE === <span>"gitee"</span> ? GITEE : GITHUB;
<span>const</span> request = axios.create({
    <span>baseURL</span>: BASE_URL,
    <span>timeout</span>: <span>5000</span>,
});

request.interceptors.response.use(
    <span>(<span>response</span>) =&gt;</span> {
        <span>return</span> response.data;
    },
    (error) =&gt; {
        <span>return</span> <span>Promise</span>.reject(error);
    }
);

<span>module</span>.exports = request;

```

### 8.2 withLoading.js

packages\\utils\\withLoading.js

```
<span>async</span> <span><span>function</span> <span>withLoading</span>(<span>message, fn, ...args</span>) </span>{
  <span>const</span> ora = <span>await</span> <span>import</span>(<span>"ora"</span>);
  <span>const</span> spinner = ora.default(message);
  spinner.start();
  <span>const</span> result = <span>await</span> fn(...args);
  spinner.succeed();
  <span>return</span> result;
}
<span>module</span>.exports = withLoading;
```

### 8.3 utils\\index.js

packages\\utils\\index.js

```
exports.log = require('./log');
exports.executeNodeScript = require('./executeNodeScript');
exports.config = require('./config');
<span>+exports.withLoading = require('./withLoading');</span>
<span>+exports.request = require('./request');</span>
```

### 8.4 settings\\index.js

packages\\settings\\index.js

```
//执行命令脚本
exports.COMMAND_SOURCE = `
const args = JSON.parse(process.argv[1]);
const factory = require('.');
factory(args);
`
//配置文件名称
exports.RC_NAME = ".vite100rc";

<span>+//模板存放名称</span>
<span>+exports.TEMPLATES = ".vite100_templates";</span>
```

### 8.5 Creator.js

packages\\create\\lib\\Creator.js

```
const { prompt } = require("inquirer");
const fs = require("fs-extra");
const { red } = require("chalk");
<span>+const userhome = require("userhome");</span>
<span>+const {promisify} = require('util');</span>
<span>+const clone = promisify(require('clone-git-repo'));</span>
const PromptModuleAPI = require("./PromptModuleAPI");
<span>+const { log,config,withLoading ,request} = require("@vite100/utils");</span>
<span>+const { TEMPLATES } = require("@vite100/settings");</span>
const defaultFeaturePrompt = {
    name: "features",
    type: "checkbox",
    message: "请选择项目特性:",
    choices: [],
}
class Creator {
    constructor(projectName, projectDir, promptModules) {
        this.projectName = projectName;//项目名称
        this.projectDir = projectDir;//项目路径
        this.featurePrompt = defaultFeaturePrompt;//默认选项框
        this.injectedPrompts = [];//插入插入的选择框
        this.promptCompleteCbs = [];//选择结束之后的回调
        const promptModuleAPI = new PromptModuleAPI(this);
        promptModules.forEach((module) =&gt; module(promptModuleAPI));
    }
    async create() {
        //获取选择项
        const projectOptions = (this.projectOptions = await this.promptAndResolve());
        console.log('projectOptions', projectOptions);
        //{historyMode: 'browser',appTitle: 'AppTitle'}
        //准备项目目录
        await this.prepareProjectDir();
<span>+       //下载模板，给templateDir赋值</span>
<span>+       await this.downloadTemplate();</span>
    }
<span>+    async downloadTemplate() {</span>
<span>+        const { GIT_TYPE, ORG_NAME } = config;</span>
<span>+        let repos = await withLoading("读取模板列表", async () =&gt;</span>
<span>+            request.get(`/orgs/${ORG_NAME}/repos`)</span>
<span>+        );</span>
<span>+        let { repo } = await prompt({</span>
<span>+            name: "repo",</span>
<span>+            type: "list",</span>
<span>+            message: "请选择模板",</span>
<span>+            choices: repos.map((repo) =&gt; repo.name)</span>
<span>+        });</span>
<span>+        let tags = await withLoading("读取标签列表", async () =&gt;</span>
<span>+            request.get(`/repos/${ORG_NAME}/${repo}/tags`)</span>
<span>+        );</span>
<span>+        let { tag } = await prompt({</span>
<span>+            name: "tag",</span>
<span>+            type: "list",</span>
<span>+            message: "请选择版本",</span>
<span>+            choices: tags,</span>
<span>+        });</span>
<span>+        let repository = GIT_TYPE + `:${ORG_NAME}/${repo}`;</span>
<span>+        if (tag) repository += `#${tag}`;</span>
<span>+        const downloadDirectory = userhome(TEMPLATES);</span>
<span>+        let templateDir = (this.templateDir = `${downloadDirectory}/${repo}/${tag}`);</span>
<span>+        log.info("vite3", "准备下载模板到%s", templateDir);</span>
<span>+        try {</span>
<span>+            await fs.access(templateDir);</span>
<span>+        } catch (error) {</span>
<span>+            log.info("vite100", "从仓库下载%s", repository);</span>
<span>+            await clone(repository, templateDir, { clone: true });</span>
<span>+        }</span>
<span>+    }</span>
    async prepareProjectDir() {
        let { projectDir } = this;
        try {
            await fs.access(projectDir);
            const files = await fs.readdir(projectDir);
            if (files.length &gt; 0) {
                const { overwrite } = await prompt({
                    type: "confirm",
                    name: "overwrite",
                    message: `目标目录非空，是否要移除存在的文件并继续?`,
                });
                if (overwrite) {
                    await fs.emptyDir(projectDir);
                } else {
                    throw new Error(red("X") + " 操作被取消");
                }
            }
        } catch (error) {
            await fs.mkdirp(projectDir);
        }
        log.info("vite100", "%s目录已经准备就绪", projectDir);
    }
    async promptAndResolve() {
        let prompts = [this.featurePrompt, ...this.injectedPrompts];
        let answers = await prompt(prompts);
        let projectOptions = { plugins: {}, };
        this.promptCompleteCbs.forEach((cb) =&gt; cb(answers, projectOptions));
        return projectOptions;
    }
}
module.exports = Creator;
```

## 9.启动项目

### 9.1 Creator.js

packages\\create\\lib\\Creator.js

```
const { prompt } = require("inquirer");
const fs = require("fs-extra");
const { red } = require("chalk");
const userhome = require("userhome");
const {promisify} = require('util');
<span>+const execa = require("execa");</span>
const clone = promisify(require('clone-git-repo'));
const PromptModuleAPI = require("./PromptModuleAPI");
const { log,config,withLoading ,request} = require("@vite100/utils");
const { TEMPLATES } = require("@vite100/settings");
const defaultFeaturePrompt = {
    name: "features",
    type: "checkbox",
    message: "请选择项目特性:",
    choices: [],
}
class Creator {
    constructor(projectName, projectDir, promptModules) {
        this.projectName = projectName;//项目名称
        this.projectDir = projectDir;//项目路径
        this.featurePrompt = defaultFeaturePrompt;//默认选项框
        this.injectedPrompts = [];//插入插入的选择框
        this.promptCompleteCbs = [];//选择结束之后的回调
        const promptModuleAPI = new PromptModuleAPI(this);
        promptModules.forEach((module) =&gt; module(promptModuleAPI));
    }
    async create() {
        //获取选择项
        const projectOptions = (this.projectOptions = await this.promptAndResolve());
        console.log('projectOptions', projectOptions);
        //{historyMode: 'browser',appTitle: 'AppTitle'}
        //准备项目目录
        await this.prepareProjectDir();
        //下载模板，给templateDir赋值
        await this.downloadTemplate();
         //把项目拷贝到模板中
<span>+       await fs.copy(this.templateDir, this.projectDir);</span>
<span>+        //初始化git仓库</span>
<span>+       await execa("git", ["init"], { cwd: this.projectDir, stdio: "inherit" });</span>
<span>+       log.info("vite100", "在%s安装依赖", this.projectDir);</span>
<span>+       await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });</span>
    }
    async downloadTemplate() {
        const { GIT_TYPE, ORG_NAME } = config;
        let repos = await withLoading("读取模板列表", async () =&gt;
            request.get(`/orgs/${ORG_NAME}/repos`)
        );
        let { repo } = await prompt({
            name: "repo",
            type: "list",
            message: "请选择模板",
            choices: repos.map((repo) =&gt; repo.name)
        });
        let tags = await withLoading("读取标签列表", async () =&gt;
            request.get(`/repos/${ORG_NAME}/${repo}/tags`)
        );
        let { tag } = await prompt({
            name: "tag",
            type: "list",
            message: "请选择版本",
            choices: tags,
        });
        let repository = GIT_TYPE + `:${ORG_NAME}/${repo}`;
        if (tag) repository += `#${tag}`;
        const downloadDirectory = userhome(TEMPLATES);
        let templateDir = (this.templateDir = `${downloadDirectory}/${repo}/${tag}`);
        log.info("vite3", "准备下载模板到%s", templateDir);
        try {
            await fs.access(templateDir);
        } catch (error) {
            log.info("vite100", "从仓库下载%s", repository);
            await clone(repository, templateDir, { clone: true });
        }
    }
    async prepareProjectDir() {
        let { projectDir } = this;
        try {
            await fs.access(projectDir);
            const files = await fs.readdir(projectDir);
            if (files.length &gt; 0) {
                const { overwrite } = await prompt({
                    type: "confirm",
                    name: "overwrite",
                    message: `目标目录非空，是否要移除存在的文件并继续?`,
                });
                if (overwrite) {
                    await fs.emptyDir(projectDir);
                } else {
                    throw new Error(red("X") + " 操作被取消");
                }
            }
        } catch (error) {
            await fs.mkdirp(projectDir);
        }
        log.info("vite100", "%s目录已经准备就绪", projectDir);
    }
    async promptAndResolve() {
        let prompts = [this.featurePrompt, ...this.injectedPrompts];
        let answers = await prompt(prompts);
        let projectOptions = { plugins: {}, };
        this.promptCompleteCbs.forEach((cb) =&gt; cb(answers, projectOptions));
        return projectOptions;
    }
}
module.exports = Creator;
```

### 9.2 create\\index.js

packages\\create\\index.js

```
const path = require("path");
const { red } = require("chalk");
<span>+const execa = require("execa");</span>
const { config, log } = require("@vite100/utils");
const getPromptModules = require('./lib/getPromptModules');
const Creator = require('./lib/Creator');
async function create(argv) {
    const { workingDirectory, projectName } = argv;
    const { GIT_TYPE, ORG_NAME } = config;
    if (!GIT_TYPE) {
        throw new Error(red("X") + " 尚未配置仓库类型!");
    }
    if (!ORG_NAME) {
        throw new Error(red("X") + " 尚未配置组织名称!");
    }
    const projectDir = path.join(workingDirectory, projectName);
    log.info("vite100", "创建的项目目录为%s", projectDir);
    let promptModules = getPromptModules();
    console.info("选择项promptModules", promptModules);
    let creator = new Creator(projectName, projectDir, promptModules);
    await creator.create();
<span>+   log.info("vite100", "启动服务");</span>
<span>+   await execa("npm", ["run", "dev"], { cwd: projectDir, stdio: "inherit" });</span>
}
module.exports = (...args) =&gt; {
    return create(...args).catch(err =&gt; {
        console.error(err);
    });
};
```

## 10.添加路由插件

### 10.1 router.js

packages\\create\\lib\\promptModules\\router.js

```
module.exports = cli =&gt; {
    cli.injectFeature({
        name: 'Router',
        value: 'router',
        description: '请选择路由模式',
        link: 'https://www.npmjs.com/package/react-router-dom'
    })
    cli.injectPrompt({
        name: 'historyMode',
        when: answers =&gt; answers.features.includes('router'),
        message: '请选择history的模式',
        type: 'list',
        choices: [
            {
                name: 'hash',
                value: 'hash'
            },
            {
                name: 'browser',
                value: 'browser'
            }
        ],
        default: 'browser'
    })
    cli.injectPrompt({
        name: 'appTitle',
        when: answers =&gt; answers.features.includes('router'),
        message: '请输入根组件的标题',
        type: 'text',
        default: 'AppTitle'
    })
    cli.onPromptComplete((answers, projectOptions) =&gt; {
        if (answers.features.includes('router')) {
<span>+            projectOptions.plugins['cli-plugin-router'] = {</span>
<span>+                historyMode: answers.historyMode</span>
<span>+            }</span>
            projectOptions.historyMode =answers.historyMode;
            projectOptions.appTitle=answers.appTitle;
        }
    })
}
```

### 10.2 Creator.js

packages\\create\\lib\\Creator.js

```
const { prompt } = require("inquirer");
<span>+const path = require("path");</span>
const fs = require("fs-extra");
const { red } = require("chalk");
const userhome = require("userhome");
const {promisify} = require('util');
const execa = require("execa");
const clone = promisify(require('clone-git-repo'));
const PromptModuleAPI = require("./PromptModuleAPI");
const { log,config,withLoading ,request} = require("@vite100/utils");
const { TEMPLATES } = require("@vite100/settings");
const defaultFeaturePrompt = {
    name: "features",
    type: "checkbox",
    message: "请选择项目特性:",
    choices: [],
}
class Creator {
    constructor(projectName, projectDir, promptModules) {
        this.projectName = projectName;//项目名称
        this.projectDir = projectDir;//项目路径
        this.featurePrompt = defaultFeaturePrompt;//默认选项框
        this.injectedPrompts = [];//插入插入的选择框
        this.promptCompleteCbs = [];//选择结束之后的回调
<span>+       this.plugins = [];//插件</span>
        const promptModuleAPI = new PromptModuleAPI(this);
        promptModules.forEach((module) =&gt; module(promptModuleAPI));
    }
    async create() {
        //获取选择项
        const projectOptions = (this.projectOptions = await this.promptAndResolve());
        console.log('projectOptions', projectOptions);
        //{historyMode: 'browser',appTitle: 'AppTitle'}
        //准备项目目录
        await this.prepareProjectDir();
        //下载模板，给templateDir赋值
        await this.downloadTemplate();
         //把项目拷贝到模板中
        await fs.copy(this.templateDir, this.projectDir);
<span>+       const pkgPath = path.join(this.projectDir, 'package.json');</span>
<span>+       let pkg = (this.pkg = await fs.readJSON(pkgPath));</span>
<span>+       const deps = Reflect.ownKeys(projectOptions.plugins);</span>
<span>+       deps.forEach(dep =&gt; pkg.devDependencies[dep] = `latest`);</span>
<span>+       await fs.writeJSON(pkgPath,pkg,{spaces:2});</span>
         //初始化git仓库
        await execa("git", ["init"], { cwd: this.projectDir, stdio: "inherit" });
        log.info("vite100", "在%s安装依赖", this.projectDir);
        await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });

    }
    async downloadTemplate() {
        const { GIT_TYPE, ORG_NAME } = config;
        let repos = await withLoading("读取模板列表", async () =&gt;
            request.get(`/orgs/${ORG_NAME}/repos`)
        );
        let { repo } = await prompt({
            name: "repo",
            type: "list",
            message: "请选择模板",
            choices: repos.map((repo) =&gt; repo.name)
        });
        let tags = await withLoading("读取标签列表", async () =&gt;
            request.get(`/repos/${ORG_NAME}/${repo}/tags`)
        );
        let { tag } = await prompt({
            name: "tag",
            type: "list",
            message: "请选择版本",
            choices: tags,
        });
        let repository = GIT_TYPE + `:${ORG_NAME}/${repo}`;
        if (tag) repository += `#${tag}`;
        const downloadDirectory = userhome(TEMPLATES);
        let templateDir = (this.templateDir = `${downloadDirectory}/${repo}/${tag}`);
        log.info("vite3", "准备下载模板到%s", templateDir);
        try {
            await fs.access(templateDir);
        } catch (error) {
            log.info("vite100", "从仓库下载%s", repository);
            await clone(repository, templateDir, { clone: true });
        }
    }
    async prepareProjectDir() {
        let { projectDir } = this;
        try {
            await fs.access(projectDir);
            const files = await fs.readdir(projectDir);
            if (files.length &gt; 0) {
                const { overwrite } = await prompt({
                    type: "confirm",
                    name: "overwrite",
                    message: `目标目录非空，是否要移除存在的文件并继续?`,
                });
                if (overwrite) {
                    await fs.emptyDir(projectDir);
                } else {
                    throw new Error(red("X") + " 操作被取消");
                }
            }
        } catch (error) {
            await fs.mkdirp(projectDir);
        }
        log.info("vite100", "%s目录已经准备就绪", projectDir);
    }
    async promptAndResolve() {
        let prompts = [this.featurePrompt, ...this.injectedPrompts];
        let answers = await prompt(prompts);
        let projectOptions = { plugins: {}, };
        this.promptCompleteCbs.forEach((cb) =&gt; cb(answers, projectOptions));
        return projectOptions;
    }
}
module.exports = Creator;
```

## 11\. 解析并应用插件

### 11.1 mergeDeps.js

packages\\utils\\mergeDeps.js

```
<span><span>function</span> <span>mergeDeps</span>(<span>sourceDeps, depsToInject</span>)</span>{
    <span>let</span> result = <span>Object</span>.assign({}, sourceDeps);
    <span>for</span> (<span>const</span> depName <span>in</span> depsToInject) {
        result[depName] = depsToInject[depName];
    }
    <span>return</span> result;
}
<span>module</span>.exports = mergeDeps;
```

### 11.2 loadModule.js

packages\\utils\\loadModule.js

```
<span>const</span> path = <span>require</span>(<span>'path'</span>);
<span>const</span> Module = <span>require</span>(<span>'module'</span>);
<span><span>function</span> <span>loadModule</span>(<span>request,context</span>)</span>{
  <span>return</span> Module.createRequire(path.resolve(context,<span>'package.json'</span>))(request);
}
<span>module</span>.exports = loadModule;
```

packages\\utils\\extractCallDir.js

```
<span>const</span> path = <span>require</span>(<span>'path'</span>);
<span><span>function</span> <span>extractCallDir</span>(<span></span>)</span>{
    <span>const</span> obj = {}
    <span>Error</span>.captureStackTrace(obj)
    <span>const</span> callSite = obj.stack.split(<span>'\n'</span>)[<span>3</span>]
    <span>const</span> namedStackRegExp = <span>/\s\((.*):\d+:\d+\)$/</span>
    <span>let</span> matchResult = callSite.match(namedStackRegExp)
    <span>const</span> fileName = matchResult[<span>1</span>]
    <span>return</span> path.dirname(fileName)
}
<span>module</span>.exports = extractCallDir;
```

### 11.4 writeFileTree.js

packages\\utils\\writeFileTree.js

```
<span>const</span> path = <span>require</span>(<span>'path'</span>);
<span>const</span> fs = <span>require</span>(<span>'fs-extra'</span>);
<span>async</span> <span><span>function</span> <span>writeFileTree</span>(<span>projectDir, files</span>) </span>{
    <span>Object</span>.keys(files).forEach(<span><span>file</span> =&gt;</span> {
        <span>let</span> content = files[file];
        <span>if</span> (file.endsWith(<span>'.ejs'</span>)) file = file.slice(<span>0</span>, <span>-4</span>);
        <span>const</span> filePath = path.join(projectDir, file);
        fs.ensureDirSync(path.dirname(filePath));<span>//先确保文件所在的目录 是存在</span>
        fs.writeFileSync(filePath,content);
    });
}

<span>module</span>.exports = writeFileTree;
```

### 11.5 utils\\index.js

packages\\utils\\index.js

```
<span>+const path = require('path');</span>
exports.log = require('./log');
exports.executeNodeScript = require('./executeNodeScript');
exports.config = require('./config');
exports.withLoading = require('./withLoading');
exports.request = require('./request');
<span>+exports.loadModule = require('./loadModule');</span>
<span>+exports.mergeDeps = require('./mergeDeps');</span>
<span>+exports.extractCallDir = require('./extractCallDir');</span>
<span>+exports.writeFileTree = require('./writeFileTree');</span>
<span>+exports.isObject = val =&gt; typeof val === 'object';</span>
<span>+exports.isString = val =&gt; typeof val === 'string';</span>
```

### 11.6 GeneratorAPI.js

packages\\create\\lib\\GeneratorAPI.js

```
<span>const</span> fs = <span>require</span>(<span>'fs'</span>);
<span>const</span> ejs = <span>require</span>(<span>'ejs'</span>);
<span>const</span> path = <span>require</span>(<span>'path'</span>);
<span>const</span> { promisify } = <span>require</span>(<span>'util'</span>);
<span>const</span> glob = promisify(<span>require</span>(<span>'glob'</span>));
<span>const</span> { isBinaryFile } = <span>require</span>(<span>'isbinaryfile'</span>);
<span>const</span> { runTransformation } = <span>require</span>(<span>'vue-codemod'</span>)
<span>const</span> { isObject, isString, extractCallDir, mergeDeps } = <span>require</span>(<span>"@vite100/utils"</span>);
<span><span>class</span> <span>GeneratorAPI</span> </span>{
    <span>constructor</span>(id, creator, projectOptions) {
        <span>this</span>.id = id;
        <span>this</span>.creator = creator;
        <span>this</span>.projectOptions = projectOptions;
    }
    <span>//插入文件处理中间件</span>
    <span>async</span> _injectFileMiddleware(middleware) {
        <span>this</span>.creator.fileMiddlewares.push(middleware);
    }
    <span>//渲染拷贝文件</span>
    render(source) {
        <span>const</span> baseDir = extractCallDir();
        <span>if</span> (isString(source)) {
            source = path.resolve(baseDir, source)
            <span>this</span>._injectFileMiddleware(<span>async</span> (files, projectOptions) =&gt; {
                <span>const</span> templateFiles = <span>await</span> glob(<span>'**/*'</span>, { <span>cwd</span>: source, <span>nodir</span>: <span>true</span> });
                <span>for</span> (<span>let</span> i = <span>0</span>; i &lt; templateFiles.length; i++) {
                    <span>let</span> templateFile = templateFiles[i];
                    files[templateFile] = <span>await</span> renderFile(path.resolve(source, templateFile), projectOptions);
                }
            });
        }
    }
    <span>//扩展依赖包</span>
    extendPackage(toMerge) {
        <span>const</span> pkg = <span>this</span>.creator.pkg;
        <span>for</span> (<span>const</span> key <span>in</span> toMerge) {
            <span>const</span> value = toMerge[key];
            <span>let</span> existing = pkg[key];
            <span>if</span> (isObject(value) &amp;&amp; (key === <span>'dependencies'</span> || key === <span>'devDependencies'</span>)) {
                pkg[key] = mergeDeps(existing || {}, value);
            } <span>else</span> {
                pkg[key] = value;
            }
        }
    }
    <span>//转译脚本</span>
    transformScript(file, codemod, projectOptions = {}) {
        <span>this</span>._injectFileMiddleware(<span>(<span>files</span>) =&gt;</span> {
            files[file] = runTransformation(
                {
                    <span>path</span>: file,
                    <span>source</span>: files[file]
                },
                codemod,
                projectOptions
            )
        })
    }
    <span>//插入导入语句</span>
    injectImport(file, newImport) {
        <span>const</span> imports = (<span>this</span>.creator.imports[file] = <span>this</span>.creator.imports[file] || []);
        imports.push(newImport)
    }
    <span>//入口文件的路径</span>
    <span>get</span> entryFile() {
        <span>return</span> <span>'src/index.js'</span>;
    }
}
<span>//渲染文件</span>
<span>async</span> <span><span>function</span> <span>renderFile</span>(<span>templatePath, projectOptions</span>) </span>{
    <span>if</span> (<span>await</span> isBinaryFile(templatePath)) {
        <span>return</span> fs.readFileSync(templatePath);
    }
    <span>let</span> template = fs.readFileSync(templatePath, <span>'utf8'</span>);
    <span>return</span> ejs.render(template, projectOptions);
}

<span>module</span>.exports = GeneratorAPI;
```

### 11.7 injectImports.js

packages\\create\\lib\\codemods\\injectImports.js

```
<span><span>function</span> <span>injectImports</span>(<span>fileInfo, api, { imports }</span>) </span>{
    <span>const</span> jscodeshift = api.jscodeshift
    <span>const</span> root = jscodeshift(fileInfo.source)
    <span>const</span> declarations = root.find(jscodeshift.ImportDeclaration)
    <span>const</span> toImportAST = <span><span>imp</span> =&gt;</span> jscodeshift(<span>`<span>${imp}</span>\n`</span>).nodes()[<span>0</span>].program.body[<span>0</span>]
    <span>const</span> importASTNodes = imports.map(toImportAST);
    <span>if</span> (declarations.length) {
        declarations.at(<span>-1</span>).insertAfter(importASTNodes)
    } <span>else</span> {
        root.get().node.program.body.unshift(...importASTNodes)
    }
    <span>return</span> root.toSource()
}

<span>module</span>.exports = injectImports;
```

### 11.8 Creator.js

packages\\create\\lib\\Creator.js

```
const { prompt } = require("inquirer");
const path = require("path");
const fs = require("fs-extra");
const { red } = require("chalk");
const userhome = require("userhome");
const {promisify} = require('util');
const execa = require("execa");
<span>+const glob = promisify(require('glob'));</span>
const clone = promisify(require('clone-git-repo'));
<span>+const { runTransformation } = require('vue-codemod')</span>
const PromptModuleAPI = require("./PromptModuleAPI");
<span>+const GeneratorAPI = require('./GeneratorAPI');</span>
<span>+const { isBinaryFile } = require('isbinaryfile');</span>
<span>+const { log,config,withLoading ,request,loadModule,writeFileTree} = require("@vite100/utils");</span>
const { TEMPLATES } = require("@vite100/settings");
const defaultFeaturePrompt = {
    name: "features",
    type: "checkbox",
    message: "请选择项目特性:",
    choices: [],
}
class Creator {
    constructor(projectName, projectDir, promptModules) {
        this.projectName = projectName;//项目名称
        this.projectDir = projectDir;//项目路径
        this.featurePrompt = defaultFeaturePrompt;//默认选项框
        this.injectedPrompts = [];//插入插入的选择框
        this.promptCompleteCbs = [];//选择结束之后的回调
        this.plugins = [];//插件
<span>+       this.fileMiddlewares = [];//文件中间件</span>
<span>+       this.files = {};//最终输出的文件列表</span>
<span>+       this.pkg = {};//我描述内容</span>
<span>+       this.imports={};//额外的导入语句</span>
        const promptModuleAPI = new PromptModuleAPI(this);
        promptModules.forEach((module) =&gt; module(promptModuleAPI));
    }
    async create() {
        //获取选择项
        const projectOptions = (this.projectOptions = await this.promptAndResolve());
        console.log('projectOptions', projectOptions);
        //{historyMode: 'browser',appTitle: 'AppTitle'}
        //准备项目目录
        await this.prepareProjectDir();
        //下载模板，给templateDir赋值
        await this.downloadTemplate();
         //把项目拷贝到模板中
        await fs.copy(this.templateDir, this.projectDir);
        const pkgPath = path.join(this.projectDir, 'package.json');
        let pkg = (this.pkg = await fs.readJSON(pkgPath));
        const deps = Reflect.ownKeys(projectOptions.plugins);
        deps.forEach(dep =&gt; pkg.devDependencies[dep] = `latest`);
        await fs.writeJSON(pkgPath,pkg,{spaces:2});
         //初始化git仓库
        await execa("git", ["init"], { cwd: this.projectDir, stdio: "inherit" });
        log.info("vite100", "在%s安装依赖", this.projectDir);
        await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });
<span>+       //解析插件,拿到插件的generator方法</span>
<span>+       const resolvedPlugins = await this.resolvePlugins(projectOptions.plugins);</span>
<span>+       //应用插件</span>
<span>+       await this.applyPlugins(resolvedPlugins);</span>
<span>+       await this.initFiles();</span>
<span>+       //准备文件内容</span>
<span>+       await this.renderFiles();</span>
<span>+       //删除插件的依赖</span>
<span>+       deps.forEach(dep =&gt;  delete pkg.devDependencies[dep]);</span>
<span>+       this.files['package.json'] = JSON.stringify(pkg,null,2);</span>
<span>+       //把文件写入硬盘</span>
<span>+       await writeFileTree(this.projectDir, this.files);</span>
<span>+       //重新安装额外的依赖</span>
<span>+       await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });</span>
    }
<span>+   async initFiles(){</span>
<span>+       const projectFiles = await glob('**/*', { cwd: this.projectDir, nodir: true });</span>
<span>+       for (let i = 0; i &lt; projectFiles.length; i++) {</span>
<span>+           let projectFile = projectFiles[i];</span>
<span>+           let projectFilePath = path.join(this.projectDir,projectFile);</span>
<span>+           let content;</span>
<span>+           if (await isBinaryFile(projectFilePath)) {</span>
<span>+               content =  await fs.readFile(projectFilePath);</span>
<span>+           }else{</span>
<span>+               content =  await fs.readFile(projectFilePath,'utf8');</span>
<span>+           }</span>
<span>+           this.files[projectFile] = content;</span>
<span>+       }</span>
<span>+   }</span>
<span>+    async renderFiles() {</span>
<span>+        const {files,projectOptions} = this;</span>
<span>+        for (const middleware of this.fileMiddlewares) {</span>
<span>+          await middleware(files,projectOptions);</span>
<span>+        }</span>
<span>+        Object.keys(files).forEach(file =&gt; {</span>
<span>+          let imports = this.imports[file]</span>
<span>+          if (imports &amp;&amp; imports.length &gt; 0) {</span>
<span>+            files[file] = runTransformation(</span>
<span>+              { path: file, source: files[file] },</span>
<span>+              require('./codemods/injectImports'),</span>
<span>+              { imports }</span>
<span>+            )</span>
<span>+          }</span>
<span>+        })</span>
<span>+      }</span>
<span>+    async resolvePlugins(rawPlugins) {</span>
<span>+        const plugins = [];</span>
<span>+        for (const id of Reflect.ownKeys(rawPlugins)) {</span>
<span>+          const apply = loadModule(`${id}/generator`, this.projectDir);</span>
<span>+          let options = rawPlugins[id];</span>
<span>+          plugins.push({ id, apply, options });</span>
<span>+        }</span>
<span>+        return plugins;</span>
<span>+    }</span>
<span>+    async applyPlugins(plugins) {</span>
<span>+        for (const plugin of plugins) {</span>
<span>+          const { id, apply, options } = plugin;</span>
<span>+          const generatorAPI = new GeneratorAPI(id, this, options);</span>
<span>+          await apply(generatorAPI, options);</span>
<span>+        }</span>
<span>+      }</span>
    async downloadTemplate() {
        const { GIT_TYPE, ORG_NAME } = config;
        let repos = await withLoading("读取模板列表", async () =&gt;
            request.get(`/orgs/${ORG_NAME}/repos`)
        );
        let { repo } = await prompt({
            name: "repo",
            type: "list",
            message: "请选择模板",
            choices: repos.map((repo) =&gt; repo.name)
        });
        let tags = await withLoading("读取标签列表", async () =&gt;
            request.get(`/repos/${ORG_NAME}/${repo}/tags`)
        );
        let { tag } = await prompt({
            name: "tag",
            type: "list",
            message: "请选择版本",
            choices: tags,
        });
        let repository = GIT_TYPE + `:${ORG_NAME}/${repo}`;
        if (tag) repository += `#${tag}`;
        const downloadDirectory = userhome(TEMPLATES);
        let templateDir = (this.templateDir = `${downloadDirectory}/${repo}/${tag}`);
        log.info("vite3", "准备下载模板到%s", templateDir);
        try {
            await fs.access(templateDir);
        } catch (error) {
            log.info("vite100", "从仓库下载%s", repository);
            await clone(repository, templateDir, { clone: true });
        }
    }
    async prepareProjectDir() {
        let { projectDir } = this;
        try {
            await fs.access(projectDir);
            const files = await fs.readdir(projectDir);
            if (files.length &gt; 0) {
                const { overwrite } = await prompt({
                    type: "confirm",
                    name: "overwrite",
                    message: `目标目录非空，是否要移除存在的文件并继续?`,
                });
                if (overwrite) {
                    await fs.emptyDir(projectDir);
                } else {
                    throw new Error(red("X") + " 操作被取消");
                }
            }
        } catch (error) {
            await fs.mkdirp(projectDir);
        }
        log.info("vite100", "%s目录已经准备就绪", projectDir);
    }
    async promptAndResolve() {
        let prompts = [this.featurePrompt, ...this.injectedPrompts];
        let answers = await prompt(prompts);
        let projectOptions = { plugins: {}, };
        this.promptCompleteCbs.forEach((cb) =&gt; cb(answers, projectOptions));
        return projectOptions;
    }
}
module.exports = Creator;
```

## 12\. 实现插件

### 12.1 App.js.ejs

packages\\cli-plugin-router\\template\\src\\App.js.ejs

```
<span>import</span> React <span>from</span> <span>'react'</span>;
<span><span>function</span> <span>App</span>(<span></span>)</span>{
    <span>return</span> <span><span>&lt;<span>div</span>&gt;</span><span>&lt;<span>%=appTitle%</span>&gt;</span><span>&lt;/<span>div</span>&gt;</span></span>
}
<span>export</span> <span>default</span> App;
```

### 12.2 routesConfig.js

packages\\cli-plugin-router\\template\\src\\routesConfig.js

```
<span>import</span> App <span>from</span> <span>'./App'</span>;
<span>export</span> <span>default</span> [
    {
        <span>path</span>: <span>'/'</span>,
        <span>component</span>: App
    }
]
```

### 12.3 generator.js

packages\\cli-plugin-router\\generator.js

```
<span>module</span>.exports = <span>async</span> (api, options) =&gt; {
    api.render(<span>'./template'</span>);
    api.injectImport(api.entryFile,
        <span>`import {<span>${options.historyMode === <span>'hash'</span> ? <span>'HashRouter'</span> : <span>'BrowserRouter'</span>}</span> as Router,Route} from 'react-router-dom'`</span>);
    api.injectImport(api.entryFile,
        <span>`import routesConfig from './routesConfig'`</span>);
    api.injectImport(api.entryFile,
        <span>`import { renderRoutes } from "react-router-config"`</span>);
    api.transformScript(api.entryFile, <span>require</span>(<span>'./injectRouter'</span>))
    api.extendPackage({
        <span>dependencies</span>: {
            <span>'react-router-dom'</span>: <span>'latest'</span>,
            <span>'react-router-config'</span>: <span>'latest'</span>
        }
    });
}
```

### 12.4 injectRouter.js

packages\\cli-plugin-router\\injectRouter.js

```
<span>module</span>.exports = <span>(<span>file, api</span>) =&gt;</span> {
    <span>const</span> jscodeshift = api.jscodeshift
    <span>const</span> root = jscodeshift(file.source)
    <span>const</span> appImportDeclaration = root.find(jscodeshift.ImportDeclaration, (node) =&gt; {
        <span>if</span>(node.specifiers[<span>0</span>].local.name === <span>'App'</span>){
            <span>return</span> <span>true</span>
        }
    })
    <span>if</span>(appImportDeclaration)
        appImportDeclaration.remove();

    <span>const</span> appJSXElement = root.find(jscodeshift.JSXElement, (node) =&gt; {
        <span>if</span> (node.openingElement.name.name === <span>'App'</span>) {
            <span>return</span> <span>true</span>
        }
    })
    <span>if</span>(appJSXElement)
     appJSXElement.replaceWith(<span>(<span>{ node }</span>) =&gt;</span> {
         <span>return</span> jscodeshift.jsxElement(
            jscodeshift.jsxOpeningElement(jscodeshift.jsxIdentifier(<span>'Router'</span>)), jscodeshift.jsxClosingElement(jscodeshift.jsxIdentifier(<span>'Router'</span>)), [
                jscodeshift.jsxExpressionContainer(
                    jscodeshift.callExpression(jscodeshift.identifier(<span>'renderRoutes'</span>),[jscodeshift.identifier(<span>'routesConfig'</span>)])
                )
            ], <span>false</span>
         );
    })
    <span>return</span> root.toSource()
}
```

## 13.发布

### 13.1 创建组织

-   [create](https://www.npmjs.com/org/create)

### 13.2 发布

package.json

```
{
  <span>"publishConfig"</span>: {
    <span>"access"</span>: <span>"public"</span>,
    <span>"registry"</span>: <span>"http://registry.npmjs.org"</span>
  }
}
```

```
npm whoami
npm login
zhangrenyang2000
lerna publish
```

## 14.参考

### 14.1 lerna

| 命令 | 功能 |
| --- | --- |
| lerna bootstrap | 安装依赖 |
| lerna clean | 删除各个包下的node\_modules |
| lerna init | 创建新的lerna库 |
| lerna list | 查看本地包列表 |
| lerna changed | 显示自上次release tag以来有修改的包， 选项通 list |
| lerna diff | 显示自上次release tag以来有修改的包的差异， 执行 git diff |
| lerna exec | 在每个包目录下执行任意命令 |
| lerna run | 执行每个包package.json中的脚本命令 |
| lerna add | 添加一个包的版本为各个包的依赖 |
| lerna import | 引入package |
| lerna link | 链接互相引用的库 |
| lerna create | 新建package |
| lerna publish | 发布 |

### 14.3 yarn

| 命令 | 说明 |
| --- | --- |
| yarn -v | 查看yarn版本 |
| yarn config list | 查看yarn的所有配置 |
| yarn config set registry [https://registry.npm.taobao.org/](https://registry.npm.taobao.org/) | 修改yarn的源镜像为淘宝源 |
| yarn config set global-folder "D:\\RTE\\Yarn\\global" | 修改全局安装目录, 先创建好目录(global), 我放在了Yarn安装目录下(D:\\RTE\\Yarn\\global) |
| yarn config set prefix "D:\\RTE\\Yarn\\global\\" | 修改全局安装目录的bin目录位置 |
| yarn config set cache-folder "D:\\RTE\\Yarn\\cache" | 修改全局缓存目录, 先创建好目录(cache), 和global放在同一层目录下 |
| yarn config list | 查看所有配置 |
| yarn global bin | 查看当前yarn的bin的位置 |
| yarn global dir | 查看当前yarn的全局安装位置 |

### 14.4 workspace

-   [yarn官网](https://yarn.bootcss.com/docs/)
-   yarn add <package...> \[--ignore-workspace-root-check/-W\]
-   yarn add <package...> \[--dev/-D\]

| 作用 | 命令 |
| --- | --- |
| 查看工作空间信息 | yarn workspaces info |
| 给所有的空间添加依赖 | yarn workspaces run add lodash |
| 给根空间添加依赖 | yarn add -W -D typescript jest |
| 给某个项目添加依赖 | yarn workspace create-react-app3 add commander |
| 删除所有的 node\_modules | lerna clean 等于 yarn workspaces run clean |
| 安装和link所有的名 | yarn install 等于 lerna bootstrap --npm-client yarn --use-workspaces |
| 重新获取所有的 node\_modules | yarn install --force |
| 查看缓存目录 | yarn cache dir |
| 清除本地缓存 | yarn cache clean |
| 在所有package中运行指定的命令 | yarn workspaces run  |

### 14.3 yargs

-   [yargs](https://www.npmjs.com/package/yargs)帮助你构建交互命令行工具，可以解析参数生成优雅的用户界面

```
<span>const</span> yargs = <span>require</span>(<span>"yargs/yargs"</span>);
<span>const</span> cli = yargs();
cli
    .usage(<span>`Usage: vite100 &lt;command&gt; [options]`</span>)
    .demandCommand(<span>1</span>, <span>"至少需要一个命令"</span>)
    .strict()
    .recommendCommands()
    .command({
        <span>command</span>: <span>"create &lt;name&gt;"</span>,
        <span>describe</span>: <span>"创建项目"</span>,
        <span>builder</span>: <span>(<span>yargs</span>) =&gt;</span> {
            yargs.positional(<span>"name"</span>, {
                <span>type</span>: <span>"string"</span>,
                <span>describe</span>: <span>"项目名称"</span>,
            });
        },
        <span>handler</span>: <span>async</span> <span><span>function</span> (<span>argv</span>) </span>{
           <span>console</span>.log(argv);
           <span>//{ _: [ 'create' ], '$0': 'doc\\1.yargs.js', name: 'p1' }</span>
        }
    })
    .parse(process.argv.slice(<span>2</span>));

```

### 14.5 node -e

-   [node -e](https://nodejs.org/api/cli.html#cli_e_eval_script)可以直接执行一段js脚本并输入
-   \-e, --eval "script"
-   设置`stdion: 'inherit'`,当执行代码时,子进程将会继承主进程的stdin、stdout和stderr

```
node -e <span>"console.log(process.argv)"</span> -- a b
node -e <span>"console.log(JSON.parse(process.argv[1]))"</span> -- <span>"{\"name\":\"zhufeng\"}"</span>
node -e <span>"console.log(process.cwd())"</span>
```

```
<span>const</span> spawn = <span>require</span>(<span>"cross-spawn"</span>);
<span>async</span> <span><span>function</span> <span>executeNodeScript</span>(<span>{ cwd }, source, args</span>) </span>{
    <span>return</span> <span>new</span> <span>Promise</span>(<span>(<span>resolve</span>) =&gt;</span> {
      <span>const</span> childProcess = spawn(
        process.execPath,
        [<span>"-e"</span>, source, <span>"--"</span>, <span>JSON</span>.stringify(args)],
        { cwd, <span>stdio</span>: <span>"inherit"</span> }
      );
      childProcess.on(<span>"close"</span>, resolve);
    });
}
<span>module</span>.exports = executeNodeScript;
```

### 14.6 clone

-   [clone-git-repo](https://www.npmjs.com/package/clone-git-repo)用来克隆和下载仓库

```
<span>const</span> clone = <span>require</span>(<span>'clone-git-repo'</span>);
<span>let</span> repository = <span>'gitee:zhufengtemplate/template-react#v1.0'</span>;
clone(repository,<span>'./output'</span>, {<span>clone</span>:<span>true</span>},<span><span>function</span> (<span>err</span>) </span>{
    <span>console</span>.log(err);
})
```

### 14.7 jscodeshift

-   [jscodeshift](https://www.npmjs.com/package/jscodeshift)是一个执行代码更改的工具包

```
<span>let</span> jscodeshift = <span>require</span>(<span>'jscodeshift'</span>);
<span>const</span> ast =  jscodeshift(<span>`import ReactDOM from "react-dom"`</span>);
<span>console</span>.log(ast.nodes());
<span>console</span>.log(ast.nodes()[<span>0</span>]);
<span>console</span>.log(ast.nodes()[<span>0</span>].program);
<span>console</span>.log(ast.nodes()[<span>0</span>].program.body[<span>0</span>]);
```

### 14.8 vue-codemod

-   [vue-codemod](https://www.npmjs.com/package/vue-codemod)包含了代码变量脚本的工具集

```
<span>const</span> { runTransformation } = <span>require</span>(<span>'vue-codemod'</span>)
<span>let</span> file = <span>'index.js'</span>;
<span>let</span> source = <span>`
import React from 'react';
`</span>;
<span>let</span> imports = [<span>'import ReactDOM from "react-dom"'</span>];
<span>let</span> transformed = runTransformation(
    { <span>path</span>: file, source },
    injectImports,
    { imports }
)
<span>console</span>.log(transformed);

<span><span>function</span> <span>injectImports</span>(<span>fileInfo, api, { imports }</span>) </span>{
    <span>const</span> jscodeshift = api.jscodeshift
    <span>const</span> root = jscodeshift(fileInfo.source)
    <span>const</span> declarations = root.find(jscodeshift.ImportDeclaration)
    <span>const</span> toImportAST = <span><span>imp</span> =&gt;</span> jscodeshift(<span>`<span>${imp}</span>\n`</span>).nodes()[<span>0</span>].program.body[<span>0</span>]
    <span>const</span> importASTNodes = imports.map(toImportAST);
    <span>if</span> (declarations.length) {
        declarations.at(<span>-1</span>).insertAfter(importASTNodes)
    } <span>else</span> {
        root.get().node.program.body.unshift(...importASTNodes)
    }
    <span>return</span> root.toSource()
}
```