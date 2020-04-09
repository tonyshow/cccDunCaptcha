import BaseNode from "../../../../common/node/BaseNode";
import { gloablHelper } from "../GloablHelper";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LookAccHelperCtr extends BaseNode {

  @property(cc.Label)
  label: cc.Label = null;

  @property(cc.Node)
  btnNode: cc.Node = null;

  isCanCopy:boolean=false;
  txt:any;
  getKeyInfo(_key) {

  }
  eveCopy(){
    gloablHelper.platform.copyTxtTip(this.txt,"复制成功")
  }
  setTxt(_key: string, _txt: string) {
    let list = _txt.split('|');
    if (list.length == 2) {
      this.label.string = `${list[0]}:${list[1]}`
      this.txt=list[1];
    } else {
      this.label.string = `${_key}:${_txt}`
      this.txt=_txt;
    }

    this.isCanCopy = ('showAccount'==_key ||
      'showPassword'==_key||
      'showId'==_key); 
      this.btnNode.active=this.isCanCopy;
  }
}
