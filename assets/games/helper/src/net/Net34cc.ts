
import { Utils } from "../../../../common/tools/Utils";
import { gloablHelper } from "../GloablHelper";
import BaseHttp from "../../../../common/net/BaseHttp";
import NetHelper from "./NetHelper";
import { EnumRegisterHelper } from "../enum/EnumRegisterHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";
import MgrDataHelper from "../mgr/MgrDataHelper";
import { EnumLogHelper, EnumLogOperateHeelper } from "../enum/EnumLogHelper";
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
  doRegister(_acc: any, _pwd: any, telephone?: number, _code?: any, verifyInput?: string, finshCb?: Function): boolean {
    let baseIsRegister = super.doRegister(_acc, _pwd, telephone, _code, verifyInput, finshCb);
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
        realName: '',
        phoneNum: telephone,
        planCode: _code,
        version: 2,
        verifyInput: verifyInput,
        siteCode: "jeroi"
      }
    }
    // chineseRandomName.generate(),
    let iphoneRegisterPost = this.getCfg().iphoneRegisterPost
    console.log("sendData=" + JSON.stringify(data))
    let net = new BaseHttp()
    net.setContentType("application/json;charset=UTF-8");
    gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.RegisterGameAccout, EnumLogOperateHeelper.ING, _acc);
    net.post(iphoneRegisterPost, JSON.stringify(data), (serverInfo) => {
      console.log(serverInfo);
      gloablHelper.mgrEveListener.fire('registerSuccess', { account: _acc, pwd: _pwd, isRegister: true });
      gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.RegisterGameAccout, EnumLogOperateHeelper.OK, _acc);
      (gloablHelper.mgrData as MgrDataHelper).refreshAccount(this.getCfg().gameShortName, { account: _acc, isRegister: true });
      if (!!finshCb) {
        finshCb(null, serverInfo)
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
    gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.AccountGameLogin, EnumLogOperateHeelper.ING, _acc);
    net.post(loginPost, JSON.stringify(data), (serverInfo) => {
      console.log(serverInfo);
      if (!!_cb) {
        let tmpJData = JSON.parse(serverInfo)
        if (!!tmpJData && tmpJData.currentStatus == 200) {
          // 成功 currentData 
          tmpJData.currentData.member.account = tmpJData.currentData.member.memberAcct;
          tmpJData.currentData.member.token = tmpJData.currentData.token;
          tmpJData.currentData.member.money = tmpJData.currentData.member.memberBal;
          tmpJData.currentData.member.isLogin = true;
          (gloablHelper.mgrData as MgrDataHelper).refreshAccount(this.getCfg().gameShortName, { account: _acc, isLogin: true, isRegister: true, token: tmpJData.currentData.token });

          _cb(null, tmpJData.currentData.member);
          gloablHelper.mgrEveListener.fire('loginSuccess', tmpJData.currentData.member);
          gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.AccountGameLogin, EnumLogOperateHeelper.OK, _acc);
        } else {
          gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.AccountGameLogin, EnumLogOperateHeelper.ERROR, _acc);
          _cb(tmpJData.currentStatus, tmpJData);
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
    gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.AccountGameSign, EnumLogOperateHeelper.ING, arg[1]);
    net.post(this.getCfg().signInUrl, JSON.stringify(data), (serverInfo) => {
      console.log(serverInfo);
      if (!!_cb) {
        // {"currentData":{"promoSetId":68,"siteCode":"jeroi","money":0.13,"repeat":true,"rewardType":1,"lastUpdateUser":"david_jeroi","id":726,"sort":1,"lastUpdateTime":"2020-03-04 23:17:39"},"currentStatus":"200"}
        let tmpJData = JSON.parse(serverInfo)
        if (!!tmpJData && tmpJData.currentStatus == 200) {
          _cb(null, tmpJData.currentData);
          tmpJData.currentData.account = arg[1];
          tmpJData.currentData.isSign = true;
          tmpJData.currentData.lastSignTime = Date.now();
          (gloablHelper.mgrData as MgrDataHelper).refreshAccount(this.getCfg().gameShortName, tmpJData.currentData);
          gloablHelper.mgrEveListener.fire('signSuccess', tmpJData.currentData);
          gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.AccountGameSign, EnumLogOperateHeelper.OK, arg[1]);
        } else {
          // 错误已经签到 
          gloablHelper.mgrEveListener.fire('cmdLog', EnumLogHelper.AccountGameSign, EnumLogOperateHeelper.ERROR, arg[1]);
          _cb(tmpJData.currentStatus, tmpJData);
        }
      }
    });
    return net;
  }

}
