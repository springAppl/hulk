import React, {Component} from 'react';
import Simulator from './../simulator/simulator';
import {Button} from 'antd';
import styled from 'styled-components';
<<<<<<< HEAD

import Tools from './../tools/tools'

=======
import Editor from '../editor/editor';
import categories from '../../resources/categories';
>>>>>>> master
const Content = styled.div`
float: left;
width: 100%;
`;

export default class MiniProgram extends Component{
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            editorContent: null
        };
    }


    componentWillMount() {
        fetch('/api/index')
        .then(response =>  response.json())
        .then(data => {
          this.changeComponents(data);
        });
        this.setState({
            editorContent: categories
        });
    }

    changeComponents = components => {
        if (!components) {
            return this.state.components;
        }
        this.setState({
            ...this.state,
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
            <Content style={{flex: 1, flexDirection: 'row',}}>
                <Simulator components={this.changeComponents}/>
                <Editor content={this.state.editorContent}/>
                <Tools/>
            </Content>
            <Button type='primary' onClick={this.submit}>提交</Button>
        </div>);
    }
}
