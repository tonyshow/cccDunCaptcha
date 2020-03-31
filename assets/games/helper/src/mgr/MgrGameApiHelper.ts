import BaseMgrData from "../../../../common/mgr/BaseMgrData";
import { gloablHelper } from "../GloablHelper";
import { EnumRegisterHelper } from "../enum/EnumRegisterHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";
import Net34cc from "../net/Net34cc";
import Net616 from "../net/Net616";
import AccountHelper34cc from "../data/AccountHelper34cc";
import AccountHelper616 from "../data/AccountHelper616";

export default class MgrGameApiHelper extends BaseMgrData {
  public currChoiceGame: string = "";
  public list = {
    "616": {
      gameShortName: "616",
      chineseName: "开元616",
      appDownloadUrl: 'https://616805.com',
      iphoneCodeUrl: 'https://616805.com/member/mobileVerificationCode/SendMobileVerificationCode?mobile=<iphoneId>',
      iphoneRegisterPost: 'https://616805.com/member/memberManager/registered',
      loginPost: 'https://616805.com/member/memberManager/login',
      registerType: 1,
      cardStopType: EnumCardShopHelper.banma1024,
      netGame: Net616,
      accountData:AccountHelper616,//数据管理类
      sid: 2271
    },
    "34cc": {
      gameShortName: "34cc",
      chineseName: "34cc",
      appDownloadUrl: 'https://34.cc',
      iphoneCodeUrl: 'xx',
      iphoneRegisterPost: 'x',
      loginPost: 'https://380352.com/wap/user/login',
      registerType: EnumRegisterHelper.ACCIPHONE,
      cardStopType: EnumCardShopHelper.NONE,
      netGame: Net34cc,
      accountData:AccountHelper34cc,//数据管理类
      sid: 2271
    }
  }
  constructor() {
    super();
  }
  getCurrGamCfg(_gameShortName?: string):any {
    if (_gameShortName == null) {
      _gameShortName = this.currChoiceGame
    }
    return this.list[_gameShortName];
  }
}