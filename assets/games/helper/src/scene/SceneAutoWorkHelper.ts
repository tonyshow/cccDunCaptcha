import BaseScene from "../../../../common/node/scene/BaseScene";
import LogOutputHelperMgr from "../LogOutputHelperMgr";
import { gloabl } from "../../../../common/mgr/Gloabl";
import { gloablHelper } from "../GloablHelper";
import MgrNetHelper from "../mgr/MgrNetHelper";
import { EnumCardShopHelper } from "../enum/EnumCardShopHelper";
import MgrDataHelper from "../mgr/MgrDataHelper";
import AccountListHelper from "../data/AccountListHelper";
import { Utils } from "../../../../common/tools/Utils";
import AccountHelper from "../data/AccountHelper";
import { EnumMsgPrompt } from "../../../../common/enum/EnumMsgPrompt";
import PlayerWorkDataHelperCtr from "../PlayerWorkDataHelperCtr";
import { UtilNode } from "../../../../common/tools/UtilNode";
import { EnumLogHelper, EnumLogOperateHeelper } from "../enum/EnumLogHelper";
import { EnumAccountStateHelper, EnumColoeHelper } from "../enum/EnumAccountStateHelper";

const { ccclass, property } = cc._decorator;
@ccclass
export default class SceneAutoWorkHelper extends BaseScene {
  @property(cc.Label)
  gameNameLab: cc.Label = null;

  @property(cc.Prefab)
  playerItemPreb: cc.Prefab = null;
  @property(cc.Node)
  playerParentPos: cc.Node = null;

  @property(cc.Label)
  accountCntLabel: cc.Label = null;

  isShowAddNewAccount: boolean = false;

  @property(cc.Node)
  addNewMsg: cc.Node = null;

  @property(cc.Node)
  closeAddNewAccountNode: cc.Node = null;

  @property(cc.EditBox)
  edAccount: cc.EditBox = null;
  @property(cc.EditBox)
  edPassword: cc.EditBox = null;


  @property(cc.EditBox)
  iphoneApiAccount: cc.EditBox = null;
  @property(cc.EditBox)
  iphoneApiPassword: cc.EditBox = null;


  accoutCtrList = [];

  isOpenAccountEditor: boolean = false;
  @property(cc.Label)
  editorBtnTxt: cc.Label = null;

  currGameCfg: any = null;

  @property(cc.Node)
  cardShopNode: cc.Node = null;

  @property(cc.Node)
  cardShopOperate: cc.Node = null;


  @property(LogOutputHelperMgr)
  logMgr: LogOutputHelperMgr = null;

  @property(cc.EditBox)
  EditBoxPopularizeID: cc.EditBox = null;

