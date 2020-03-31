import BaseScene from "../../../common/node/scene/BaseScene";
import { gloabl } from "../../../common/mgr/Gloabl";

const { ccclass, property } = cc._decorator;
@ccclass
export default class LoginSceneFtnn extends BaseScene {
  onLoad() {
    super.onLoad();
    this.addListerNet('account', this.recvUIAccout.bind(this));
  }

  public sendAccout() {
    gloabl.mgrNet.sendAccout((Math.random()).toString());
  }

  //监听到数据_serverData为空表示来自自己
  public recvUIAccout(dataType, _serverData) {
    console.log(`界面UI监听到数据类型:${dataType == true ? '服务器数据' : '本地启动'} ${!!_serverData ? JSON.stringify(_serverData) : ''} `);
    gloabl.mgrScene.loadScene('hall');
  }
}
