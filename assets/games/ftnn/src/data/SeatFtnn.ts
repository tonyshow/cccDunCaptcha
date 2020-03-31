import BaseSeat from './../../../../common/data/BaseSeat';
export default class SeatFtnn extends BaseSeat {
    //auto Definition variable start  
    private myBets:number=null;
    private name:string=null;
    private betsAccumulate:number=null;
    private chineseName:string=null;
    //auto Definition variable end
    constructor(){super();} 
    //auto Definition function start  
    public setMyBets(_myBets:number){this.myBets=_myBets};
    public getMyBets():number{return this.myBets}
    public setName(_name:string){this.name=_name};
    public getName():string{return this.name}
    public setBetsAccumulate(_betsAccumulate:number){this.betsAccumulate=_betsAccumulate};
    public getBetsAccumulate():number{return this.betsAccumulate}
    public setChineseName(_chineseName:string){this.chineseName=_chineseName};
    public getChineseName():string{return this.chineseName}
    //auto Definition function end
}