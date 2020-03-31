import BaseNetCardShop from "./BaseNetCardShop";
import { gloablHelper } from "../../GloablHelper";
import BaseHttp from "../../../../../common/net/BaseHttp";
export default class NetBanma1024 extends BaseNetCardShop {
  constructor() {
    super();
    this.listUrl = {
      "loginUrl": "http://api.banma1024.net/api/do.php?action=loginIn&name=<account>&password=<password>",
      "getPhoneUrl": "http://api.banma1024.net/api/do.php?action=getPhone&sid=<sid>&token=<token>&locationMatching=include|exclude&locationLevel=p|c&location=<location>",
      "getMessageUrl": "http://api.banma1024.net/api/do.php?action=getMessage&sid=<sid>&phone=<phone>&token=<token>",
      "token": null,
      "iphoneList": {}
    }
  }
  //卡商登录
  doLogin(acc, pwd, cb) {
    super.doLogin(acc, pwd, cb)
    let loginUrl = this.getUrlByKey('loginUrl');
    loginUrl = loginUrl.replace('<account>', acc);
    loginUrl = loginUrl.replace('<password>', pwd);
    let loginNet = new BaseHttp()
    loginNet.get(loginUrl, (data: string) => {
      //1|9244fc419b834c14923f26a200ed7b4cb4f5c5a5
      if (null == data) {
        return;
      }
      let list = data.split('|');
      if (list[0].toString() != "1") {
        gloablHelper.mgrMsg.showPrompt("登录卡商失败code" + list[0]);
        cb(list[1], list);
        return;
      }
      this.setUrlByKet('token', list[1]);
      cb(null, list[1]);
    });
  }
  //获取一个号 sid游戏项目id 来自卡商
  doGetIphone(sid, cb) {
    super.doGetIphone(sid, cb);
    let token = this.getToken();
    let getPhoneUrl = this.getUrlByKey('getPhoneUrl');
    getPhoneUrl = getPhoneUrl.replace('<token>', token);
    getPhoneUrl = getPhoneUrl.replace('<sid>', sid);
    getPhoneUrl = getPhoneUrl.replace('<location>', '%E4%B8%8A%E6%B5%B7');
    let netGetIphone = new BaseHttp()
    netGetIphone.get(getPhoneUrl, (data: string) => {
      if (null == data) {
        return;
      }
      let list = data.split('|');
      if (list[0].toString() != "1") {
        cb(list[0], data);
        return;
      }
      let iphoneId = list[1];
      cb(null, data, iphoneId);
    });
  }
  //获取验证码
  doGetCode(iphone, sid, cb, resetCnt, resetDelayTime) {
    super.doGetCode(iphone, sid, cb, resetCnt, resetDelayTime);
    let getMessageUrl = this.getUrlByKey('getMessageUrl');
    let token = this.getToken();
    getMessageUrl = getMessageUrl.replace('<token>', token);
    getMessageUrl = getMessageUrl.replace('<sid>', sid);
    getMessageUrl = getMessageUrl.replace('<phone>', iphone);
    let netGetCode = new BaseHttp()
    netGetCode.get(getMessageUrl, (data: string) => {
      if (null == data) {
        return;
      }
      let list = data.split('|');
      if (list[0].toString() != "1") {
        --resetCnt;
        if (resetCnt >= 0) {
          cb(list[0], data, resetCnt);
          setTimeout(() => {
            this.doGetCode(iphone, sid, cb, resetCnt, resetDelayTime);
          }, resetDelayTime * 1000)
        }
        return;
      }
      cb(data)
    });
  }
}
