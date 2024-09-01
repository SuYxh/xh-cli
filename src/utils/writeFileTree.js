
let fs = require('fs-extra');
let path = require('path');
function writeFileTree(projectDir,files){
    Object.keys(files).forEach(file=>{
        let content = files[file];
        if(file.endsWith('.ejs')) file = file.slice(0,-4)
        let filePath = path.join(projectDir,file);
        fs.ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath,content);
    });
}
module.exports = writeFileTree;