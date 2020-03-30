const { ccclass, property } = cc._decorator;

@ccclass
export default class fristScene extends cc.Component {
  private AppClassName: string = "org/cocos2dx/javascript/AppActivity";
  eve() {
    // jsb.reflection.callStaticMethod(this.AppClassName, "openCaptcha", "()V");
    let obj = {
      funName: "openCaptcha"
    }
    console.error(`ts , fristScene:${ JSON.stringify(obj)}`);
    jsb.reflection.callStaticMethod(this.AppClassName, "jsToJavaFunc", "(Ljava/lang/String;)V", JSON.stringify(obj));
  }
}
