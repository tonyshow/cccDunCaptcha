import BaseMgrNet from "../../../../common/mgr/BaseMgrNet";
import { gloablHelper } from "../GloablHelper";
import BaseNetCardShop from "../net/cardShop/BaseNetCardShop";
import { CardShopNetHelper } from "../enum/EnumCardShopHelper";
import NetHelper from "../net/NetHelper";
export default class MgrNetHelper extends BaseMgrNet {
  public netGame: NetHelper = null;//游戏网络
  public netCardShop: BaseNetCardShop = null;//卡商网络
  public list = {};
  constructor() {
    super();
    // this.netGame = new NetHelper();
    // this.netCardShop = new BaseNetCardShop();
    // this.list = {};
  }
  protected getCfgNew():any{
    let cfg =super.getCfgNew();  
    cfg['netGame']=NetHelper;  
    cfg['netCardShop']=BaseNetCardShop;  
    this.list = {};
    return cfg;
  }

  //注册不同游戏的网络
  public registerNet(netGame) {
    this.netGame = new netGame();
    let info = this.netGame.getCfg()
    this.netCardShop = new CardShopNetHelper[info.cardStopType]();
    this.netCardShop.setCardShopId(info.cardStopType);
  }
}