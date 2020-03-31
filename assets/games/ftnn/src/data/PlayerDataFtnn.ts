import BasePlayer from './../../../../common/data/BasePlayer';
import PlayerEntityFtnn from '../net/PlayerEntityFtnn';
//auto import end
export default class PlayerDataFtnn extends BasePlayer {
    //auto Definition variable start
    private playerEntity :PlayerEntityFtnn= null;
    //auto Definition variable end
    constructor(){super();} 
    //auto Definition function start
    public setPlayerEntity(_playerEntity){
        this.playerEntity = _playerEntity;
    }
    //auto Definition function end
}