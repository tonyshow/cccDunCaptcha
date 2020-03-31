import BaseNode from "../../../../common/node/BaseNode";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class LookAccHelperCtr extends BaseNode {

  @property(cc.Label)
  label: cc.Label = null;
  setTxt(_key: string, _txt: string) {
    this.label.string = `${_key}:${_txt}`
  }
}
