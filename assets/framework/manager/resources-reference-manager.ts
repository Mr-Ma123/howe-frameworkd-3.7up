import { Asset, Component, log } from "cc";

 

/**
 * 资源引用管理器--以component为主体
 * @auto zhanglei
 * @auto Howe.Ma 升级3.x& upgrade
 */
export abstract class ResourcesReferenceManager {
    private static resourecesRefCountMap: Map<Component, Array<Asset>> = new Map();

    //已每个组件为引用对象
    public static addRefByAssets(assetsKey: Component, assetsValue: Asset) {
        let assetArray = ResourcesReferenceManager.resourecesRefCountMap.get(assetsKey)
        if (!assetArray) {
            assetArray = new Array();
            ResourcesReferenceManager.resourecesRefCountMap.set(assetsKey, assetArray);
        } else {
            for (let index = 0; index < assetArray.length; index++) {
                if (assetArray[index] == assetsValue) {
                    // web-moble打印可能会崩溃
                    //log('find', assetArray);
                    return;
                }
            }
        }
        assetsValue.addRef();
        assetArray.push(assetsValue)
        //log(ResourcesReferenceManager.resourecesRefCountMap.get(assetsKey));
        //log(ResourcesReferenceManager.resourecesRefCountMap);
    }


    /**
     * 以component为键，对asset引用计数-1
     * 同一个component只会-1一次，多次调用，不会再减少计数
     * @param component Key
     * @param asset 调用decRef()
     */
    public static decRefByComponent(assetsKey: Component, assetsValue: Asset) {
        let assetArray = ResourcesReferenceManager.resourecesRefCountMap.get(assetsKey)
        if (!assetArray) {
            //log('node 已经释放');
            return;
        }
        for (let index = 0; index < assetArray.length; index++) {
            if (assetArray[index] == assetsValue) {
                assetArray[index].decRef();
                return
            }
        }
        //log('node 未addRef 此资源', assetsValue);
    }

    /**
     * 对component绑定的所有asset引用计数-1 并将component移除map,
     * 多次调用，只会第一次有效
     * @param component Key
     */
    public static decRefAllByComponent(assetsKey: Component) {
        let assetArray = ResourcesReferenceManager.resourecesRefCountMap.get(assetsKey)
        if (!assetArray) {
            //log('资源已经释放或不存在');
            return;
        }
        for (let index = 0; index < assetArray.length; index++) {
            assetArray[index].decRef();
            log("自己的计数： " + assetArray[index]?.refCount);
        }
        ResourcesReferenceManager.resourecesRefCountMap.delete(assetsKey);
    }


}


