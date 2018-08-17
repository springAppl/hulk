import {observable, computed} from 'mobx';

class AppState {
    @observable
    count = 0;
    
    increment = () => {
        this.count++;
    }

    decrement = () => {
        this.count--;
    }
}
export default AppState;