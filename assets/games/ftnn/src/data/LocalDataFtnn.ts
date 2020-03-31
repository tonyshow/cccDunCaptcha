import BaseLocalData from './../../../../common/data/BaseLocalData';
import { UtilFile } from '../../../../common/tools/UtilFile';
//auto import end
export default class LocalDataFtnn extends BaseLocalData {
    //auto Definition variable start
    //auto Definition variable end
    constructor(){super();
        let bakTime = '';
        if( !cc.sys.isNative ){
            bakTime = "?time="+Date.now();
        }
        UtilFile.readJSON('config/config',bakTime).then( (cfgInfo)=>{
            cc.log(cfgInfo)
            this.setJData( cfgInfo );
        } )
    } 
    //auto Definition function start
    //auto Definition function end
}