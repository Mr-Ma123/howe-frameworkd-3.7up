import { _decorator, Vec2, v2 } from 'cc';
export default class Bezier {
   // 三次贝塞尔曲线
    createSmoothLineControlPoint(p1: Vec2, pt: Vec2, p2: Vec2, ratio: number = 0) {
        let vec1T: Vec2 = this.vector2dMinus(p1, pt);
        let vec2T: Vec2 = this.vector2dMinus(p2, pt);
        const len1 = Math.hypot(vec1T.x, vec1T.y);
        const len2 = Math.hypot(vec2T.x, vec2T.y);
        const v: number = len1 / len2;
        let delta = new Vec2();
       //log(v, "===");
        if (v > 1) {
        delta = this.vector2dMinus(
        p1,
        this.vector2dPlus(pt, this.vector2dMinus(p2, pt).multiply(v2(1 / v, 1 / v))));
        } else {
        delta = this.vector2dMinus(
        this.vector2dPlus(pt, this.vector2dMinus(p1, pt).multiply(v2(v, v))),
        p2)
        }
        // delta = delta.scale(v2(ratio, ratio));//2.x的
        delta = delta.multiply(v2(ratio, ratio)); // 3.7+ 未测试
        const control1 = this.vector2dPlus(pt, delta);
        const control2 = this.vector2dMinus(pt, delta);

        return { control1, control2 }
    }
    private vector2dMinus(vec1: Vec2, vec2: Vec2) {
        return v2(vec1.x + vec2.x, vec1.y + vec2.y);
    }
    private vector2dPlus(vec1: Vec2, vec2: Vec2) {
        return v2(vec1.x - vec2.x, vec1.y - vec2.y);
    }
}


/**
 * 注意：已把原脚本注释，由于脚本变动过大，转换的时候可能有遗落，需要自行手动转换
 */
// export default class Bezier {
// 
//     // 三次贝塞尔曲线
//     createSmoothLineControlPoint(p1: Vec2, pt: Vec2, p2: Vec2, ratio: number = 0) {
//         let vec1T: Vec2 = this.vector2dMinus(p1, pt);
//         let vec2T: Vec2 = this.vector2dMinus(p2, pt);
//         const len1 = Math.hypot(vec1T.x, vec1T.y);
//         const len2 = Math.hypot(vec2T.x, vec2T.y);
//         const v: number = len1 / len2;
//         let delta = new Vec2();
//         //log(v, "===");
//         if (v > 1) {
//             delta = this.vector2dMinus(
//                 p1,
//                 this.vector2dPlus(pt, this.vector2dMinus(p2, pt).scale(v2(1 / v, 1 / v))));
//         } else {
//             delta = this.vector2dMinus(
//                 this.vector2dPlus(pt, this.vector2dMinus(p1, pt).scale(v2(v, v))),
//                 p2)
//         }
//         delta = delta.scale(v2(ratio, ratio));
//         const control1 = this.vector2dPlus(pt, delta);
//         const control2 = this.vector2dMinus(pt, delta);
// 
//         return { control1, control2 }
//     }
// 
//     private vector2dMinus(vec1: Vec2, vec2: Vec2) {
//         return v2(vec1.x + vec2.x, vec1.y + vec2.y);
//     }
//     private vector2dPlus(vec1: Vec2, vec2: Vec2) {
//         return v2(vec1.x - vec2.x, vec1.y - vec2.y);
//     }
// 
// }
