import BaseMgrMsg from "../../../../common/mgr/BaseMgrMsg";
import ConfigPrefabPathHelper from "../data/ConfigPrefabPathHelper";
export default class MgrMsgHelper extends BaseMgrMsg {
  constructor() {
    super()
    // this.configPrefab = new ConfigPrefabPathHelper();
  }

  protected getCfgNew():any{
    let cfg =super.getCfgNew();  
    cfg['configPrefab']=ConfigPrefabPathHelper;  
    return cfg;
  }
}