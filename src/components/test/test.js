import {observer} from 'mobx-react';
import React from 'react';
import {Button} from 'antd';
import { observable } from 'mobx';
import AppState from './appState';
// const appState = observable({
//     count : 0
// })
// appState.increment = function() {
//     this.count++;
// }
// appState.decrement = function() {
//     this.count--;
// }
const appState = new AppState();

@observer
export default class Test extends React.Component {

    handleInc = () => {
        appState.increment();
    }

    handleDec = () => {
        appState.decrement();
    }


    render() {
        console.log(appState);
        return (
            <div>
                Counter: {appState.count}<br/>
                <Button type='primary' onClick={this.handleInc}> + </Button>
                <Button type='primary' onClick={this.handleDec}> - </Button>
            </div>
        );
    }


}