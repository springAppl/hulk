import React, {Component} from 'react';
import store from './../../store/store'
export default class ShopDetail extends Component{

    componentWillMount() {
        store.load()
        store.updateSelectKey('11');
    }


    render() {
        return (<div>
            店铺详情


        </div>);
    }


}