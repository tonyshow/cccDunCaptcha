import BaseNetCardShop from "../net/cardShop/BaseNetCardShop";
import NetBanma1024 from "../net/cardShop/NetBanma1024";

//注册依赖
export enum EnumCardShopHelper {
  NONE,//无依赖
  banma1024,//斑马卡商
}
// 卡商网络
export var CardShopNetHelper = {
  "0": BaseNetCardShop,
  "1": NetBanma1024,
}