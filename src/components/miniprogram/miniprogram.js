import React, {Component} from 'react';
import Simulator from './../simulator/simulator';
import Drag from '../drag/drag';
export default class MiniProgram extends Component{
    render(){
        return (<div>
            <Simulator/>
            <Drag/>
        </div>);
    }
}