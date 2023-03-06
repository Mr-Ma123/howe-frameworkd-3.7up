import { _decorator, Component, sys, native } from 'cc';
import { JSB } from 'cc/env';
const { ccclass, property } = _decorator;

import GameConfig from "./game-config";

@ccclass('AdManager')
export default class AdManager extends Component {
    private static instance: AdManager;
    static getInstance(): AdManager {
        if (!this.instance) {
            this.instance = new AdManager();
        }
        return this.instance;
    }

    showInsertAd() {
        if (JSB) {
            if (sys.os == sys.OS.ANDROID) {
                // JSB2.0 反射调用原生的隐藏方法--3.4版本的
                native.reflection.callStaticMethod(
                    GameConfig.AppActivity,
                    "Show_InsertAd",//安卓自定义
                    "()V"
                );
                //3.4+版本的 https://docs.cocos.com/creator/manual/zh/advanced-topics/js-java-bridge.html
            }
        }
    }
    showRewardAd() {
        if (JSB) {
            if (sys.os == sys.OS.ANDROID) {
                // 反射调用原生的隐藏方法
                native.reflection.callStaticMethod(
                    GameConfig.AppActivity,
                    "Show_RewardAd",//安卓自定义
                    "()V"
                );
            }
        }
    }
    //回调
}
