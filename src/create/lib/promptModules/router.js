//cli是一个帮助方法，后面会传过来
module.exports = (promptModuleAPI)=>{
    //添加一个特性的选项
    promptModuleAPI.injectFeature({
        name:'Router',
        value:'router',
        description:'是否支持路由'
    });
    //弹一个选项
    promptModuleAPI.injectPrompt({
        name:'historyMode',
        when:answers=>answers.features.includes('router'),
        message:'请选择history的模式',
        type:'list',
        choices:[
            {name:'hash',value:'hash'},//hash路由
            {name:'browser',value:'browser'}//浏览器路由
        ],
        default:'browser'
    });
    promptModuleAPI.injectPrompt({
        name:'appTitle',
        when:answers=>answers.features.includes('router'),
        message:'请输入根组件的内容',
        type:'text',
        default:'AppTitle'
    });
    //指定选完的回调
    promptModuleAPI.onPromptComplete((answers,projectOptions)=>{
        console.log('router-onPromptComplete,', answers,projectOptions);
        if(answers.features.includes('router')){
            projectOptions.plugins['cli-plugin-router']= {
                historyMode : answers.historyMode
            }
            projectOptions.historyMode = answers.historyMode;
            projectOptions.appTitle = answers.appTitle;
        }
    });
}
/*
router
cssProcessors
redux


每当你启动使用了一个新 特性后，就会安装一个或多个插件，这些插件可以动态修改输出的结果 
*/