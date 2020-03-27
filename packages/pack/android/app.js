// 拷贝渠道信息到工程并且替换打包渠道参数
let fs = require("fs");
let path = require("path");
var os = require('os');
var child_process = require("child_process");
var buildConfig = require("./../buildconfig");
// apk输出路径
var apkOutputPath = './output_apk/';
// var channelId = process.argv[2];
// console.log('channelId = ', channelId);
// if (!channelId)
// {
//     console.error('渠道id异常 请输入渠道id');
//     return;
// } 
var app = module.exports = {};
app.doMain = function()
{
    let android_studio_pro_path = path.resolve(__dirname, `./../../../${buildConfig.buildPath.value}/jsb-${buildConfig.template.value}/frameworks/runtime-src/proj.android-studio`);
    console.log('do gradle', android_studio_pro_path);
    child_process.execSync(`cd ${android_studio_pro_path} && gradle assemblerelease`);
}
app.doMain();