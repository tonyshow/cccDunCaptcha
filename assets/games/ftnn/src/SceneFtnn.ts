import PlayerPrebFtnn from "./prefab/PlayerPrebFtnn";
import BaseScene from "../../../common/node/scene/BaseScene";
import { gloabl } from "../../../common/mgr/Gloabl";


const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneFtnn extends BaseScene {
  @property(cc.Prefab)
  hallPlayerPreb: cc.Prefab = null;

  @property(cc.Node)
  headPos: cc.Node = null;
  player: PlayerPrebFtnn = null;
  onLoad() {
    let hallPlayerNode = cc.instantiate(this.hallPlayerPreb)
    this.player = hallPlayerNode.getComponent(PlayerPrebFtnn);
    let widget = hallPlayerNode.addComponent(cc.Widget)
    widget.top = 0;
    widget.bottom = 0;
    widget.left = 0;
    widget.right = 0;
    this.headPos.addChild(hallPlayerNode);
    this.addListerNet('account', this.recvAccount.bind(this), () => { return true; })

    // this.addSimButton( '测试账号',()=>{
    //     gloabl.mgrSim.simAccount.sendAccount(1);
    // })
  }
  recvAccount() {
    this.player.refreshAll(gloabl.mgrData.player);
  }
}
