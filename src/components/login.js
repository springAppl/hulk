import React from "react";
import styled from 'styled-components';
import { Form, Input, Button, message } from "antd";
import { post } from './tools/fetch';
const Container = styled.div`
width: 100%;
height: 100%;
margin: 0px;
`;
const FormItem = Form.Item;
class LoginForm extends React.Component {
    
    submit = e  => {
        e.preventDefault();
        const subData = this.props.form.getFieldsValue();
        post('/api/login?account=' + subData.account + "&password=" + subData.password, {
            'account': subData.account,
            'password': subData.password
        }, data => {
            localStorage.setItem('name', data.name);
            message.success('登录成功');
            window.location = '/boot';
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (<Container>
            <Form onSubmit={this.submit}>
                <FormItem>
                    {getFieldDecorator('account')(<Input />)}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password')(<Input type="password" />)}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">登陆</Button>
                </FormItem>
            </Form>
        </Container>);
    }
}
export default  Form.create({})(LoginForm);