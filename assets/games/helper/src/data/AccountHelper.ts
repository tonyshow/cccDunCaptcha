import BaseAccount from './../../../../common/data/BaseAccount';
//auto import end
export default class AccountHelper extends BaseAccount {
    //auto Definition variable start
    public shareTime:number=0;
    public importTime:number=0;
    private isLogin :boolean=false;
    private isSign:boolean=false;
    //auto Definition variable end
    constructor(){super();} 
    //auto Definition function start
    // 获取json对象
    public getJData():any{
        let info= super.getJData(); 
        info.importTime = this.importTime;
        info.isLogin = this.isLogin?"已登录":"未登录"
        info.isSign = this.isSign?"已签到":"未签到"
        return info;
    }
    //auto Definition function end
}