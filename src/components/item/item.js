import React from 'react';
import { Table } from 'antd';
import {get} from '../tools/fetch';
const columns = [
  {
      title: '编号',
      dataIndex: 'id',
      width: '20%'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: true,
    width: '20%',
  }, {
    title: '金额',
    dataIndex: 'price',
    width: '20%',
  }, {
    title: '图片',
    dataIndex: 'image',
  }];
export default class Item extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {
                position: 'bottom'
            },
            loading: true,
        }
    }

    componentWillMount() {
        var name = '';
        var id = '';
        var argu = `?name=${name}&id=${id}`;
        get('/api/item/paging'+ argu, (data) => {
            const pagination = { ...this.state.pagination };
            // Read total count from server
            // pagination.total = data.totalCount;
            pagination.total = data.total;
            pagination
            this.setState({
                data: data.elements,
                loading: false,
                pagination
            });
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        console.log(pagination);
        console.log(filters);
        console.log(sorter);
    }


    render(){
        return (<div>
                  <Table
                    columns={columns}
                    rowKey={record => record.id}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                />
        </div>);
    }
}