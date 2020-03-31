import BaseData from "../../../../common/data/BaseData"

export default class ItemGameData extends BaseData{
    public shortName:string ='';
    public chineseName:string ='';
    constructor(_shortName?:string,_chineseName?:string){
        super();
        this.shortName= _shortName;
        this.chineseName= _chineseName;
    } 
}