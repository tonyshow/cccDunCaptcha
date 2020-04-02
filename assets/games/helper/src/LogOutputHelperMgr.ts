import BaseNode from "../../../common/node/BaseNode";
import { EnumLogHelper, LogHelperTxt, EnumLogOperateHeelper } from "./enum/EnumLogHelper";
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
  ctrCnt = 0;
  //_infoKey单一格key
  setLog(_infoKey?: EnumLogHelper, _operateType?: EnumLogOperateHeelper, defaultKey?: any, txt: string = "") {
    let tmpKey = `${_infoKey}`;
    let ctr: LogOutputHelperCtr = null;
    let ctrKey = `${tmpKey}`;
    if (!!defaultKey) {
      ctrKey = defaultKey
    }
    if (null == this.listCtr[ctrKey]) {
      let zIndex = 100000 - this.ctrCnt
      ctr = UtilNode.addPrefabCtr(this.parentNodePos, this.prebItem, null, zIndex);
      this.listCtr[ctrKey] = ctr
      var arr = Object.keys(this.listCtr)
      ctr.setBgColer(arr.length);
      ctr.setZIndex(zIndex);
      ++this.ctrCnt;
    } else {
      ctr = this.listCtr[ctrKey];
    }
    ctr.setLog(LogHelperTxt[tmpKey], _operateType, txt, defaultKey);
  }
  onLoad() {
    super.onLoad();
    this.addListerNet('cmdLog', (...arg) => {
      let _infoKey = arg[0];
      let _operateType = arg[1];

      this.setLog(_infoKey, _operateType, arg[2], arg[3]);
    })
  }
}
