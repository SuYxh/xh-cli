const { prompt } = require("inquirer");
const fs = require("fs-extra");
const { red } = require("chalk");
const userhome = require("userhome");
const { promisify } = require('util');
const execa = require("execa");
const clone = promisify(require('clone-git-repo'));
const { log, config, withLoading, request } = require("../../utils/index");
const { TEMPLATES } = require("../../settings/index");

const defaultFeaturePrompt = {
    name: "features",
    type: "checkbox",
    message: "请选择项目特性:",
    choices: [],
};

class Creator {
    constructor(projectName, projectDir, promptModules) {
        this.projectName = projectName; // 项目名称
        this.projectDir = projectDir; // 项目路径
        this.featurePrompt = defaultFeaturePrompt; // 默认选项框
        this.injectedPrompts = []; // 插入的选择框
        this.promptCompleteCbs = []; // 选择结束之后的回调
    }

    async create() {
        // 获取选择项
        // const projectOptions = (this.projectOptions = await this.promptAndResolve());
        // console.log('projectOptions', projectOptions);
        // { historyMode: 'browser', appTitle: 'AppTitle' }

        // 准备项目目录
        await this.prepareProjectDir();

        // 下载模板，给 templateDir 赋值
        await this.downloadTemplate();

    //把项目拷贝到模板中
       await fs.copy(this.templateDir, this.projectDir);
    //初始化git仓库
       await execa("git", ["init"], { cwd: this.projectDir, stdio: "inherit" });
       log.info("vite100", "在%s安装依赖", this.projectDir);
       await execa("npm", ["install"], { cwd: this.projectDir, stdio: "inherit" });
    }

    async downloadTemplate() {
        const { GIT_TYPE, ORG_NAME } = config;

        let repos = await withLoading("读取模板列表", async () =>
            request.get(`/orgs/${ORG_NAME}/repos`)
        );

        let { repo } = await prompt({
            name: "repo",
            type: "list",
            message: "请选择模板",
            choices: repos.map((repo) => repo.name)
        });

        let tags = await withLoading("读取标签列表", async () =>
            request.get(`/repos/${ORG_NAME}/${repo}/tags`)
        );

        // console.log('tags', tags);

        let { tag } = await prompt({
            name: "tag",
            type: "list",
            message: "请选择版本",
            choices: tags,
        });

        let repository = GIT_TYPE + `:${ORG_NAME}/${repo}`;
        console.log('repository', repository);
        console.log('tag', tag);
        if (tag) repository += `#${tag}`;

        const downloadDirectory = userhome(TEMPLATES);
        let templateDir = (this.templateDir = `${downloadDirectory}/${repo}/${tag}`);

        log.info("Creator", "准备下载模板到%s", templateDir);

        try {
            // 如果目录存在了，就不在 clone 了
            await fs.access(templateDir);
        } catch (error) {
            log.info("Creator", "从仓库下载%s", repository);
            await clone(repository, templateDir, { clone: true });
        }
    }

    async prepareProjectDir() {
        let { projectDir } = this;
        try {
            await fs.access(projectDir);
            const files = await fs.readdir(projectDir);
            if (files.length > 0) {
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
        let projectOptions = { plugins: {} };
        this.promptCompleteCbs.forEach((cb) => cb(answers, projectOptions));
        return projectOptions;
    }
}

module.exports = Creator;