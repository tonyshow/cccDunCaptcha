import BaseGloabl from "../../../common/mgr/BaseGloabl";
import MgrDataHelper from "./mgr/MgrDataHelper";
import MgrCardShopHelper from "./mgr/MgrCardShopHelper";
import MgrGameApiHelper from "./mgr/MgrGameApiHelper";
import MgrNetHelper from "./mgr/MgrNetHelper";
import MgrMsgHelper from "./mgr/MgrMsgHelper";
import { setGloabl } from "../../../common/mgr/Gloabl";
// 全局类
export default class GloablHelper extends BaseGloabl {
  public mgrIphoneApi: MgrCardShopHelper = null;
  public mgrGameApi: MgrGameApiHelper = null; 
  constructor() { super(); }
  protected getCfgNew():any{
    let cfg=super.getCfgNew();
    cfg['mgrData']=MgrDataHelper;
    cfg['mgrIphoneApi']=MgrCardShopHelper;
    cfg['mgrGameApi']=MgrGameApiHelper;
    cfg['mgrNet']=MgrNetHelper;
    cfg['mgrMsg']=MgrMsgHelper;
    return cfg;
  }
}
//在第一个场景中调用此方法(必现第一时间调用)
export function doNewGlobleHelper(){
  gloablHelper=new GloablHelper();
  gloablHelper.doNew();
  setGloabl( gloablHelper);
  return gloablHelper;
}
export var gloablHelper: GloablHelper;
