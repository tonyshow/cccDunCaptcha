import BaseEntityManager from "./BaseEntityManager";
import BaseWebSocket from "../../../../common/net/BaseWebSocket"; 
export default class  WebSocketFtnn extends BaseWebSocket{ 
    mid:number = 0;
    msgCalls:any = {}; 
    entityManager:BaseEntityManager=null; 
    heartbeat :boolean= false; 
    pingTimeout:any = null;
    constructor(url, entityManager:BaseEntityManager) {
        super(url);
        this.entityManager = entityManager;
    }
    initParam() {
        super.initParam();
        this.mid = 0;
        this.msgCalls = {};  
        this.heartbeat = false;
    }
    protected onopen(event) {
        super.onopen(event);
        this.heartbeat = true;
        this.pingTimeout = setInterval(() => {
        if (this.heartbeat) {
            this.heartbeat = false;
            if (this.ws.readyState == 1) {
                if( !!this.ws.ping ){
                    this.ws.ping();
                }else{

                } 
            }
        } else {
            this.ws.close();
        }
        }, 30000);
        console.log("连接成功 url:" + this.url);
        this.onOpen();
    }
    protected onmessage(message) {
        super.onmessage(message);
        message = JSON.parse(message);
        if (this.entityManager) {
            var data = message[1];
            switch (message[0]) {
                case -1://请求响应
                    if (message.length == 3) {
                        this.msgCalls[message[2]](message[1]);
                        delete this.msgCalls[message[1]];
                    }
                    break;
                case 0://创建实体[entityType,eid,data]
                    this.entityManager.createEntity(this, data[0], data[1], data[2]);
                    break;
                case 1://调用实体函数[eid,methodName,args]
                    this.entityManager.callEntity(data[0], data[1], data[2]);
                    break;
                case 2://销毁实体[eid]
                    this.entityManager.destroyEntity(data[0]);
                    break;
            }
        } else {
            console.log("entityManager 未创建");
        }
    } 
    protected onerror(event) {
        super.onerror(event);
        this.initParam();
        clearInterval(this.pingTimeout);
    }
    //发送请求
    public request(data, callback) {
        if (!this.connected) { console.log("连接已断开"); return; } 
        if (callback) {
            data.push(this.mid); 
            this.msgCalls[this.mid] = callback;
            this.mid++;
        }   
        this.ws.send(JSON.stringify(data));
    } 
    public close() {
        if (!this.connected) { return; }
        this.connected = false;
        this.ws.close();
    } 
    public onOpen() {
        console.log(" onOpen 获取到服务器数据"); 
    };
    public onClose() { };
}