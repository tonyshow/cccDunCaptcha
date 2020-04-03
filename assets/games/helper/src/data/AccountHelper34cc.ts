import AccountHelper from "./AccountHelper";


//auto import end
export default class AccountHelper34cc extends AccountHelper {
  //auto Definition variable start 
  //auto Definition variable end
  constructor() { super(); }
  //auto Definition function start
  // 获取json对象
  public getJData(): any {
    let info = super.getJData();
    return info;
  }

  //显示
  public getShowInfo(): any {
    let info = super.getShowInfo();
    info.showMoney = "金币|" + (this['money'] || 0)
    info.showName = "名字|" + (this['realName'] || '未知')
    return info;
  }
  //auto Definition function end
}