import BasePreb from "../../../common/prefab/BasePreb";
import { EnumAccountStateHelper, EnumColoeHelper } from "./enum/EnumAccountStateHelper";
import { gloablHelper } from "./GloablHelper";
import MsgLookAccHelper from "./msg/MsgLookAccHelper";
import MgrDataHelper from "./mgr/MgrDataHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerWorkDataHelperCtr extends BasePreb {
  @property(cc.Label)
  noLabel: cc.Label = null;
  @property(cc.Label)
  accountLb: cc.Label = null;

  @property(cc.EditBox)
  accountEd: cc.EditBox = null;

  @property(cc.Label)
  passwordLb: cc.Label = null;

  @property(cc.EditBox)
  passwordEd: cc.EditBox = null;

  @property(cc.Label)
  shareTimeLb: cc.Label = null;
  @property(cc.Label)
  importTimeLb: cc.Label = null;
  @property(cc.Node)
  rmBtn: cc.Node = null;
  @property(cc.Node)
  accStateAnimNode: cc.Node = null;
  @property(cc.Label)
  accStateAnimLb: cc.Label = null;
  @property([cc.Color])
  public colorList: cc.Color[] = [];

  @property([cc.Color])
  public tipsColorList: cc.Color[] = [];

  rmCb: Function = null;
  public account: any = null;
  public password: any = null;
  playerInfo: any = {};
  gameShortName:string="";
  onLoad() {
    this.accStateAnimNode.active = false;
    this.node.width = this.node.parent.width;
    let w = this.node.addComponent(cc.Widget);
    w.left = 0;
    w.right = 0;
    w.updateAlignment();
    this.node.x = this.node.width
    this.node.runAction(cc.moveTo(0.2, 0, 0));
  }
  public setAccount(_value) {
    this.account = _value;
    this.accountLb.string = '账号';
    this.accountEd.string = '' + _value;
  }
  public setPassword(_value) {
    this.password = _value;
    this.passwordLb.string = '密码';
    this.passwordEd.string = '' + _value;
  }
  public setImoortTime(_value) {
    this.importTimeLb.string = '导入时间:' + _value;
  } 
  public setShareTime(_value) {
 
  }
  public refreshMoney(_money?:any) {
    let info =  (gloablHelper.mgrData as  MgrDataHelper).getAccountInfo(this.gameShortName,this.account);
    this.shareTimeLb.string = '金币:' + (_money || (info.money||0));
  }
  public setNo(_value) {
    this.noLabel.string = '' + _value;
  } 
  public setActive(_is: boolean = false) {
    this.rmBtn.active = _is;
  } 
  public setBgState(_accState: EnumAccountStateHelper = EnumAccountStateHelper.NONE){
      this.node.color = this.colorList[_accState]
  }
  // 设置UI状态
  public showTips(_accState: EnumColoeHelper = EnumColoeHelper.NONE, txt: string = '') { 
    this.accStateAnimLb.node.color= this.tipsColorList[_accState]
    this.accStateAnimNode.active = true;
    this.accStateAnimNode.opacity = 0;
    this.accStateAnimNode.x = 0;
    this.accStateAnimNode.stopAllActions();
    let totalTime = 2;
    let a = cc.sequence([cc.moveBy(totalTime*0.4, -10, 0), cc.delayTime(totalTime*0.4), cc.moveBy(totalTime*0.2, -10, 0)])
    let b = cc.sequence([cc.fadeIn(totalTime*0.2), cc.delayTime(totalTime*0.6), cc.fadeOut(totalTime*0.2)])
    let act = cc.spawn([a, b])
    this.accStateAnimLb.string = txt;
    this.accStateAnimNode.runAction(act);
  }
  eveRm() {
    if (!!this.rmCb) {
      this.rmCb(this.account);
    }
  }
  public registerRmCb(_rmCb: Function = null) {
    this.rmCb = _rmCb;
  }

  public setPlayerInfo(_playerInfo: any) {
    this.playerInfo = _playerInfo;
  }
  public setGameShortName(gameShortName){
    this.gameShortName=gameShortName;
  }
  public eve() {
    gloablHelper.mgrMsg.show("MsgLookAccHelper", (ctr: MsgLookAccHelper, node: cc.Node) => {
      //  this.account
      let info =  (gloablHelper.mgrData as  MgrDataHelper).getAccountInfo(this.gameShortName,this.account);
      ctr.addItems(info);
    });
  }
}
