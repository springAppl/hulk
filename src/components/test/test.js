import {observer} from 'mobx-react';
import React from 'react';
import {Button} from 'antd';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const Container = styled.div`
    margin: 8px;
    
`;
const Title = styled.h3`
    padding: 8px;
`;
const Tasks = styled.div``;




@observer
export default class Test extends React.Component {

    constructor(props){
        super(props);
        var tasks = ['task1', 'task2', 'task3', 'task4'];
        this.state = {
            columns: [
                {
                    id: 'todo',
                    title: '任务',
                    tasks: tasks
                },
                {
                    id: 'finished',
                    title: '已完成',
                    tasks: []
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <DragDropContext>
                    {
                        this.state.columns.map((value, index) => {
                            return (<Container>
                                <Title></Title>
                                <Tasks></Tasks>
                            </Container>);
                        })
                    }
                </DragDropContext>
            </div>
        );
    }
}