import BaseRoom from "../../../../common/data/BaseRoom"; 
// 基础数据
export default class RoomFtnn extends BaseRoom {
    //auto Definition variable start
    currRound:number=0;//当前局数
    maxRound:number=0//最大局数

    maxBets:number=0//最大可下投注
    currBets:number=0//当前已下投注
    private matchCnt:number=null;
    //auto Definition variable end
    constructor() {
       super();
    }  
    //auto Definition function start
    public setCurrRound(_currRound: number) { this.currRound = _currRound; }
    public getCurrRound() { return this.currRound; }
    
    public setMaxRound(_maxRound: number) { this.maxRound = _maxRound; }
    public getMaxRound() { return this.maxRound; }

    public setMaxBets(_maxBets: number) { this.maxBets = _maxBets; }
    public getMaxBets() { return this.maxBets; }
    public setMatchCnt(_matchCnt:number){this.matchCnt=_matchCnt};
    public getMatchCnt():number{return this.matchCnt}
    //auto Definition function end
 
    //重连数据处理
    public reset(){

    }  
}
