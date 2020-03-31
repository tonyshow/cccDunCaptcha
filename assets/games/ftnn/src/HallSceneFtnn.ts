import BaseScene from "../../../common/node/scene/BaseScene";
const { ccclass, property } = cc._decorator;

@ccclass
export default class HallSceneFtnn extends BaseScene {
  onLoad() {
    super.onLoad();
    // gloabl.mgrScene.loadScene('ftnn'); 
  }
}
