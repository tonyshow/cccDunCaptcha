import BaseMgrData from './../../../../common/mgr/BaseMgrData';
import PlayerDataFtnn from '../data/PlayerDataFtnn';
import LocalDataFtnn from '../data/LocalDataFtnn';
//auto import end
export default class MgrDataFtnn extends BaseMgrData {
    //auto Definition variable start
    private playerEntity :any =null;
    //auto Definition variable end
    constructor(){super();
        this.player = new PlayerDataFtnn();
        this.localData=new LocalDataFtnn();
    }  
    public setPlayerEntity(_playerEntity){
        this.playerEntity = _playerEntity;
    }

    //auto Definition function start
    //auto Definition function end
}