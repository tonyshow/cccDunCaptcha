import BaseMgrData from './../../../../common/mgr/BaseMgrData';
import AccountListHelper from '../data/AccountListHelper';
import AccountHelper from '../data/AccountHelper';
import ConfigPrefabPathHelper from '../data/ConfigPrefabPathHelper';
import { gloablHelper } from '../GloablHelper';
//auto import end
export default class MgrDataHelper extends BaseMgrData {
  //auto Definition variable start
  public accountList: any = {};//[AccountListHelper]
  public isInitLocalData: boolean = false;
  // public kaShangData
  //auto Definition variable end
  constructor() {
    super();
  }

  protected getCfgNew(): any {
    let cfg = super.getCfgNew();
    this.accountList = {};
    cfg['account'] = AccountHelper;
    cfg['configPrefab'] = ConfigPrefabPathHelper;
    return cfg;
  }
  //auto Definition function start
  public initLocalStorage(_gameShortName) {
    let account_helper_list = gloablHelper.mgrData.storage.getItem('account_helper_list' + _gameShortName);
    if (!!this.isInitLocalData) {
      return account_helper_list;
    }
    this.isInitLocalData = true;

    let currGameCfg = gloablHelper.mgrGameApi.getCurrGamCfg(_gameShortName);
    //将本地数据读取读取到内存 
    let listHelp = new AccountListHelper();
    if (!!account_helper_list) {
      for (let key in account_helper_list) {
        let info = account_helper_list[key];
        let accountHelper = new currGameCfg.accountData();
        accountHelper.account = info.account;
        accountHelper.password = info.password;
        accountHelper.importTime = info.importTime
        accountHelper.money = info.money
        accountHelper.shareTime = info.shareTime;
        accountHelper.isRegister = info.isRegister;
        accountHelper.lastSignTime = info.lastSignTime;
        listHelp.add(info.account, accountHelper);
      }
    }
    this.accountList[_gameShortName] = listHelp;
    return account_helper_list;
  }

  //刷新到本地
  public refreshLocalStorage(_gameShortName) {
    this._init(_gameShortName);
    let data = this.accountList[_gameShortName].getJson();
    gloablHelper.mgrData.storage.setItem('account_helper_list' + _gameShortName, data);
  }

  public add(_gameShortName, key, value) {
    this._init(_gameShortName);
    this.accountList[_gameShortName].add(key, value);
  }

  public remove(_gameShortName, key) {
    this._init(_gameShortName);
    this.accountList[_gameShortName].remove(key);
  }
  public getCurrAccountList(_gameShortName?: string) {
    this._init(_gameShortName);
    return this.accountList[_gameShortName];
  }

  public _init(_gameShortName) {
    if (null == this.accountList[_gameShortName]) {
      this.accountList[_gameShortName] = new AccountListHelper();
    }
  }

  // info.account 必须带此参数
  public refreshAccount(_gameShortName, info: any) {
    if (null == this.accountList[_gameShortName]) {
      return;
    }
    (this.accountList[_gameShortName] as AccountListHelper).refreshAccount(info)
    this.refreshLocalStorage(_gameShortName);
  }

  public getAccountInfo(_gameShortName: string, account: string) {
    return (this.accountList[_gameShortName] as AccountListHelper).getAccountInfo(account)
  }

  public getAccountShowInfo(_gameShortName: string, account: string) {
    return (this.accountList[_gameShortName] as AccountListHelper).getAccountShowInfo(account)
  }


  public getAccount(_gameShortName: string, account: string) {
    return (this.accountList[_gameShortName] as AccountListHelper).getAccount(account)
  }
  //auto Definition function end
}