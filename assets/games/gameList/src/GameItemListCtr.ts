const {ccclass, property} = cc._decorator;

@ccclass
export default class GameItemListCtr extends cc.Component {
    @property(cc.Label)
    label: cc.Label = null;   
    cb:Function=null;
    public register(name:string,cb:Function){
        this.label.string = name;
        this.cb=cb;
    } 
    eve(){
        if( this.cb ){
            this.cb();
        }
    }
}
