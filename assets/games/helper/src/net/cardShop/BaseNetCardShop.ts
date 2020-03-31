import BaseHttp from "../../../../../common/net/BaseHttp";
export default class BaseNetCardShop extends BaseHttp {
  public list = {};
  public listUrl = {};
  public cardShopId: string = '';
  public isLogin: boolean = false;
  //卡商登录
  doLogin(acc, pwd, cb) {

  }
  //获取一个号 sid游戏项目id 来自卡商
  doGetIphone(sid, cb) {

  }
  //获取验证码
  doGetCode(iphone, sid, cb, resetCnt, resetDelayTime) {

  }
  //获取卡商token
  getToken() {
    return this.getUrlByKey('token');
  }
  //获取网接口
  getAllUrl() {

  }
  getUrlByKey(key: string) {
    return this.listUrl[key]
  }
  setUrlByKet(key: string, value: any) {
    this.listUrl[key] = value;
  }
  setCardShopId(cardShopId) {
    this.cardShopId = cardShopId
  }

  public getIsLogin(): boolean {
    return this.isLogin;
  }
}
