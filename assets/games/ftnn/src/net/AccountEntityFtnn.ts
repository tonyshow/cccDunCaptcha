import BaseEntity from "./BaseEntity";
export default class AccountEntityFtnn extends BaseEntity {
    constructor(socket, entityType, eid, data) {
        super(socket, entityType, eid, data);
    }
   
    loginCallback(data) {
        console.log(data);
    }

    getCfgInfo(){
        super.getCfgInfo();
        return {
            def: {
                rid: { type: "number", default: 0, flag: "client", save: true },
                account: { type: "string", default: "account", flag: "client", save: true },
                name: { type: "string", default: "name", flag: "client", save: true },
            }
        };
    }
} 