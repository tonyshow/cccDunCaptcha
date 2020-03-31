import AccountHelper from "./AccountHelper";

 
//auto import end
export default class AccountHelper34cc extends AccountHelper {
    //auto Definition variable start 
    //auto Definition variable end
    constructor(){super();} 
    //auto Definition function start
    // 获取json对象
    public getJData():any{
        let info= super.getJData();
        info.money = this['memberBal'] || 0;
        info.name=this['realName']||'名字未知'
        return info;
    }
    //auto Definition function end
}