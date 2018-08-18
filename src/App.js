import React, { Component } from "react";
import { Layout, Menu, Icon } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "./App.css";
import Item from "./components/item/item";
import MiniProgram from "./components/miniprogram/miniprogram";
import Order from "./components/order/order";
import Shop from "./components/shop/shop";
import Test from "./components/test/test";
import appState from './components/test/appState';
import store from './store/store';
import { observer } from "mobx-react"
const { Header, Content, Footer, Sider } = Layout;
@observer
class App extends Component {
  handleClick = art => {
    const {item, key, keyPath} = art;
    store.updateSelectKey(key);
  };
  render() {
    return (
      <Router>
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
              defaultSelectedKeys={[store.selectKey]}
              onClick={this.handleClick}
            >
              <Menu.Item key="1">
                <Icon type="user" />
                <span className="nav-text">小程序</span>
                <Link to="/miniprogram" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="video-camera" />
                <span className="nav-text">商品</span>
                <Link to="/item" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="upload" />
                <span className="nav-text">订单</span>
                <Link to="/order" />
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="user" />
                <span className="nav-text">店铺</span>
                <Link to="/shop" />
              </Menu.Item>
              <Menu.Item key="5">
                <Icon type="user" />
                <span className="nav-text">测试</span>
                <Link to="/test" />
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header
              style={{
                background: "#fff",
                padding: 0
              }}
            />
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
                <Route exact to="/miniprogram" />
                <Route path="/miniprogram" component={MiniProgram} />
                <Route path="/shop" component={Shop} />
                <Route path="/order" component={Order} />
                <Route path="/item" component={Item} />
                <Route path="/test" component={Test} />
              </div>
            </Content>
            <Footer
              style={{
                textAlign: "center"
              }}
            >
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default App;
