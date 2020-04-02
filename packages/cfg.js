var app = module.exports = {};

app.getCfgAll = function()
{
    let list = [
        //packagesGroup---------------------------------------------------------------------------------------------------------------------------------------- 
        {
            updateLevel: 2,
            describe: "引擎自定义修改",
            modulePath: "./../../../../",
            path: 'packages/cccEngineDefault',
            url: "https://github.com/tonyshow/cccEngineDefault.git"
        },
        {
            updateLevel: 2,
            describe: "工具",
            modulePath: "./../../../../",
            path: 'packages/tools',
            url: "https://github.com/tonyshow/tools.git"
        },
        {
            updateLevel: 2,
            describe: "打包",
            modulePath: "./../../../../",
            path: 'packages/pack',
            url: "https://github.com/tonyshow/pack.git"
        },
        {
            updateLevel: 2,
            describe: "通用模块",
            modulePath: "./../../../../",
            path: 'assets/common',
            url: "https://github.com/tonyshow/cccCommonSrc.git"
        },
        {
            updateLevel: 2,
            describe: "通用模块资源",
            modulePath: "./../../../../",
            path: 'assets/resources/commonRes',
            url: "https://github.com/tonyshow/cccResCommon.git"
        },
        {
            updateLevel: 2,
            describe: "多语言",
            modulePath: "./../../../../",
            path: 'packages/i18n',
            url: "https://github.com/tonyshow/i18n.git"
        },
        {
            updateLevel: 2,
            describe: "第三方库",
            modulePath: "./../../../../",
            path: 'assets/libs',
            url: "https://github.com/tonyshow/libs.git"
        }
    ];
    return list;
}