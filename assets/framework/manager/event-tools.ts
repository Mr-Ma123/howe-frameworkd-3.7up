// /** 事件使用封装的例子 */

import { game, _decorator } from 'cc';
import EventManager, { Event_Name, MyEventHandler } from "./event-manager";

export class EventTool {
    private _eventListeners: { event: Event_Name, handler: MyEventHandler }[];
    private constructor() { }
    protected addEventListener(event: Event_Name, handler: MyEventHandler) {
        EventManager.getInstance().add(event, handler, this);
        if (!this._eventListeners) {
        this._eventListeners = [];
        }
        this._eventListeners.push({ event, handler });
    }
    protected removeEventListener(event: Event_Name, handler: MyEventHandler) {
        EventManager.getInstance().remove(event, handler, this);
    }
    protected fireEvent(event: Event_Name, ...params) {
        EventManager.getInstance().fireEvent(event, ...params);
    }
    protected clearEventListeners() {
        const eventListeners = this._eventListeners;
        if (eventListeners && eventListeners.length) {
        const evnetMgr = EventManager.getInstance();
        eventListeners.forEach(listener => {
        evnetMgr.remove(listener.event, listener.handler, this);
        })
        }
        this._eventListeners = null;
        game.targetOff(this);//为什么用这个呢，删除该脚本的注册的监听事件
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import EventManager, { Event_Name, MyEventHandler } from "./event-manager";
// 
// /** 事件使用封装的例子 */
// export class EventTool {
//     private _eventListeners: { event: Event_Name, handler: MyEventHandler }[];
//     private constructor() { }
// 
//     protected addEventListener(event: Event_Name, handler: MyEventHandler) {
//         EventManager.getInstance().add(event, handler, this);
//         if (!this._eventListeners) {
//             this._eventListeners = [];
//         }
//         this._eventListeners.push({ event, handler });
//     }
// 
//     protected removeEventListener(event: Event_Name, handler: MyEventHandler) {
//         EventManager.getInstance().remove(event, handler, this);
//     }
// 
//     protected fireEvent(event: Event_Name, ...params) {
//         EventManager.getInstance().fireEvent(event, ...params);
//     }
// 
//     protected clearEventListeners() {
//         const eventListeners = this._eventListeners;
//         if (eventListeners && eventListeners.length) {
//             const evnetMgr = EventManager.getInstance();
//             eventListeners.forEach(listener => {
//                 evnetMgr.remove(listener.event, listener.handler, this);
//             })
//         }
//         this._eventListeners = null;
//         game.targetOff(this);//为什么用这个呢，删除该脚本的注册的监听事件
//     }
// 
// }