  lastAcc: string = '';
  lastPwd: string = "";
  private checkoutIphoneApiAcAndPwd() {
    let acc = this.iphoneApiAccount.string;
    let pwd = this.iphoneApiPassword.string;
    if (acc == "" || pwd == "") {
      return null;
    }
    return {
      acc: acc,
      pwd: pwd
    };
  }
  eveBack() {
    gloabl.mgrScene.loadScene('helper');
  }
  onLoad() {
    this.currGameCfg = (gloablHelper.mgrNet as MgrNetHelper).netGame.getCfg();
    this.cardShopNode.active = this.currGameCfg.cardStopType != EnumCardShopHelper.NONE
    this.cardShopOperate.active = false;
    this.isOpenAccountEditor = false;
    let acc_list_helper = (gloablHelper.mgrData as MgrDataHelper).initLocalStorage(this.currGameCfg.gameShortName);
    if (!!acc_list_helper) {
      for (let key in acc_list_helper) {
        let info = acc_list_helper[key];
        this.addShow(info);
      }
    }
    this.closeAddNewAccountNode.height = this.node.height * 2;
    this.eveCloseAddNewAccount();
    this.gameNameLab.string = this.currGameCfg.chineseName;

    // --------------------------------------------------------------------网易云注册 -----------------------------------------------------------------------------
    if (!cc.sys.isNative) {
      //初始化网易云注册 
      (gloablHelper.mgrNet as MgrNetHelper).netGame.doInitCaptchaIns((validate) => {
        console.log("收到网易云验证码" + validate);
        (gloablHelper.mgrNet as MgrNetHelper).netGame.doRLS(this.lastAcc, this.lastPwd, Number(this.lastAcc), this.EditBoxPopularizeID.string, validate, () => {

        })
      });
    }
    this.addListerNet('captcha', (validate) => {
      (gloablHelper.mgrNet as MgrNetHelper).netGame.doRLS(this.lastAcc, this.lastPwd, Number(this.lastAcc), this.EditBoxPopularizeID.string, validate, () => {

      }, () => {

      })
    });
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------
    this.addListerNet('registerSuccess', (info) => {
      console.log(info);
      let ctr: PlayerWorkDataHelperCtr = this.importAccountSuccess(info.account, info.pwd)
      this.eveRandAccountBtn();
      if (!ctr) {
        return;
      }
      ctr.showTips(EnumColoeHelper.SUCCESS, "注册成功");
    })
    this.addListerNet('loginSuccess', (info) => {
      let ctr = this.getAccCtrBy(info.account)
      if (!ctr) {
        return;
      }
      ctr.setBgState(EnumAccountStateHelper.LOIN);
      ctr.showTips(EnumColoeHelper.SUCCESS, "登录成功");
      ctr.refreshMoney(info.money);
    })
    this.addListerNet('signSuccess', (info) => {
      let ctr = this.getAccCtrBy(info.account)
      if (!ctr) {
        return;
      }
      ctr.setBgState(EnumAccountStateHelper.SIGN);
      ctr.refreshMoney(info.money);
      ctr.showTips(EnumColoeHelper.SUCCESS, "签到成功");
    })
    this.addLister('doRegister', (info) => {
      let account = info.account;
      let password = info.password;
      this.doGetVerificationRegister(account, password);
    })
    // -----------------将上次的邀请码调出------------
    var eventHandler = new cc.Component.EventHandler();
    eventHandler.component = "SceneAutoWorkHelper";
    eventHandler.handler = "editBoxPopularizeIDClick";
    this.EditBoxPopularizeID.editingReturn.push(eventHandler);
  }
  editBoxPopularizeIDClick() {
    gloablHelper.mgrMsg.showPrompt('SceneAutoWorkHelper');
  }
  getShowShareTime(_sharTime) {
    if (_sharTime == 0) {
      return '无';
    } return Utils.getCurrTime(_sharTime);
  }
  add(info): AccountHelper {
    let account = info.account, password = info.password, importTime = info.importTime, shareTime = info.shareTime
    let list: AccountListHelper = (gloablHelper.mgrData as MgrDataHelper).getCurrAccountList(this.currGameCfg.gameShortName);
    if (list.containsKey(account)) {
      gloablHelper.mgrMsg.showPrompt('账号已导入', EnumMsgPrompt.WARN);
      return null;
    }
    let accountHelper = new AccountHelper();
    accountHelper.account = account;
    accountHelper.password = password;
    accountHelper.importTime = importTime || Date.now();
    accountHelper.shareTime = shareTime || 0;
    (gloablHelper.mgrData as MgrDataHelper).add(this.currGameCfg.gameShortName, account, accountHelper);
    (gloablHelper.mgrData as MgrDataHelper).refreshLocalStorage(this.currGameCfg.gameShortName);
    return accountHelper;
  }
  addShow(info): PlayerWorkDataHelperCtr {
    let account = info.account, password = info.password, importTime = info.importTime
    let ctr: PlayerWorkDataHelperCtr = UtilNode.addPrefabCtr(this.playerParentPos, this.playerItemPreb, null, (10000 - this.accoutCtrList.length));
    let no = this.accoutCtrList.length + 1;
    this.accountCntLabel.string = `账号数据(${no})`
    ctr.setPlayerInfo(info);
    ctr.setNo(no);
    ctr.setGameShortName(this.currGameCfg.gameShortName)
    ctr.setAccount(account);
    ctr.setPassword(password);
    ctr.setImoortTime(Utils.getCurrTime(importTime))
    ctr.refreshMoney(info.money)
    ctr.registerRmCb(this.rmItem.bind(this));
    if (info.isRegister == false) { ctr.setBgState(EnumAccountStateHelper.ERROR) }
    this.edAccount.string = '';
    this.edPassword.string = '';
    this.accoutCtrList.push(ctr);
    return ctr;
  }
  rmItem(_account) {
    // 删除数据
    (gloablHelper.mgrData as MgrDataHelper).remove(this.currGameCfg.gameShortName, _account);
    (gloablHelper.mgrData as MgrDataHelper).refreshLocalStorage(this.currGameCfg.gameShortName);
    // 删除界面
    for (let i = 0; i < this.accoutCtrList.length; ++i) {
      let ctr: PlayerWorkDataHelperCtr = this.accoutCtrList[i];
      if (!!ctr && _account == ctr.account) {
        ctr.onDestroy();
        delete this.accoutCtrList[i];
      }
    }
    gloablHelper.mgrMsg.showPrompt("删除成功");
  }
  //登录卡商操作
  eveLoginIphoneShop() {
    // 需要卡商的判断
    let checkIphoneAccAndPwd = this.checkoutIphoneApiAcAndPwd()
    if (this.currGameCfg.cardStopType != EnumCardShopHelper.NONE) {
      if (null == checkIphoneAccAndPwd) {
        gloablHelper.mgrMsg.showPrompt('请输入卡商账号和密码');
        return false;
      }
    }
    this.logMgr.setLog(EnumLogHelper.cardShopLogin, EnumLogOperateHeelper.ING);
    (gloablHelper.mgrNet as MgrNetHelper).netCardShop.doLogin(checkIphoneAccAndPwd.acc, checkIphoneAccAndPwd.pwd, (err, info) => {
      //成功
      if (!err) {
        this.cardShopNode.active = false;
        this.cardShopOperate.active = true;
        this.logMgr.setLog(EnumLogHelper.cardShopLogin, EnumLogOperateHeelper.OK);

      } else {
        this.logMgr.setLog(EnumLogHelper.cardShopLogin, EnumLogOperateHeelper.ERROR);
      }
    })
    return true;
  }
  //获取一个卡商号码
  eveGetIphoneId() {
    this.logMgr.setLog(EnumLogHelper.GetIphoneID, EnumLogOperateHeelper.ING);
    (gloablHelper.mgrNet as MgrNetHelper).netCardShop.doGetIphone(this.currGameCfg.sid, (err, data, iphoneId) => {
      //成功
      if (!err) {
        this.logMgr.setLog(EnumLogHelper.GetIphoneID, EnumLogOperateHeelper.OK);
        this.logMgr.setLog(EnumLogHelper.GetIphoneCode, EnumLogOperateHeelper.NONE, data);
        let doResetCnt = 60;
        let resetDelayTime = 3;
        (gloablHelper.mgrNet as MgrNetHelper).netCardShop.doGetCode(iphoneId, this.currGameCfg.sid, (err, data, leftResetCnt) => {
          if (!!err) {
            if (leftResetCnt <= 0) {
              this.logMgr.setLog(EnumLogHelper.GetIphoneCode, EnumLogOperateHeelper.NONE, iphoneId + "重试" + (doResetCnt - leftResetCnt) + "失败");
            } else {
              this.logMgr.setLog(EnumLogHelper.GetIphoneCode, EnumLogOperateHeelper.NONE, iphoneId + "重试" + (doResetCnt - leftResetCnt));
            }
          }
        }, doResetCnt, resetDelayTime);
      } else {
        this.logMgr.setLog(EnumLogHelper.GetIphoneID, EnumLogOperateHeelper.ERROR, data);
      }
    })
  }
  eveAddNewAccount() {
    this.closeAddNewAccountNode.active = true;
    this.isShowAddNewAccount = true;
    //显示
    this.addNewMsg.runAction(cc.moveTo(0.1, 0, this.addNewMsg.parent.height * 0.5 - this.addNewMsg.height));
  }
  eveCloseAddNewAccount() {
    this.closeAddNewAccountNode.active = false;
    this.isShowAddNewAccount = false;
    // 隐藏
    let y = this.addNewMsg.parent.height * 0.5;
    this.addNewMsg.runAction(cc.moveTo(0.1, 0, y));
  }
  // 执行获取验证码注册
  doGetVerificationRegister(acc, pwd) {
    this.lastAcc = acc;
    this.lastPwd = pwd;
    this.edAccount.string = acc
    this.edPassword.string = pwd
    this.edAccount.string = acc
    this.edPassword.string = pwd;
    // -----------------------------------------------------------------------------------调取网易验证---------------------------------------------------------------------------------
    if (!cc.sys.isNative) {
      (gloablHelper.mgrNet as MgrNetHelper).netGame.getCaptchaIns().popUp()
    } else {
      gloabl.platform.openCaptcha();
    }
    // ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  }
  // 随机导入
  eveRandAccountBtn() {
    let acc = Utils.randomIphone()
    let pwd = Utils.randomString(9, 1);
    if (!!this.edPassword.string && "" != this.edPassword.string) {
      pwd = this.edPassword.string;
    }
    this.doGetVerificationRegister(acc, pwd);
  }
  //注册成功后再导入到列表
  importAccountSuccess(account, password): PlayerWorkDataHelperCtr {
    let info = {
      account: account,
      password: password
    }
    let acchelper: AccountHelper = this.add(info);
    if (!!acchelper) {
      return this.addShow(acchelper);
    }
    return null;
  }
  //执行导入
  eveImportAccount() {
    let account = this.edAccount.string;
    let password = this.edPassword.string;
    if (!account) {
      gloablHelper.mgrMsg.showPrompt('请输入正确账号', EnumMsgPrompt.ERROR);
      return;
    }
    if (!password) {
      gloablHelper.mgrMsg.showPrompt('请输入密码', EnumMsgPrompt.ERROR);
      return;
    }
    let info = {
      account: account,
      password: password
    }
    let acchelper: AccountHelper = this.add(info);
    if (!!acchelper) {
      this.addShow(acchelper);
    }
  }
  // 打开编辑
  eveOpenEditor() {
    this.isOpenAccountEditor = !!this.isOpenAccountEditor ? false : true;
    for (let i = 0; i < this.accoutCtrList.length; ++i) {
      let ctr: PlayerWorkDataHelperCtr = this.accoutCtrList[i];
      if (!!ctr) {
        ctr.setActive(this.isOpenAccountEditor);
      }
    }
    this.editorBtnTxt.string = this.isOpenAccountEditor ? "返回" : "编辑列表";
  }
  doLogin(cb?: Function, _isTip?: boolean) {
    for (let i = this.accoutCtrList.length - 1; i >= 0; --i) {
      setTimeout(() => {
        let ctr: PlayerWorkDataHelperCtr = this.accoutCtrList[i];
        if (!ctr) {
          return;
        }
        let info = (gloablHelper.mgrData as MgrDataHelper).getAccount(this.currGameCfg.gameShortName, ctr.account);
        if (!!info.isLogin) {
          if (!!_isTip) {
            ctr.showTips(EnumColoeHelper.WARN, "已登录");
          }
          if (!!cb) { cb(ctr, info) }
          return;
        }
        if (!!ctr) {
          (gloablHelper.mgrNet as MgrNetHelper).netGame.doLogin(ctr.account, ctr.password, (err, currentData) => {
            if (null != err) {
              ctr.showTips(EnumColoeHelper.ERROR, currentData.errorMessage || "登录失败");
              ctr.setBgState(EnumAccountStateHelper.ERROR);
              return;
            }
            (gloablHelper.mgrData as MgrDataHelper).refreshAccount(this.currGameCfg.gameShortName, currentData);
            ctr.setBgState(EnumAccountStateHelper.LOIN);
            ctr.showTips(EnumColoeHelper.SUCCESS, "登录成功");
            ctr.refreshMoney(currentData.money);
            if (!!cb) { cb(ctr, currentData) }
          });
        }
      }, 1000 * (this.accoutCtrList.length - i))
    }
  }
  //登录
  eveAutoLogin() {
    this.doLogin(null, true);
  }

  // 自动签到
  eveAutoSign() {
    this.doLogin((ctr: PlayerWorkDataHelperCtr, currentData) => {
      if (!!currentData.isSign) {
        ctr.showTips(EnumColoeHelper.WARN, "已签到");
        return;
      }
      // refreshAccount
      (gloablHelper.mgrNet as MgrNetHelper).netGame.doSign((err, _signServer) => {
        if (null != err) {
          ctr.showTips(EnumColoeHelper.ERROR, _signServer.errorMessage);
          currentData.isSign = true;
          (gloablHelper.mgrData as MgrDataHelper).refreshAccount(this.currGameCfg.gameShortName, currentData);
          return;
        }
        currentData.isSign = true;
        (gloablHelper.mgrData as MgrDataHelper).refreshAccount(this.currGameCfg.gameShortName, _signServer);
        ctr.showTips(EnumColoeHelper.SUCCESS, "签到成功");
        ctr.refreshMoney(_signServer.money);
      }, currentData.token, currentData.account)
    }, false);
  }
  isBaseCanSendNet() {
    if (this.accoutCtrList.length == 0) {
      gloablHelper.mgrMsg.showPrompt("没用户数据,请先导入账号");
      return false;
    }
    if (this.currGameCfg.cardStopType != EnumCardShopHelper.NONE && '' == (gloablHelper.mgrNet as MgrNetHelper).netCardShop.getToken()) {
      gloablHelper.mgrMsg.showPrompt("请先登录卡商");
      return false
    }
    return true
  }
  //触发注册
  eveAutoRegister() {
    if (!this.isBaseCanSendNet()) {
      return false;
    }
    for (let i = 0; i < this.accoutCtrList.length; ++i) {
      let ctr: PlayerWorkDataHelperCtr = this.accoutCtrList[i];
      if (!!ctr) {
        (gloablHelper.mgrNet as MgrNetHelper).netGame.doRegister(ctr.account, ctr.password);
      }
    }
  }

  getAccCtrBy(_account): PlayerWorkDataHelperCtr {
    for (let i = 0; i < this.accoutCtrList.length; ++i) {
      let ctr: PlayerWorkDataHelperCtr = this.accoutCtrList[i];
      if (!!ctr) {
        if (ctr.account == _account) {
          return ctr;
        }
      }
    }
    return null;
  }
}
