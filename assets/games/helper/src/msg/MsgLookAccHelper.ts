import BaseMsgBox from "../../../../common/node/msg/BaseMsgBox";
import { UtilNode } from "../../../../common/tools/UtilNode";
import LookAccHelperCtr from "./LookAccHelperCtr";
const { ccclass, property } = cc._decorator;
/**
 * 支持按钮关闭
 */
@ccclass
export default class MsgLookAccHelper extends BaseMsgBox {

  @property(cc.Prefab)
  itemPreb: cc.Prefab = null;

  @property(cc.Node)
  posNode: cc.Node = null;
  onLoad() {
    super.onLoad();
  }

  addItem(key, _info) {
    let ctr: LookAccHelperCtr = UtilNode.addPrefabCtr(this.posNode, this.itemPreb)
    ctr.setTxt(key, _info);
  }

  addItems(_infos) {
    for (let key in _infos) {
      this.addItem(key, _infos[key]);
    }
  }
}
