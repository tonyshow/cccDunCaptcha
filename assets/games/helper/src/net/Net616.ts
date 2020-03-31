
import { Utils } from "../../../../common/tools/Utils";
import { gloablHelper } from "../GloablHelper";
import BaseHttp from "../../../../common/net/BaseHttp";
import NetHelper from "./NetHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";

export default class Net616 extends NetHelper {
  getCfg(): any {
    return {
      gameShortName: "616",
      chineseName: "开元616",
      appDownloadUrl: 'https://616805.com',
      iphoneCodeUrl: 'https://616805.com/member/mobileVerificationCode/SendMobileVerificationCode?mobile=<iphoneId>',
      iphoneRegisterPost: 'https://616805.com/member/memberManager/registered',
      loginPost: 'https://616805.com/member/memberManager/login',
      registerType: 1,
      cardStopType: EnumCardShopHelper.banma1024,
      netGame: Net616,
      sid: 2271
    }
  }
  private getMd5(_value) {
    let md51 = Utils.getMd5(_value);
    let md5 = Utils.getMd5(md51);
    let a = md5.substr(0, 16)
    let b = md5.substr(16);
    let l = a.split("").reverse().join("") + b.split("").reverse().join("")
    let newValue = l + l.substr(0, 3)
    newValue = Utils.getMd5(newValue);
    return newValue;
  }

  private getMd5Token(_value) {
    let md51 = Utils.getMd5(_value);
    let md5 = Utils.getMd5(md51);
    let a = md5.substr(0, 16)
    let b = md5.substr(16);
    let l = a.split("").reverse().join("") + b.split("").reverse().join("")
    let newValue = l + l.substr(3, 6)
    newValue = Utils.getMd5(newValue);
    return newValue;
  }

  doRegister(_acc: any, _pwd: any, telephone?: number, _code?: any, verifyInput?: string): boolean {
    let isCanRegister = super.doRegister(_acc, _pwd, telephone, _code, verifyInput);
    let md5password = this.getMd5(_pwd)
    let token = this.getMd5Token(_acc)
    let data = {
      userAccount: _acc,
      userPassword: md5password,
      confirmPwd: md5password,
      userName: "",
      validCode: _code,
      email: "",
      userQq: "",
      userWx: "",
      telephone: telephone,
      phoneCode: _code,
      bundleVersionId: "616805.com",
      token: token,
      registerSourceName: "616.com",
      appUuid: "",
      proxyLinkCode: "",
      registerMethodId: 3
    }
    let iphoneRegisterPost = this.getCfg().iphoneRegisterPost
    gloablHelper.mgrNet.http.post(iphoneRegisterPost, data, (serverInfo) => {
      console.log(serverInfo);
    });
    return true
  }
  doLogin(_acc: any, _pwd: any, _cb?: Function) {
    let net: BaseHttp = super.doLogin(_acc, _pwd);
    let md5password = this.getMd5(_pwd)
    let token = this.getMd5Token(_acc)
    let data = {
      userAccount: _acc,
      userPassword: md5password,
      registerSourceName: "616.com",
      token: token,
    }
    let loginPost = this.getCfg().loginPost
    console.log("sendData=" + Utils.jsonToSendData(data))
    net.setContentType("application/x-www-form-urlencoded");
    net.post(loginPost, Utils.jsonToSendData(data), (serverLoginInfo) => {
      if (!!_cb) {
        let tJson = JSON.parse(serverLoginInfo)
        if (tJson.status != 1) {
          _cb(tJson.status, serverLoginInfo)
        } else {
          _cb(null, serverLoginInfo)
        }
      }
    });
    return null;
  }
  doSign() {
    let net: BaseHttp = super.doSign();
    return net;
  }
}
