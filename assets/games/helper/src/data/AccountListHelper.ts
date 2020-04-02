import BaseDictionary from "../../../../common/data/BaseDictionary";
import AccountHelper from "./AccountHelper";
export default class AccountListHelper extends BaseDictionary {
  constructor() {
    super();
  }
  // info.account 必须带此参数
  refreshAccount(info: any) {
    let accHelper: AccountHelper = this.getValue(info.account);
    if (!!accHelper) {
      accHelper.setJData(info);
      return
    }
    cc.error("refreshAccount", JSON.stringify(info));
  }

  public getAccountInfo(account): any {
    let accHelper: AccountHelper = this.getValue(account);
    if (!!accHelper) {
      return accHelper.getJData();
    }
    return null;
  }

  public getAccountShowInfo(account): any {
    let accHelper: AccountHelper = this.getValue(account);
    if (!!accHelper) {
      return accHelper.getShowInfo();
    }
    return null;
  }


  public getAccount(account): any {
    let accHelper: AccountHelper = this.getValue(account);
    if (!!accHelper) {
      return accHelper;
    }
    return null;
  }


}