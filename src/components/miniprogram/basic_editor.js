import React, {Component} from 'react';
import { observer } from "mobx-react"
import DevTools from 'mobx-react-devtools';
import Store from './../../store/store'
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
@observer
export default class BasicEditor extends Component{
    constructor(props){
        super(props);
        this.state = {
            store: new Store()
        }
    }

    componentWillMount() {
        if (this.props.page === 'index') {
            this.state.store.load();
        } else if(this.props.page === 'shopDetail') {
            this.state.store.loadShopDetail();
        }
        this.state.store.updateSelectKey('1');
    }
    submit = e => {
        if(this.props.page === 'index') {
            this.state.store.changeIndex(this.state.store.components)
        } else if(this.props.page === 'shopDetail') {
            this.state.store.changeShopDetail(this.state.store.components);
        }
    }
    changeTemplate = () => {
        this.state.store.template();
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
            this.state.store.setEdit(id);
        }
        var newItems = Array.from(this.state.store.components);
        if(source.droppableId === 'simulator') {
            sourceItem = this.state.store.components[source.index];
            newItems.splice(source.index, 1);
            this.state.store.refreshData(newItems)
        }
        // 链表和数组的出对入队
        if(destination.droppableId === 'simulator') {
            newItems.splice(destination.index, 0, sourceItem);
            this.state.store.refreshData(newItems)
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
                        <Simulator  components={this.state.store.components} store={this.state.store} />
                    </div>
                    <div style={{width: '30%', float: 'left', display: 'flex', display: '-webkit-flex', flexDirection: 'row', justifyContent:'center'}}>
                        <Tools changeTypeID={this.changeTypeID}/>
                    </div>
                </DragDropContext>
            </Content>
            <Button type='primary' onClick={this.submit}>提交</Button><br/>
            {
                this.props.page === 'index' ? <Button type='primary' onClick={this.changeTemplate}>使用基本模板</Button>:""
            }
        </div>);
    }
}