export default class BaseEntityManager {

    classList: any = {};
    entityList: any = {};

    constructor() {
        this.classList = {};
        this.entityList = {};
    }
    //注册实体
    regClassName(className, classObj) {
        console.log("注册");
        this.classList[className] = classObj;
    }
    //创建实体
    createEntity(socket, className, eid, data) {
        if (this.classList[className]) {
            this.entityList[eid] = new this.classList[className](socket, className, eid, data);
        } else {
            console.error("未找到该类型的实体", "className", className);
        }
    }
    //调用实体函数
    callEntity(eid, callName, data) {
        if (!this.entityList[eid]) {
            console.log("调用失败", "未找到该实体 eid:", eid, eid, "callName:", callName, "data", data);
            return
        }
        if (!this.entityList[eid][callName]) {
            console.log("调用失败", "实体函数未定义 eid:", eid, "callName:", callName, "data", data);
            return
        }
        this.entityList[eid][callName].apply(this.entityList[eid], data);
    }
    //销毁实体
    destroyEntity(eid) {
        if (!this.entityList[eid]) {
            console.log("实体销毁失败", "未找到该实体 eid:", eid);
            return
        }
        this.entityList[eid].destroy();
        delete this.entityList[eid];
    }
    //清空实体列表
    cleanEntitys() {
        for (var eid in this.entityList) {
            this.destroyEntity(eid);
        }
    }
}