function injectImports(fileInfo,api,{imports}){
    //imports=['import {HashRouter} from 'react-router-dom'']
    let jscodeshift = api.jscodeshift;
    let astRoot = jscodeshift(fileInfo.source);
    //存放着语法中所有的import语句
    const toImportAstNode = imp=>jscodeshift(`${imp}\n`).nodes()[0].program.body[0];
    let importASTNodes = imports.map(toImportAstNode);
    //importASTNodes=[ImportDeclaration]
    let declarations = astRoot.find(jscodeshift.ImportDeclaration);
    //import只能放置在顶端
    if(declarations.length>0){//如果以前有import 向第一条上面添加imports
        declarations.at(-1).insertAfter(importASTNodes);
    }else{
        astRoot.get().node.program.body.unshift(...importASTNodes);
    }
    return astRoot.toSource();
}
module.exports = injectImports;