export default class BaseEntity {
    entityType:any= null;
    eid:any= null;
    data:any= null;
    socket:any= null;
    _valid:boolean= false;
    server:any= null; 
    
    constructor(socket, entityType, eid, data) {
        this.entityType = entityType;
        this.eid = eid;
        this.data = data;
        this.socket = socket;
        this.create();
    }
    create() {
        this._valid = true; 
        var server =  this.getCfgInfo()['server'];
        this.server = this.createProxy(this.entityType, this.eid, server, this.proxyCB.bind(this))
        this.onCreate();
    }
    getCfgInfo(){
        return {};
    }
    createProxy(entityType, eid, origin, proxyCB) {
        var res = {};
        for (var field in origin) {
            res[field] = this.genFunctionProxy(entityType, eid, field, proxyCB);
        }
        return res;
    }
    genFunctionProxy(entityType, eid, methodName, proxyCB) {
        return (function () {
            var proxy = function () {
                var len = arguments.length;
                var args = new Array(len);
                for (var i = 0; i < len; i++) {
                    args[i] = arguments[i];
                }
                proxyCB(entityType, eid, methodName, args);
            };
            return proxy;
        })();
    }
    proxyCB(entityType, eid, methodName, args) {
        this.socket.request([this.data._ser, [entityType, eid, methodName, args]]);
    }
     //属性更新
    updateProp(prop, oladValue, value) {
        this.data[prop] = value;
  
    }
    destroy() {
        this._valid = false;
        this.onDestroy();
    }
    onCreate() { }
    onDestroy() { }
}