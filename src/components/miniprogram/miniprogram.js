import React, {Component} from 'react';
import { observer } from "mobx-react"
import DevTools from 'mobx-react-devtools';
import store from './../../store/store'
import Simulator from './../simulator/simulator';
import {Button, Input} from 'antd';
import styled from 'styled-components';
import Tools from './../tools/tools'
import Editor from '../editor/editor';
import { DragDropContext } from 'react-beautiful-dnd';
const Content = styled.div`
float: left;
width: 100%;
`;

class MiniProgram extends Component{
    constructor(props) {
        super(props);
        this.state = {
            components: [],
            typeId: 'category',
            content: null
        };
    }
    componentWillMount() {
        store.load()
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
        store.putChange(store.components)
    }
    fetchID() {
            return fetch('/api/index/id', {
                method: 'POST'
            }).then(response => {
                return response.json();
            }).then(data => data);
    }

    onDragEnd = async result => {
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
            const id = await this.fetchID();
            sourceItem = {
                id: id,
                typeId: this.state.typeId,
                content: this.state.content
            };
            this.setState({
                typeId: null,
                content: null
            });
        }
        var newItems = Array.from(store.components);
        if(source.droppableId === 'simulator') {
            sourceItem = store.components[source.index];
            newItems.splice(source.index, 1);
        }
        // 链表和数组的出对入队
        if(destination.droppableId === 'simulator') {

        }
       newItems.splice(destination.index, 0, sourceItem);
       store.refreshData(newItems)
      }

    render(){

        return (<div>
            <Content style={{flex: 1, flexDirection: 'row',}}>
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                    <Simulator  components={store.components}/>
                    <Editor typeId={this.state.typeId} content={this.state.content} changeContent={this.changeContent}/>
                </DragDropContext>
                <Tools/>
            </Content>
            <Button type='primary' onClick={this.submit}>提交</Button>
          <DevTools />
        </div>);
    }
}

MiniProgram = observer(MiniProgram)

export default MiniProgram
