import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link, Router} from 'react-router';
import './App.css';
const {Header, Content, Footer, Sider} = Layout;
class App extends Component {
    render() {
        return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                    onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span className="nav-text">小程序</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span className="nav-text">商品</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="upload"/>
                            <span className="nav-text">订单</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Icon type="user"/>
                            <span className="nav-text">店铺</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header
                        style={{
                        background: '#fff',
                        padding: 0
                    }}/>
                    <Content
                        style={{
                        margin: '24px 16px 0'
                    }}>
                        <div style={{
                            padding: 24,
                            background: '#fff',
                            minHeight: 850
                        }}>
                            content
                        </div>
                    </Content>
                    <Footer
                        style={{
                        textAlign: 'center'
                    }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
export default App;
