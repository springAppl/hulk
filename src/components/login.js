import React from "react";
import styled from 'styled-components';
import {Form, Input, Button, message} from "antd";
import {post} from './tools/fetch';

import bg from '../image/login_bg.jpg'

const Container = styled.div `
  width: 100vw;
  height: 100vh;
  background: url(${bg}) no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
`;
const LoginCom = styled.section`
  width: 320px;
  margin: auto;
`
const Title = styled.p`
  font-size: 28px;
  letter-spacing: 0.5px;
  color: #fff;
  font-weight: 700;
`

const FormItem = Form.Item;
class LoginForm extends React.Component {

  submit = e => {
    e.preventDefault();
    const subData = this.props.form.getFieldsValue();
    post('/api/user/login?account=' + subData.account + "&password=" + subData.password, {
      'account': subData.account,
      'password': subData.password
    }, data => {
      localStorage.setItem('name', data.name);
      message.success('登录成功');
      window.location = '/boot';
    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (<Container>
      <LoginCom>
        <Title>Welcome To Shaofei MiniProgram App System</Title>
      <Form onSubmit={this.submit}>
        <FormItem>
          {getFieldDecorator('account')(<Input/>)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password')(<Input type="password"/>)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">登陆</Button>
        </FormItem>
      </Form>
      </LoginCom>
    </Container>);
  }
}
export default Form.create({})(LoginForm);
