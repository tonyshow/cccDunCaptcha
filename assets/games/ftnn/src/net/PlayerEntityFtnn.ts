
import BaseEntity from "./BaseEntity";
import { gloabl } from "../../../../common/mgr/Gloabl";
import PlayerDataFtnn from "../data/PlayerDataFtnn";


export default class PlayerEntityFtnn extends BaseEntity {
  roomType: number = -1;
  callback: Function = null;
  constructor(socket, entityType, eid, data) {
    super(socket, entityType, eid, data);
    (gloabl.mgrData.player as PlayerDataFtnn).setPlayerEntity(this);
  }
  getCfgInfo() {
    super.getCfgInfo();
    return {
      rid: { type: "number", default: 0, flag: "client", save: true },
      account: { type: "string", default: "account", flag: "client", save: true },
      name: { type: "string", default: "name", flag: "client", save: true },
      gameSerId: { type: "number", default: 0, flag: "server", save: true },
      queueSerId: { type: "number", default: 0, flag: "server", save: false },
      //积分
      gold: { type: "number", default: 0, flag: "client", save: true },
      //玩家当前所在房间id
      roomId: { type: "string", default: "", flag: "client", save: true },

      server: {
        joinQueue: "",
        exitQueue: "",
        joinRoom: "",
        incGold: "number amount",
        takeChip: "string roomId, number amount",
        reqDataCfg: "array roomIds",
        reqRank: "number roomType",
      },
      client: {
        loginCallback: "",
        onJoinQueue: "",
        onExitQueue: "",
        onJoinRoom: "",
        onGameStart: "",
        onGameOver: "",
        queueToClient: "",
        onAddRecord: "",
        onTakeChip: "string roomId, number amount, number res",
        rspDataCfg: "array dataCfg",
        rspRank: "array list",
      }

    };
  }
  //设房间id
  setRoomType(_roomType: number) {
    this.roomType = _roomType;
  }
  onCreate() {
    this.server.reqDataCfg([8301, 8302, 30001], true);
    this.server.reqRank(10001);
  }
  rspDataCfg(dataCfg) {
    console.info("获取客户端配置数据 dataCfg=", dataCfg);
  }
  rspRank(list) {
    console.info("获取排行数据 list=", list);
  }
  loginCallback(data) {
    console.log(this.eid, "账号已登录 ");
    if (this.data.gold <= 0) {
      this.server.incGold(1000000);
    }
    this.callback && this.callback();
    this.callback = null;
    if (data.code == 1) {
      this.socket.close();
    }
    if (data.roomType == 0) {
      this.server.joinQueue(this.roomType);
    } else {
      // console.log("断线重连", data.roomType);
      this.server.joinRoom();
    }
    // if (Math.random() * 100 > 80 && this.socket.randomClose) { this.socket.close() };
  }
  onJoinQueue(data) {
    // console.log(this.eid, "匹配 " + JSON.stringify(data));
    // if (Math.random() * 100 > 80 && this.socket.randomClose) { this.socket.close() };
  }
  onExitQueue() {
    // console.log(this.eid, "退出匹配 " + JSON.stringify(data));
  }
  onJoinRoom(data) {
    // if (Math.random() * 100 > 80 && this.socket.randomClose) { this.socket.close() };
    if (data == 0) {
      this.server.joinQueue(this.roomType);
    }
  }
  onGameStart() {
    console.log("发起带入 roomId=" + this.data.roomId + " amount=" + this.data.gold);
    this.server.takeChip(this.data.roomId, this.data.gold);
  }
  onTakeChip(roomId, amount, res) {
    console.log("带入响应 roomId=" + roomId + " amount=" + amount + " res=" + res);
  }
  onGameOver() {
    // if (Math.random() * 100 > 80 && this.socket.randomClose) { this.socket.close() };
    // this.server.joinQueue(this.roomType);
  }
  onPropUpdate(prop, oladValue, value) {
    console.log(prop, oladValue, value);
  }
  //属性更新
  updateProp(prop, oladValue, value) {
    super.updateProp(prop, oladValue, value)
    this.onPropUpdate(prop, oladValue, value);
  }
  queueToClient(str) {
    console.log(str)
  }
  onAddRecord(gameType, roomType, sn, gamesn, gameNo, matchType, take, chip, win, deduct, time, miniRoomType) {
    console.log(gameType, roomType, sn, gamesn, gameNo, matchType, take, chip, win, deduct, time, miniRoomType)
  }
  onDestroy() {

  }
}