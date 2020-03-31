import BaseFristScene from "../../../../common/node/scene/BaseFristScene";
import { gloablHelper, doNewGlobleHelper } from "../GloablHelper";

const { ccclass } = cc._decorator;

@ccclass
export default class FristSceneHelper extends BaseFristScene {

  public onLoad(){
    doNewGlobleHelper();
    super.onLoad(); 
  }
  //加载框架必须要的资源
  public loadAsset(cb?: Function) {
    super.loadAsset((info) => {
      gloablHelper.mgrAsset.addAsset(info.name, info);
    })
    return new Promise((resolve, reject) => {
      cc.loader.loadResDir("common/res", function (err, assets) {
        if (!!err) {
          return reject(err);
        }
        let length = assets.length;
        for (let i = 0; i < length; ++i) {
          let info = assets[i];
          if ('' != info.name) {
            if (!!cb) {
              cb(info.name, info)
            } else {
              gloablHelper.mgrAsset.addAsset(info.name, info);
            }
          }
        }
        return resolve(assets);
      });
    })
  }
}
