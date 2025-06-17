

import { _decorator, Component, Animation, director, game, UIOpacity, tween, AnimationState, animation, Canvas, __private } from 'cc';
import EventManager, { Event_Name } from '../../manager/event-manager';
const { ccclass, property,requireComponent,executeInEditMode ,disallowMultiple} = _decorator;

// /** 将该脚本挂载在第一个场景中--没有在自己加个canvas~ &  Canvas 同级即可。 切换场景效果; 可把动画分为遮挡 和 打开两个 方便管理 */
@ccclass('ChangeSceneEffect')
// @executeInEditMode(true) //3.7.1 开开这两个有bug 必现
// @disallowMultiple(true)
// @requireComponent(Canvas)

export default class ChangeSceneEffect extends Component {
    @property(Animation)
    animation: Animation | null = null;
    _sceneName: string = '';
    onLoad() {
        director.addPersistRootNode(this.node);
        //监听切换场景事件
        EventManager.getInstance().add(Event_Name.CHANGE_SCENE_EFFER, this.showeChangeSceneEffet, this);
        this.node.getComponent(UIOpacity).opacity = 0;
        console.log('随你吧')
        //测试
        // if(this.animation){
        //     let strEvent: any = 'finished';
        //     this.animation.on(strEvent, ()=>{
        //         console.log('动画结束了');
               
        //     }, this);
        // }
        // this.animation.on(__private._cocos_animation_animation_state__AnimationStateEventType.FINISHED,()=>{
        //     console.log('动画结束了');
        //     // tween(this.node.getComponent(UIOpacity)).to(0.5, {opacity:0}).call(()=>{
        //     //     this.showeChangeSceneEffet('test1')
        //     // })
        // },this)
        // this.scheduleOnce( ()=>{this.showeChangeSceneEffet('test1')},2)

    }

    /**
     * 切换场景效果
     * @param sceneName 场景名称
     */
    showeChangeSceneEffet(sceneName: string) {
        this.node.getComponent(UIOpacity).opacity = 255;
        this.animation.play();
        this._sceneName = sceneName;
        director.preloadScene(this._sceneName);
    }
    ani_loadscene() {
        console.log('动画到一半了结束了');
        this.animation.pause();
        director.loadScene(this._sceneName, () => {
        }, (iSOK?) => {
            console.log
                ('切换场景失败了？', iSOK);
        });
        // return;
        // director.loadScene(this._sceneName);
    }
    //监听幕布over，或者监听finished都行
    mubaOver() {
        console.log('动画彻底结束了');
        this.animation.resume();

        // director.loadScene(this._sceneName);
        // tween(this.node.getComponent(UIOpacity)).to(0.5, {opacity:250}).call(()=>{
        //     this.node.getComponent(UIOpacity).opacity = 0;

        // }).start();
    }
}
