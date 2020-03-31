import BasePlayer from "../../../common/data/BasePlayer";
// 全局类
export default class PlayerFtnn  extends BasePlayer{
    private isGameing :boolean=false;//是否在游戏中
    constructor(){
        super();
    }

    public setIsGameing(isGameing: boolean) { this.isGameing = isGameing; }
    public getIsGameing() { return this.isGameing; }
}