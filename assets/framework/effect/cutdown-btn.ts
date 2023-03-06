import { _decorator, Component, Node, UITransform } from 'cc';
const { ccclass, property } = _decorator;

import EventManager, { Event_Name } from "../../framework/manager/event-manager";
// //按钮倒计时效果

@ccclass('CutdownBtn')
export default class CutDownBtn extends Component {
    private _packingTime = 0;
    private _packingTimeMax = 3;
    @property(Node)
    imgNode: Node | null = null; //节点上进度条的图片-加个blockinput组件就好
    @property(Node)
    barValueNode: Node | null = null; //要遮挡的节点

    _maskNode: Node = null; //mask

    start() {
       //没有自己加一个
        this._maskNode = this.imgNode.getChildByName('mask-node');
        this._maskNode.active = false;

       //自己定义的触发事件-根据自己的项目调用this.startPacking方法就行
        EventManager.getInstance().add(Event_Name.CUTDOWN_BTN_EFFER, this.startPacking, this);

        //测试
        this.scheduleOnce(()=>{
            this.imgNode.active =true;
            this.startPacking();
        },2);
    }
    protected onDestroy(): void {
       //EventManager.getInstance().remove(Event_Name.CUTDOWN_BTN_EFFER, this.startPacking, this);
    }
    updatePacking(dt) {
       //log('updatePacking', dt);
        if (this._packingTime < this._packingTimeMax) {
        this._packingTime = dt + this._packingTime;
        const width = this.barValueNode.getComponent(UITransform).width;
        this.imgNode.getComponent(UITransform).width = width * (this._packingTime / this._packingTimeMax);
        } else {
        this.endPacking();
        }
    }
    endPacking() {
        this.unschedule(this.updatePacking);
       //Dosomething
        this._maskNode.active = false;
        this.imgNode.getComponent(UITransform).width = 0;
        this._packingTime = 0;
    }
    startPacking() {
        this._maskNode.active = true;
        this.schedule(this.updatePacking);
    }
}
