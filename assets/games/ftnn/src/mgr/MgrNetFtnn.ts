import BaseMgrNet from './../../../../common/mgr/BaseMgrNet';
import BaseEntityManager from '../net/BaseEntityManager';
import { SocketFtnn } from '../net/SocketFtnn';
import PlayerEntityFtnn from '../net/PlayerEntityFtnn';
import AccountEntityFtnn from '../net/AccountEntityFtnn';
import { gloabl } from '../../../../common/mgr/Gloabl';
import { Utils } from '../../../../common/tools/Utils';
//auto import end
export default class MgrNetFtnn extends BaseMgrNet {
  //auto Definition variable start
  private entityManager: BaseEntityManager = null;
  //auto Definition variable end
  constructor() {
    super();
    this.createEntityManager();
  }
  //auto Definition function start
  createEntityManager() {
    if (!this.entityManager) {
      this.entityManager = new BaseEntityManager();
    }
  }
  regClassName(key, object) {
    console.log("开始注册函数", key);
    this.createEntityManager();
    this.entityManager.regClassName(key, object);
  }
  doWebSocketNew(account) {
    this.entityManager.regClassName("Account", AccountEntityFtnn);
    this.entityManager.regClassName("Player", PlayerEntityFtnn);
    new SocketFtnn(gloabl.mgrData.localData.getByKey('wsUrl'), this.entityManager, account, Utils.createToken('123456', account, 150), (data) => {
      data && console.log(data);
    });
  }
  //auto Definition function end
}