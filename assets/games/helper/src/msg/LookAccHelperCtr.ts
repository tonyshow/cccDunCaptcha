import BaseNode from "../../../../common/node/BaseNode";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LookAccHelperCtr extends BaseNode {

  @property(cc.Label)
  label: cc.Label = null;
  getKeyInfo(_key) {

  }
  setTxt(_key: string, _txt: string) {
    let list = _txt.split('|');
    if (list.length == 2) {
      this.label.string = `${list[0]}:${list[1]}`
    } else {
      this.label.string = `${_key}:${_txt}`
    }
  }
}
