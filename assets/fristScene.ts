// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class fristScene extends cc.Component {
  private AppClassName: string = "org/cocos2dx/javascript/AppActivity";
  eve() {
    jsb.reflection.callStaticMethod(this.AppClassName, "openCaptcha", "()V");
  }
  // update (dt) {}
}
