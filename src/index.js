import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Test from './components/test/test';
import {observable, computed} from 'mobx';

class AppState {
    @observable
    count = 0;

    @computed
    get inc5(){
        return this.count + 5;
    }
    
    increment = () => {
        this.count++;
    }

    decrement = () => {
        this.count--;
    }
}


var appState = new AppState();
var appState1 = new AppState();
ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
