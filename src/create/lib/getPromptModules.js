
function getPromptModules(){
    //return ['router'].map(file=>require(`./promptModules/${file}`));
    return [
        require(`./promptModules/router`)
    ]
}
module.exports = getPromptModules;