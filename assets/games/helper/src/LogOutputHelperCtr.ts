import BaseNode from "../../../common/node/BaseNode";
import { EnumLogHelper, EnumLogOperateHeelper, LogHelperTxt, LogOperateHeelperTxt } from "./enum/EnumLogHelper";
import { UtilNode } from "../../../common/tools/UtilNode";
import { Utils } from "../../../common/tools/Utils";
const { ccclass, property } = cc._decorator;
@ccclass
export default class LogOutputHelperCtr extends BaseNode {
  @property(cc.Label)
  label: cc.Label = null;
  infoType: EnumLogHelper = EnumLogHelper.OK;

  @property(cc.color)
  color1: cc.Color = cc.Color.WHITE;
  @property(cc.color)
  color2: cc.Color = cc.Color.RED;

  @property(cc.Node)
  bgNode: cc.Node = null;

  @property(cc.color)
  succColor: cc.Color = cc.Color.BLACK;

  setBgColer(_typeColor: number = 1) {
    let n = _typeColor % 2;
    n = Math.ceil(n);
    if (n == 1) {
      this.bgNode.color = this.color2;
    }
    else {
      this.bgNode.color = this.color1;
    }
  }
  setLog(_infoType?: any, _operateType?: EnumLogOperateHeelper, defaultKey?: any, txt: string = "") {
    let info = Utils.getTime() + _infoType + LogOperateHeelperTxt[_operateType]
    if (!!defaultKey) {
      info += ":" + defaultKey;
    }
    if ('' != txt) {
      info += ":" + txt;
    }
    this.label.string = info
    if (_operateType == EnumLogOperateHeelper.OK || _operateType == EnumLogOperateHeelper.NONE) {
      this.label.node.color = cc.Color.GREEN;
    }
    else if (_operateType == EnumLogOperateHeelper.ING) {
      this.label.node.color = cc.Color.YELLOW;
    }
    else {
      this.label.node.color = cc.Color.RED;
    }
  }
}
