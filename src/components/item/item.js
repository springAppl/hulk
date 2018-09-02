import React from 'react';
import { Pagination } from 'antd';

export default class Item extends React.Component{

    paging = (page, pageSize) => {
        console.log(page);
        console.log(pageSize);
    }


    render(){
        return (<div>
            商品
            <Pagination defaultCurrent={1} defaultPageSize={20} total={50} onChange={this.paging} />
        </div>);
    }
}