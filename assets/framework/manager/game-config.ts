// /** 游戏配置-按需设置 */

import { director, sp, sys, _decorator} from 'cc';
import { JSB } from 'cc/env';
export default class GameConfig {
    public static Game_Version = '1.0.0';
    public static FrameWork_Version = '1.0.0';
    static globalGameTimeScale: number;
    //2.x的
    //    //开启碰撞系统
    //    director.getCollisionManager().enabled = true;
    //    //显示碰撞器包围盒
    //    director.getCollisionManager().enabledDebugDraw = true;//包围盒
    //    director.getCollisionManager().enabledDrawBoundingBox = true;
   //s时间速率 快进/慢放
   //director.getScheduler().setTimeScale(1);
    
   //动画？ 未测试  --需要再改吧 https://forum.cocos.org/t/topic/146184
   //3.x的有点ex
    //    public static SetTimeSpeed(){
    //        let oldTick = director.tick.bind(director);
    //        let self = this;
    //        director.tick = function (dt) {
    //            dt *= self.globalGameTimeScale;
    //            oldTick(dt);
        
    //            if (sys.os == sys.OS.ANDROID) {
    //                // 针对android，spine速度与dt无关，需要设置SkeletonAnimation的GlobalTimeScale
    //                sp.spine.SkeletonAnimation.setGlobalTimeScale(self.globalGameTimeScale);
    //            }
    //        };
    //    }

   //设置默认帧率
   //game.setFrameRate(30);
   //原生交互路径-安卓
   /** 默认路径 */
    public static AppActivity = 'org/cocos2dx/javascript/AppActivity'
   /** GP相关路径 */
    public static GoogleSign =  'org/cocos2dx/javascript/GoogleSign';
   /** FB相关路径 */
    public static FaceBookSign = 'org/cocos2dx/javascript/FaceBookSign';
   /* GP登出本地记录的字段*/
    public static isGpLoginOver = 'isGpLoginOver';
}

