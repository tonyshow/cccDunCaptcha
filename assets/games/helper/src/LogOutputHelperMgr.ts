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
  @property(cc.Label)
  lbTitle: cc.Label = null;
  listCtr = {};
  currCanShowType = "all";
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
    if ('all' == this.currCanShowType) {
      ctr.node.active = true;
    } else {
      ctr.node.active = this.currCanShowType == this.getShowType(_operateType);
    }
    ctr.setLog(LogHelperTxt[tmpKey], _operateType, txt, defaultKey);
    this.refreshLogCnt();
  }
  getShowType(_operateType) {
    if (_operateType == EnumLogOperateHeelper.OK || _operateType == EnumLogOperateHeelper.ING || _operateType == EnumLogOperateHeelper.NONE) {
      return 'log';
    } else if (_operateType == EnumLogOperateHeelper.ERROR) {
      return 'error';
    } else if (_operateType == EnumLogOperateHeelper.RESET) {
      return 'warn';
    }
    return "all";
  }
  onLoad() {
    super.onLoad();
    this.addListerNet('cmdLog', (...arg) => {
      let _infoKey = arg[0];
      let _operateType = arg[1];
      this.setLog(_infoKey, _operateType, arg[2], arg[3]);
    })
  }
  refreshLogCnt() {
    let currCnt = 0;
    for (let key in this.listCtr) {
      let _ctr: LogOutputHelperCtr = this.listCtr[key];
      if (!!_ctr && _ctr.setLog) {
        if ('all' == this.currCanShowType) {
          ++currCnt;
        } else {
          if (this.currCanShowType == this.getShowType(_ctr.operateType)) {
            ++currCnt;
          }
        }
      }
    }
    this.lbTitle.string = `日志(${currCnt})`
  }
  eveLog() { this.currCanShowType = 'log'; this.showTypeCtr(this.currCanShowType); this.refreshLogCnt(); }
  eveWarn() { this.currCanShowType = 'warn'; this.showTypeCtr(this.currCanShowType); this.refreshLogCnt(); }
  eveError() { this.currCanShowType = 'error'; this.showTypeCtr(this.currCanShowType); this.refreshLogCnt(); }
  eveAll() { this.currCanShowType = 'all'; this.showTypeCtr(this.currCanShowType); this.refreshLogCnt(); }
  eveClear() {
    for (let key in this.listCtr) {
      let _ctr: LogOutputHelperCtr = this.listCtr[key];
      if (!!_ctr && _ctr.setLog) {
        if ('all' == this.currCanShowType) {
          _ctr.destroy();
          _ctr = null;
        } else {
          if (this.currCanShowType == this.getShowType(_ctr.operateType)) {
            _ctr.destroy();
            _ctr = null;
          }
        }
      }
    }
  }
  showTypeCtr(_type?: string) {
    for (let key in this.listCtr) {
      let _ctr: LogOutputHelperCtr = this.listCtr[key];
      if (!!_ctr && !!_ctr.setLog && !!_ctr.node) {
        if ('all' == _type) {
          _ctr.node.active = true;
        } else {
          _ctr.node.active = _type == this.getShowType(_ctr.operateType);
        }
      }
    }
  }
}
