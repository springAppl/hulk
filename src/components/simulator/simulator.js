import React, {Component} from 'react';
import hardware from '../../image/silver_hardware_medium.png';
import './simulator.css';
import Category from '../minicomponents/category/category';
import HotItems from '../minicomponents/hotitems/hotitems';
export default class Simulator extends Component{
    render(){
        var divStyle = {
            backgroundImage: 'url(' + hardware + ')',
            height: 628,
            width: 319
        };
        return (<div  style={divStyle}>
            <div style={{
                height: 73
            }}></div>
            <div style={{
                background: 'white',
                height: 483,
                width: 274,
                marginLeft: 21
            }} className="container">
                <Category/>
                <HotItems/>
            </div>
        </div>);
    }
}