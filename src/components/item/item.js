import React from 'react';
import { Table, Button } from 'antd';
import {get} from '../tools/fetch';
import store from '../../store/store';
import {Link, Route} from 'react-router-dom';
import ItemPaging from './item_paging';
import ItemNew from './item_new';
import ItemDetail from './detail';
export default class Item extends React.Component{
    constructor(props){
        super(props);
        store.updateSelectKey('2');   
    }
   
    render(){
        return (<div>
                <Route exact path={`${this.props.match.path}/`} component={ItemPaging}  />
                <Route path={`${this.props.match.path}/new`} component={ItemNew} />
                <Route path={`${this.props.match.path}/detail/:id`} component={ItemDetail}  />
        </div>);
    }
}