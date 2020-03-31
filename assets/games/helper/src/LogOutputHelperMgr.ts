import BaseNode from "../../../common/node/BaseNode";
import { EnumLogHelper, LogHelperTxt } from "./enum/EnumLogHelper";
import { UtilNode } from "../../../common/tools/UtilNode";
import LogOutputHelperCtr from "./LogOutputHelperCtr";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LogOutputHelperMgr extends BaseNode {
  @property(cc.Prefab)
  prebItem: cc.Prefab = null;
  @property(cc.Node)
  parentNodePos: cc.Node = null;
  listCtr = {};
  //_infoKey单一格key
  setLog(_infoKey?: any, _operateType?: any, txt: string = "") {
    _infoKey = _infoKey.toString();
    let ctr: LogOutputHelperCtr = null;
    if (null == this.listCtr[_infoKey]) {
      ctr = UtilNode.addPrefabCtr(this.parentNodePos, this.prebItem);
      this.listCtr[_infoKey] = ctr
      var arr = Object.keys(this.listCtr)
      ctr.setBgColer(arr.length);
    } else {
      ctr = this.listCtr[_infoKey];
    }
    let enumKey = _infoKey;
    if (_infoKey.split('&').length > 1) {
      enumKey = _infoKey.split('&')[0];
    }
    ctr.setLog(LogHelperTxt[enumKey], _operateType, txt);
  }
}
