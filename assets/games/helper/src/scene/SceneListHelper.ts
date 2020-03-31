import BaseScene from "../../../../common/node/scene/BaseScene";
import { gloablHelper } from "../GloablHelper";
import GameItemHelperCtr from "../GameItemHelperCtr";
import { gloabl } from "../../../../common/mgr/Gloabl";
import { UtilNode } from "../../../../common/tools/UtilNode";
import MgrNetHelper from "../mgr/MgrNetHelper";
import Net616 from "../net/Net616";
import Net34cc from "../net/Net34cc";
const { ccclass, property } = cc._decorator;
@ccclass
export default class SceneListHelper extends BaseScene {
  @property(cc.Prefab)
  itemPreb: cc.Prefab = null;
  @property(cc.Node)
  itemParentPos: cc.Node = null;
  onLoad() {
    let thirdGames = {
      // "616": {
      //   gameShortName: "616",
      //   chineseName: "开元616",
      //   appDownloadUrl: 'https://616805.com',
      // },
      "34cc": {
        gameShortName: "34cc",
        chineseName: "34cc",
        appDownloadUrl: 'https://34.cc',
      }
    }
    for (let key in thirdGames) {
      let ctr: GameItemHelperCtr = UtilNode.addPrefabCtr(this.itemParentPos, this.itemPreb);
      ctr.register(key, thirdGames[key], (name) => {
        let listTmpNet = {};
        listTmpNet['616'] = Net616;
        listTmpNet['34cc'] = Net34cc;
        (gloablHelper.mgrNet as MgrNetHelper).registerNet(listTmpNet[name]);
      });
    }
  }
  eveBack() {
    gloabl.mgrScene.loadScene('gameList');
  }
}
