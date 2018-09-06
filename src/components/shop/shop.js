import React, {Component} from 'react';
import store from '../../store/store';
export default class Shop extends Component{
    constructor(props){
        super(props);
        store.updateSelectKey('4');
    }

    render(){
        return (<div>
            店铺
        </div>);
    }
}