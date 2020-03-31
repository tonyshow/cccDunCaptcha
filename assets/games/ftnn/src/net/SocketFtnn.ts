import WebSocketFtnn from "./WebSocketFtnn";
export class SocketFtnn extends WebSocketFtnn {
    account:string= '';
    token:string= '';
    callback :Function= null;
    randomClose:boolean = false;
    constructor(url, entityManager, account, token, callback) {
        super(url, entityManager);
        this.account = account;
        this.token = token;
        this.callback = callback;
        this.randomClose = false;
    }
    onOpen() {
        this.request([-1, [this.account, this.token]], this.callback);
    }
    onClose() {
       
    } 
}