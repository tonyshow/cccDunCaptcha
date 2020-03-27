// 拷贝渠道信息到工程并且替换打包渠道参数
let fs = require("fs");
let path = require("path");
var ccc = require('../../tools/utilTool/ccc');
var child_process = require("child_process");
var buildConfig = require("./../buildconfig");
var cccEngineCfg = require("./../../cccEngineDefault/cccEngineCfg");
var buildShellDict = [];
// apk输出路径
// var apkOutputPath = './output_apk/';
// var channelId = process.argv[2];
// console.log('channelId = ', channelId);
// if (!channelId)
// {
//     console.error('渠道id异常 请输入渠道id');
//     return;
// } 
var app = module.exports = {};
app.getCfg = function()
{
    let list = [];
    for (let key in buildConfig)
    {
        list.push(`${key}=${buildConfig[key].value}`);
    }
    return list;
}
app.doMain = function()
{

    buildShellDict = this.getCfg();
    let buildShell = `${cccEngineCfg.getEnginePathExe()} --path ${ path.resolve(__dirname, '../../../')} --build \"${buildShellDict.join(";")}\"`
    ccc.log('---开始编译----' + buildShell)
    child_process.execSync(buildShell);
    ccc.log('---编译完成----')
    ccc.log('---开始制作热更新包----')
}
app.doMain();