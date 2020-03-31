import BaseScene from "../../../common/node/scene/BaseScene";
import BaseNode from "../../../common/node/BaseNode";
import { UtilNode } from "../../../common/tools/UtilNode";
import GameItemListCtr from "./GameItemListCtr";
import { gloabl } from "../../../common/mgr/Gloabl";

// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class SceneGameList extends BaseScene {

  @property(cc.Prefab)
  itemPreb: cc.Prefab = null;

  @property(cc.Node)
  itemParentPos: cc.Node = null;

  gameList = {
    ftnn: '飞艇🐂🐂',
    helper: '游戏助手'
  };
  onLoad() {
    for (let key in this.gameList) {
      console.log(key);
      let ctr: GameItemListCtr = UtilNode.addPrefabCtr(this.itemParentPos, this.itemPreb);
      ctr.register(this.gameList[key], () => {
        gloabl.mgrData.currGame.refresh('shortName', key)
        gloabl.mgrData.currGame.refresh('chineseName', this.gameList[key])
        gloabl.mgrScene.loadScene(key);
      });
    }
  }
  eveBack() {
    gloabl.mgrScene.loadScene('gamelist');
  }
}
