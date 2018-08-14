import React, {Component} from 'react';
import Simulator from './../simulator/simulator';
import {Button} from 'antd';
import styled from 'styled-components';
import Tools from './../tools/tools'
import Editor from '../editor/editor';
import categories from '../../resources/categories';
import { DragDropContext } from 'react-beautiful-dnd';
const Content = styled.div`
float: left;
width: 100%;
`;

export default class MiniProgram extends Component{
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            typeId: 'category',
            content: null
        };
    }
    componentWillMount() {
        fetch('/api/index')
        .then(response =>  response.json())
        .then(data => {
          this.setState({
              components: data
          });
        });
    }

    changeComponents =  data => {
        if (!data) {
            return this.state.components;
        }
        this.setState({
            components: data
        });
        return data;
    }


    changeContent = data => {
        if (!data) {
            return this.state.content;
        }
        this.setState({
            content: data
        });
        return data;
    }
    submit = e => {
        fetch('/api/index', {
            body: JSON.stringify(this.changeComponents()),
            method: 'PUT'
        })
    }

    onDragEnd = result => {
        // the only one that is required
        console.log(result);
        const {destination, source} = result;
        if (!destination) {
          return;
        }
        if(source.droppableId === destination.droppableId &&
          source.index === destination.index
        ) {
          return;
        }
        var sourceItem = null;
        if(source.droppableId === 'editor') {
            sourceItem = {
                typeId: this.state.typeId,
                content: this.state.content
            };
            this.setState({
                typeId: null,
                content: null
            });
        }
        var newItems = Array.from(this.state.components);
        if(source.droppableId === 'simulator') {
            sourceItem = this.state.components[source.index];
            newItems.splice(source.index, 1);
        }
        // 链表和数组的出对入队 
        if(destination.droppableId === 'simulator') {
               
        }      
       newItems.splice(destination.index, 0, sourceItem);
       this.setState({
         components: newItems
       });
      };

    render(){

        return (<div>
            <Content style={{flex: 1, flexDirection: 'row',}}>
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Simulator  components={this.state.components} changeComponents={this.changeComponents}/>
                    <Editor typeId={this.state.typeId} content={this.state.content} changeContent={this.changeContent}/>
                </DragDropContext>
                <Tools/>
            </Content>
            <Button type='primary' onClick={this.submit}>提交</Button>
        </div>);
    }
}
