import BasePreb from "../../../common/prefab/BasePreb";
import { gloabl } from "../../../common/mgr/Gloabl";
const { ccclass, property } = cc._decorator;

@ccclass
export default class GameItemHelperCtr extends BasePreb {

  @property(cc.Label)
  gameNameLb: cc.Label = null;

  @property(cc.Label)
  gameUrl: cc.Label = null;

  cb: Function = null;
  url: string = '';
  onLoad() {
    let wg = this.node.addComponent(cc.Widget);
    wg.left = 0;
    wg.right = 0;
    this.node.width = this.node.parent.width - 14;
  }
  public register(name: string, data: any, cb: Function) {
    this.url = data.appDownloadUrl;
    this.gameNameLb.string = name;
    this.gameUrl.string = data.appDownloadUrl;;
    this.cb = cb;
  }
  eve() {
    if (this.cb) {
      this.cb(this.gameNameLb.string, this.gameUrl.string);
    }
  }
  eveUrl() {
    gloabl.platform.openAppUrl(this.url);
  }
  eveGo() {
    if (this.cb) {
      this.cb(this.gameNameLb.string, this.gameUrl.string);
    }
    gloabl.mgrScene.loadScene("autowork");
  }
}
