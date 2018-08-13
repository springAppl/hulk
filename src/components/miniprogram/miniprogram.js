import React, {Component} from 'react';
import Simulator from './../simulator/simulator';
import {Button} from 'antd';
import styled from 'styled-components';
const Content = styled.div`
float: left;
width: 100%;
`;

export default class MiniProgram extends Component{
    constructor(props) {
        super(props);
        this.state = {
            components: []
        };
    }
    

    componentWillMount() {
        fetch('/api/index')
        .then(response => response.json())
        .then(data => {
          this.changeComponents(data);
        });
    }

    changeComponents = components => {
        if (!components) {
            return this.state.components;
        }
        this.setState({
            components: components
        });
        return components;
    }
    submit = e => {
        fetch('/api/index', {
            body: JSON.stringify(this.changeComponents()),
            method: 'PUT'
        })
    }

    render(){
        
        return (<div>
            <Content>
                <Simulator components={this.changeComponents}/>
            </Content>
            <Button type='primary' onClick={this.submit}>提交</Button>
        </div>);
    }
}