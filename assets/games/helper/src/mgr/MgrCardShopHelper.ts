import BaseMgrData from "../../../../common/mgr/BaseMgrData";
import { gloablHelper } from "../GloablHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";

export default class MgrCardShopHelper extends BaseMgrData {
  public list = {};
  constructor() {
    super();
    this.list[EnumCardShopHelper.banma1024] = {
      "loginUrl": "http://api.banma1024.net/api/do.php?action=loginIn&name=<account>&password=<password>",
      "getPhoneUrl": "http://api.banma1024.net/api/do.php?action=getPhone&sid=<sid>&token=<token>&locationMatching=include|exclude&locationLevel=p|c&location=<location>",
      "getMessageUrl": "http://api.banma1024.net/api/do.php?action=getMessage&sid=<sid>&phone=<phone>&token=<token>",
      "token": null,
      "iphoneList": {}
    }
  } 
}