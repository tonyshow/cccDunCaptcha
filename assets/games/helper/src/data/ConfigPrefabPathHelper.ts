import BaseConfigPrefabPath from "../../../../common/data/BaseConfigPrefabPath";
import { gloabl } from "../../../../common/mgr/Gloabl";
export default class ConfigPrefabPathHelper extends BaseConfigPrefabPath {
  constructor() {
    super();
    // gloabl.mgrData.setConfigPrefab(this);
  }
  getCfg() {
    let baseCfg = super.getCfg();
    let selfCfg = [
      { key: "MsgLookAccHelper", value: "games/helper/msg/MsgLookAccHelper", isOpenLoadWait: true },
    ]
    return this.mergeCfg(baseCfg, selfCfg);
  }
}
