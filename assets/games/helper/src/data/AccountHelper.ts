import BaseAccount from './../../../../common/data/BaseAccount';
//auto import end
export default class AccountHelper extends BaseAccount {
  //auto Definition variable start
  public shareTime: number = 0;
  public importTime: number = 0;
  private isLogin: boolean = false;
  private isSign: boolean = false;
  private isRegister: boolean = false//是否已经注册
  private money: number = 0;
  //auto Definition variable end
  constructor() { super(); }
  //auto Definition function start
  // 获取json对象
  public getJData(): any {
    let info = super.getJData();
    info.importTime = this.importTime;
    info.isRegister = this.isRegister;
    info.money = this.money;
    return info;
  }

  //显示
  public getShowInfo(): any {
    let info = super.getShowInfo();
    info.showRegister = "注册状态|" + (this.isRegister ? "已注册" : "未注册")
    if (!!this.isLogin) {
      info.showRegister = "注册状态|" + "已注册";
    }
    info.showLogin = "登录状态|" + (this.isLogin ? "已登录" : "未登录")
    info.showSign = "签到状态|" + (this.isSign ? "已签到" : "未签到")
    return info;
  }
  //auto Definition function end
}