
import { Utils } from "../../../../common/tools/Utils";
import { gloablHelper } from "../GloablHelper";
import BaseHttp from "../../../../common/net/BaseHttp";
import NetHelper from "./NetHelper";
import { EnumRegisterHelper } from "../enum/EnumRegisterHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";
export default class Net34cc extends NetHelper {
  getCfg(): any {
    return {
      gameShortName: "34cc",
      chineseName: "34cc",
      appDownloadUrl: 'https://34.cc',
      iphoneCodeUrl: 'xx',
      iphoneRegisterPost: 'https://380352.com/wap/user/register',
      loginPost: 'https://380352.com/wap/user/login',
      signInUrl: "https://380352.com/wap/activity/signIn",
      registerType: EnumRegisterHelper.ACCIPHONE,
      cardStopType: EnumCardShopHelper.NONE,
      netGame: Net34cc,
      sid: 2271
    }
  }
  // 44c1f58349454aa2932ef2c062383c78
  doRegister(_acc: any, _pwd: any, telephone?: number, _code?: any, verifyInput?: string,finshCb?:Function): boolean {
    let baseIsRegister = super.doRegister(_acc, _pwd, telephone, _code, verifyInput);
    if (!baseIsRegister) {

    }
    let md5password = Utils.getMd5(_pwd);
    let token = ''
    // let verifyInput = ''//校验码
    let data = {
      uri: "/user/register",
      token: token,
      paramData: {
        userAccount: _acc,
        userPassword: md5password,
        realName: chineseRandomName.generate(),
        phoneNum: telephone,
        planCode: _code,
        version: 2,
        verifyInput: verifyInput,
        siteCode: "jeroi"
      }
    }
    let iphoneRegisterPost = this.getCfg().iphoneRegisterPost
    console.log("sendData=" + JSON.stringify(data))
    let net = new BaseHttp()
    net.setContentType("application/json;charset=UTF-8");
    net.post(iphoneRegisterPost, JSON.stringify(data), (serverInfo) => {
      console.log(serverInfo);
      gloablHelper.mgrMsg.showPrompt("注册成功")
      if(!!finshCb){ 
        finshCb(null,serverInfo)
      }
    });
    return true;
  }
  doLogin(_acc: any, _pwd: any, _cb?: Function) {
    let net: BaseHttp = super.doLogin(_acc, _pwd, _cb);
    let md5password = Utils.getMd5(_pwd);
    let data = {
      uri: "/user/login",
      token: "",
      paramData: {
        userAccount: _acc,
        userPassword: md5password,
        siteCode: "jeroi"
      }
    }
    let loginPost = this.getCfg().loginPost;
    net.setContentType("application/json;charset=UTF-8");
    net.post(loginPost, JSON.stringify(data), (serverInfo) => {
      console.log(serverInfo);
      if (!!_cb) {
        let tmpJData = JSON.parse(serverInfo)
        if (!!tmpJData && tmpJData.currentStatus == 200) {
          // 成功 currentData 
          tmpJData.currentData.member.account = tmpJData.currentData.member.memberAcct;
          tmpJData.currentData.member.token = tmpJData.currentData.token;
          tmpJData.currentData.member.isLogin = true; 
          _cb(null, tmpJData.currentData.member);
        } else {
          _cb(tmpJData.currentStatus, serverInfo);
        }
      }
    });
    return net;
  }
  doSign(_cb, ...arg) {
    let net: BaseHttp = super.doSign(_cb, arg);
    let data = {
      uri: "/activity/signIn",
      token: arg[0],
      paramData: {
        promoSetId: 68,
        siteCode: "jeroi"
      }
    }
    net.setContentType("application/json;charset=UTF-8");
    net.post(this.getCfg().signInUrl, JSON.stringify(data), (serverInfo) => {
      console.log(serverInfo);
      if (!!_cb) {
        // {"currentData":{"promoSetId":68,"siteCode":"jeroi","money":0.13,"repeat":true,"rewardType":1,"lastUpdateUser":"david_jeroi","id":726,"sort":1,"lastUpdateTime":"2020-03-04 23:17:39"},"currentStatus":"200"}
        let tmpJData = JSON.parse(serverInfo)
        if (!!tmpJData && tmpJData.currentStatus == 200) {
          _cb(null, tmpJData.currentData);
        } else {
          // 错误已经签到
          _cb(tmpJData.currentStatus, tmpJData);
        }
      }
    });
    return net;
  }

}
