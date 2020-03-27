module.exports = {
    title:
    {
        explain: "项目名",
        value: "xx"
    },
    buildPath:
    {
        explain: "构建目录",
        value: "build"
    },
    platform:
    {
        explain: "构建的平台 [web-mobile, web-desktop, android, win32, ios, mac, qqplay, wechatgame, fb-instant-games]",
        value: "android"
    },
    debug:
    {
        explain: "是否为 debug 模式",
        value: false
    },
    sourceMaps:
    {
        explain: "是否需要加入 source maps",
        value: false
    },
    inlineSpriteFrames:
    {
        explain: "是否内联所有 SpriteFrame",
        value: false
    },
    mergeStartScene:
    {
        explain: "是否合并初始场景依赖的所有 JSON",
        value: true
    },
    optimizeHotUpdate:
    {
        explain: "是否将图集中的全部 SpriteFrame 合并到同一个包中",
        value: true
    },
    useDebugKeystore:
    {
        explain: "是否使用 debug keystore",
        value: false
    },
    keystorePath:
    {
        explain: "keystore 路径",
        value: "xx"
    },
    keystorePassword:
    {
        explain: "keystore 密码",
        value: "********"
    },
    keystoreAlias:
    {
        explain: "keystore 别名",
        value: "xx"
    },
    keystoreAliasPassword:
    {
        explain: "keystore 别名密码",
        value: "********"
    },
    template:
    {
        explain: "native 平台下的模板选项 [default, link, binary]",
        value: "link"
    },
    apiLevel:
    {
        explain: "设置编译 android 使用的 api 版本",
        value: "android-19"
    },
    appABIs:
    {
        explain: "设置 android 需要支持的 cpu 类型，可以选择一个或多个选项 [armeabi, armeabi-v7a, arm64-v8a, x86]",
        value: "[]"
    },
    androidStudio:
    {
        explain: "是否使用 android studio 来编译 android 项目",
        value: true
    },
    encryptJs:
    {
        explain: "是否在发布 native 平台时加密 js 文件",
        value: true
    },
    xxteaKey:
    {
        explain: "加密 js 文件时使用的密钥",
        value: "xxx"
    },
    zipCompressJs:
    {
        explain: "加密 js 文件后是否进一步压缩 js 文件",
        value: true
    }
};