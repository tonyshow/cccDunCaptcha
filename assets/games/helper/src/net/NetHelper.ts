import BaseHttp from "../../../../common/net/BaseHttp";
import { gloablHelper } from "../GloablHelper";
import MgrNetHelper from "../mgr/MgrNetHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";
// 重新实现网络部分
export default class NetHelper extends BaseHttp {
  captchaIns = null//网易云验证对象
  captchaInsCb = null;
  constructor() {
    super();
  }
  public gameShortName: any = "";
  doRegister(_acc: any, _pwd: any, telephone?: number, _code?: any, verifyInput?: string): boolean {
    //子类自己实现业务逻辑
    if (this.getCfg().cardStopType == EnumCardShopHelper.NONE) {
      return true;
    }
    if ('' == (gloablHelper.mgrNet as MgrNetHelper).netCardShop.getToken()) {
      gloablHelper.mgrMsg.showPrompt("请先登录卡商");
      return false
    }
    return true;
  }
  doLogin(_acc: any, _pwd: any, _cb?: Function) {
    //子类自己实现
    let net = new BaseHttp();
    return net;
  }
  doSign(_cb, ...arg) {
    //子类自己实现
    let net = new BaseHttp();
    return net;
  }
  getCfg(): any {
    return {
      gameShortName: "游戏短名",
      chineseName: "游戏中文名",
      appDownloadUrl: 'app下载地址',
      iphoneCodeUrl: '手机验证码获取地址',
      iphoneRegisterPost: '手机账号注册地址',
      loginPost: '游戏登录地址',
      registerType: 1,
      cardStopType: "卡商",
      netGame: NetHelper,
      sid: "游戏项目id 由卡商提供"
    }
  }

  setCaptchaIns(_captchaIns) {
    this.captchaIns = _captchaIns
  }

  getCaptchaIns() {
    return this.captchaIns;
  }

  destroyCloseCaptchaIns() {
    !this.captchaIns.enableClose || this.captchaIns.enableClose();
    !this.captchaIns.destroy || this.captchaIns.destroy();
  }

  doInitCaptchaIns(cb) {
    this.captchaInsCb = cb
    //初始化网易云注册
    window.initNECaptchaWithFallback({
      // config对象，参数配置
      captchaId: '44c1f58349454aa2932ef2c062383c78',
      element: '#Cocos2dGameContainer',
      mode: 'popup',
      width: '320px',
      onVerify: (err, data) => {
        if (!err) {
          this.destroyCloseCaptchaIns();
          this.captchaInsCb(data);
          this.doInitCaptchaIns(this.captchaInsCb)
          return;
        }
        console.log("onVerify", data)
        console.log(err);
        console.log(data);
      }
    }, (instance) => {
      // 初始化成功后得到验证实例instance，可以调用实例的方法 
      (gloablHelper.mgrNet as MgrNetHelper).netGame.setCaptchaIns(instance);
    }, (err) => {
      // 初始化失败后触发该函数，err对象描述当前错误信息
      cc.error('初始化失败后触发该函数，err对象描述当前错误信息');
    })
  }
}