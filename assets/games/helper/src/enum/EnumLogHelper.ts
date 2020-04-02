export enum EnumLogHelper {
  OK,//
  cardShopLogin,//登录卡商,
  RegisterGameAccout,//注册游戏账
  GetIphoneID,//获取号码,
  GetIphoneCode,//获取验证码  
  AccountGameLogin,//游戏账号登录
  AccountGameSign,//游戏账号签到
}
export var LogHelperTxt = {
  "0": 'NONE',
  "1": '登录卡商',
  "2": '注册游戏账号',
  "3": '获取号码',
  "4": '获取验证码',
  "5": '游戏账号登录',
  "6": '游戏账号签到'
}
/*----------------------------------*/
export enum EnumLogOperateHeelper {
  NONE,
  OK,// 成功
  ING,//中
  ERROR,//错误
  RESET,//重试
}
export var LogOperateHeelperTxt = {
  "0": '',
  "1": '成功',
  "2": '中...',
  "3": '错误',
  "4": '重试',
}