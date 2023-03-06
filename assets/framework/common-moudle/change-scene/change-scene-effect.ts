

import { _decorator, Component, Animation, director, game, UIOpacity, tween, AnimationState, animation, Canvas } from 'cc';
import EventManager, { Event_Name } from '../../manager/event-manager';
const { ccclass, property,requireComponent,executeInEditMode ,disallowMultiple} = _decorator;

// /** 将该脚本挂载在第一个场景中--没有在自己加个canvas~ &  Canvas 同级即可。 切换场景效果 */
@ccclass('ChangeSceneEffect')
// @executeInEditMode(true) //3.7.1 开开这两个有bug 必现
// @disallowMultiple(true)
// @requireComponent(Canvas)
export default class ChangeSceneEffect extends Component {
    @property(Animation)
    animation: Animation | null = null;
    _sceneName: string = '';
    onLoad() {
        //监听切换场景事件
        EventManager.getInstance().add(Event_Name.CHANGE_SCENE_EFFER, this.showeChangeSceneEffet, this);
        director.addPersistRootNode(this.node);
        this.node.getComponent(UIOpacity).opacity = 0;

        //测试
        // this.animation.on('finished',()=>{
        //     this.node.runAction( fadeOut(0.5)); 
        // },this)
        //this.scheduleOnce( ()=>{this.showeChangeSceneEffet('main')},2)

    }
    showeChangeSceneEffet(sceneName: string) {
        this.node.getComponent(UIOpacity).opacity = 255;
        this.animation.play();
        this._sceneName = sceneName;
        director.preloadScene(this._sceneName);
    }
    ani_loadscene() {
        director.loadScene(this._sceneName);
    }
    //监听幕布over，或者监听finished都行
    mubaOver() {
        // this.node.runAction(fadeOut(0.5));
        tween(this.node.getComponent(UIOpacity)).to(0.5, {opacity:0}).call(()=>{
            //director.loadScene(this._sceneName);
        }).start();
    }
}
