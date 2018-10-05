import React, {Component} from 'react';
import { observer } from "mobx-react"
import DevTools from 'mobx-react-devtools';
import store from './../../store/store'
import Simulator from './../simulator/simulator';
import {Button} from 'antd';
import styled from 'styled-components';
import Tools from './../tools/tools'
import { DragDropContext } from 'react-beautiful-dnd';
import backImage from '../../image/transprant.png';
const Content = styled.div`
float: left;
width: 100%;
`;
class MiniProgram extends Component{
    componentWillMount() {
        store.load()
        store.updateSelectKey('1');
    }
    submit = e => {
        store.putChange(store.components)
    }
    changeTemplate = () => {
        store.template();
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
        if(source.droppableId === 'tool') {
            const id = await this.fetchID();
            sourceItem = {
                id: id,
                typeId: result.draggableId,
                content: null
            };
            store.setEdit(id);
        }
        var newItems = Array.from(store.components);
        if(source.droppableId === 'simulator') {
            sourceItem = store.components[source.index];
            newItems.splice(source.index, 1);
            store.refreshData(newItems)
        }
        // 链表和数组的出对入队
        if(destination.droppableId === 'simulator') {
            newItems.splice(destination.index, 0, sourceItem);
            store.refreshData(newItems)
        }
      }

    render(){
        return (<div>
            <Content style={{

            }}>
                <DragDropContext
                    onDragEnd={this.onDragEnd}
                >
                <div style={{width: '70%', float: 'left', display: 'flex', display: '-webkit-flex', flexDirection: 'row', justifyContent:'center', backgroundImage:`url(${backImage})`}}>
                    <Simulator  components={store.components} />
                </div>
                <div style={{width: '30%', float: 'left', display: 'flex', display: '-webkit-flex', flexDirection: 'row', justifyContent:'center'}}>
                    <Tools changeTypeID={this.changeTypeID}/>
                </div>
                </DragDropContext>
            </Content>
            <Button type='primary' onClick={this.submit}>提交</Button><br/>
            <Button type='primary' onClick={this.changeTemplate}>使用基本模板</Button>
          {/* <DevTools /> */}
        </div>);
    }
}

MiniProgram = observer(MiniProgram)

export default MiniProgram