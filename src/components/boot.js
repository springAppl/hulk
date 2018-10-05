import React from 'react';
import Item from "./item/item";
import MiniProgram from "./miniprogram/mini_index";
import Order from "./order/order";
import Shop from "./shop/shop";
import store from '../store/store';
import {
    Route,
    Link
} from "react-router-dom";
import { Layout, Menu, Icon, Avatar, Button, message } from "antd";
import './boot.css';
import { observer } from "mobx-react";
import { get, post } from './tools/fetch';
import ShopDetail from './miniprogram/mini_shop_detail';



const { Header, Content, Footer, Sider } = Layout;
const MenuItemGroup = Menu.ItemGroup;
const SubMenu = Menu.SubMenu;



@observer
export default class Boot extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInfo: null
        }
    }


    componentWillMount() {
        get('/api/user', data => {this.setState({
            userInfo: data 
        });
    });
    }


    logout = () => {
        post('/api/logout');
    }
    

    render() {
        return (
            <Layout >
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                    }}
                    onCollapse={(collapsed, type) => {
                    }}
                >
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[store.selectKey]}
                >
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>小程序</span></span>}>
                        <Menu.Item key="1">
                            <Icon type="user" />
                            <span className="nav-text">首页</span>
                            <Link to={`${this.props.match.path}/miniprogram`} />
                        </Menu.Item>

                        <Menu.Item key="11">
                            <Icon type="user" />
                            <span className="nav-text">店铺详情页</span>
                            <Link to={`${this.props.match.path}/shopDetail`} />
                        </Menu.Item>
                    </SubMenu>
                    
                    <Menu.Item key="2">
                        <Icon type="video-camera" />
                        <span className="nav-text">商品</span>
                        <Link to={`${this.props.match.path}/item`} />
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Icon type="upload" />
                        <span className="nav-text">订单</span>
                        <Link to={`${this.props.match.path}/order`} />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Icon type="user" />
                        <span className="nav-text">店铺</span>
                        <Link to={`${this.props.match.path}/shop`} />
                    </Menu.Item>
                </Menu>
                </Sider>
                <Layout>
                <Header
                    style={{
                    background: "#fff",
                    padding: 0
                    }}
                >
                    <div style={{float: 'right', marginRight: 30}}>
                        <Button type="primary" onClick={this.logout}>登出</Button>
                        <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>{this.state.userInfo != null ? this.state.userInfo.name : '?'}</Avatar>
                    </div>
                </Header>
                <Content
                    style={{
                    margin: "24px 16px 0"
                    }}
                >
                    <div
                    style={{
                        padding: 24,
                        background: "#fff",
                        minHeight: 850
                    }}
                    >
                        <Route exact path={`${this.props.match.path}`} component={MiniProgram} />
                        <Route path={`${this.props.match.path}/miniprogram`}  component={MiniProgram} />
                        <Route path={`${this.props.match.path}/shopDetail`}  component={ShopDetail} />
                        <Route path={`${this.props.match.path}/shop`}  component={Shop} />
                        <Route path={`${this.props.match.path}/order`} component={Order} />
                        <Route path={`${this.props.match.path}/item`} component={Item} />
                    </div>
                </Content>
                <Footer
                    style={{
                    textAlign: "center"
                    }}
                >
                    kuboot ©2018 Created by Ant UED
                </Footer>
                </Layout>
            </Layout>
        )
    }
}