import { _decorator, Component, Node } from 'cc';
import EventManager, { Event_Name } from '../framework/manager/event-manager';
const { ccclass, property } = _decorator;

@ccclass('helloworld')
export class helloworld extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onFireEventChangeScene(){
        EventManager.getInstance().fireEvent(Event_Name.CHANGE_SCENE_EFFER, 'test1', this);

    }
}


