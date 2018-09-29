import React from "react";
import styled from 'styled-components';
const Container = styled.div`
width: 100%;
height: 100%;
margin: 0px;
background-color: red
`;
export default class Login extends React.Component {
    render() {
        return (<Container>
            登陆页面，正在吐血开发中
        </Container>);
    }
}