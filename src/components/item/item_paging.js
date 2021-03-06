import React from 'react';
import { Table, Button } from 'antd';
import {get} from '../tools/fetch';
import store from '../../store/store';
import {Link} from 'react-router-dom';
const columns = [
  {
      title: '编号',
      dataIndex: 'id',
      width: '20%'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    width: '20%',
  }, {
    title: '金额',
    dataIndex: 'price',
    width: '20%',
  }, {
    title: '操作',
    render: (text, record, index) => {
        return (<Link to={`/item/detail/${record.id}`}>详情</Link>);
    },
  }];
export default class ItemPaging extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            pagination: {
                position: 'bottom',
                pageSize: 10,
                current: 1
            },
            loading: true,
        };
    }

    componentWillMount() {
        this.getItems(this.state.pagination);
    }

    handleTableChange = (pagination, filters, sorter) => {
        this.getItems(pagination);
    }

    getItems = (pagination) => {
        var name = '';
        var id = '';
        var argu = `?name=${name}&id=${id}&pageSize=${pagination.pageSize}&pageNumber=${pagination.current}`;
        get('/api/item/paging'+ argu, (data) => {
            pagination.total = data.total;
            this.setState({
                data: data.elements,
                loading: false,
                pagination
            });
        });
    }


    render(){
        return (<div>
                <Button  type="primary"><Link to="/item/new">新建</Link></Button>
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