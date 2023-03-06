import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

import { ResourcesReferenceManager } from "../manager/resources-reference-manager";
// /**
//  * 脚本生命周期父类
//  */

@ccclass('LifeCycle')
export default class BaseLifeCycle extends Component {
    protected onLoad(): void {

    }
  
    protected onEnable(): void {

    }
    protected start(): void {

    }
    protected lateUpdate(dt: number): void {

    }
    protected onDisable(): void {

    }
    protected onDestroy(): void {
        ResourcesReferenceManager.decRefAllByComponent(this);
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// import { ResourcesReferenceManager } from "../manager/resources-reference-manager";
// 
// const { ccclass, property } = cc._decorator;
// 
// /**
//  * 脚本生命周期父类
//  */
// @ccclass
// export default class BaseLifeCycle extends cc.Component {
// 
//     protected onLoad(): void {
//         
//     }
//   
//     protected onEnable(): void {
//        
//     }
// 
//     protected start(): void {
//        
//     }
// 
//     protected lateUpdate(dt: number): void {
//         
//     }
// 
//     protected onDisable(): void {
//         
//     }
// 
//     protected onDestroy(): void {
//         ResourcesReferenceManager.decRefAllByComponent(this);
//     }
// 
// }
