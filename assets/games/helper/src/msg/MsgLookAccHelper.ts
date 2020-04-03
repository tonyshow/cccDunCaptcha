import BaseMsgBox from "../../../../common/node/msg/BaseMsgBox";
import { UtilNode } from "../../../../common/tools/UtilNode";
import LookAccHelperCtr from "./LookAccHelperCtr";
import { gloablHelper } from "../GloablHelper";
import MgrDataHelper from "../mgr/MgrDataHelper";
import MgrNetHelper from "../mgr/MgrNetHelper";
import AccountHelper from "../data/AccountHelper";
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
  account: any = null;

  @property(cc.Node)
  nodeRegister: cc.Node = null;

  @property(cc.Node)
  nodeLogin: cc.Node = null;

  @property(cc.Node)
  nodeSign: cc.Node = null;

  onLoad() {
    super.onLoad();
  }
  start() {
    let accCtr = this.getAccount();
    if (!!accCtr) {
      this.nodeRegister.active = !(!!accCtr['isRegister'])
      if (!!accCtr['isLogin']) {
        this.nodeRegister.active = false;
      }
      this.nodeLogin.active = !(!!accCtr['isLogin'])
      this.nodeSign.active = !(!!accCtr['isSign'])
    }
  }
  addItem(key, _info?: string) {
    if (-1 != _info.indexOf("|")) {
      let ctr: LookAccHelperCtr = UtilNode.addPrefabCtr(this.posNode, this.itemPreb)
      ctr.setTxt(key, _info);
    }
  }
  addItems(_infos) {
    for (let key in _infos) {
      this.addItem(key, _infos[key]);
    }
    this.account = _infos.account;
  }
  eveRegister() {
    console.log(this.account)
    let accCtr = this.getAccount();

    if (!!accCtr && !!accCtr['isRegister']) {
      return gloablHelper.mgrMsg.showPrompt("已注册");
    }
    gloablHelper.mgrEveListener.fire('doRegister', { account: this.account, password: accCtr.password })
  }
  eveLogin() {
    console.log(this.account)
    let accCtr = this.getAccount();
    if (!!accCtr && !!accCtr['isLogin']) {
      return gloablHelper.mgrMsg.showPrompt("已登录");
    }
  }
  eveSign() {
    console.log(this.account)
    let accCtr = this.getAccount();
    if (!!accCtr && !!accCtr['isSign']) {
      return gloablHelper.mgrMsg.showPrompt("已签到");
    }
  }
  getAccount(): AccountHelper {
    let currGameCfg = (gloablHelper.mgrNet as MgrNetHelper).netGame.getCfg();
    let list = (gloablHelper.mgrData as MgrDataHelper).getCurrAccountList(currGameCfg.gameShortName);
    if (!!list) {
      return list[this.account];
    }
    console.error("账号不存在" + this.account);
    return null;
  }
}
