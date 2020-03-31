import BaseGloabl from "../../../common/mgr/BaseGloabl";
import MgrDataFtnn from "./mgr/MgrDataFtnn";
import MgrMsgFtnn from "./mgr/MgrMsgFtnn";
import MgrSceneFtnn from "./mgr/MgrSceneFtnn";
import MgrNetFtnn from "./mgr/MgrNetFtnn";
import MgrSIMFtnn from "./mgr/MgrSIMFtnn";
import MgrEveListenerFtnn from "./mgr/MgrEveListenerFtnn";
// 全局类
export default class GloablFtnn extends BaseGloabl {
  constructor() {
    super();
    this.mgrData = new MgrDataFtnn();
    this.mgrMsg = new MgrMsgFtnn();
    this.mgrScene = new MgrSceneFtnn();
    this.mgrNet = new MgrNetFtnn();
    this.mgrSim = new MgrSIMFtnn();
    this.mgrEveListener = new MgrEveListenerFtnn();
  }
}