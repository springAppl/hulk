import React, {Component} from 'react';
import store from '../../store/store';
export default class Order extends Component{
    constructor(props){
        super(props);
        store.updateSelectKey('3');
    }


    render(){
        return (<div>
            订单
        </div>);
    }
}