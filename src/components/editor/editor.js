import React from 'react';
import styled from 'styled-components';
import Category from '../minicomponents/category/category';
import HotItems from '../minicomponents/hotitems/hotitems';
import {Droppable, Draggable } from 'react-beautiful-dnd';
const Components = styled.div`
width: 100%;
`;
const Item = styled.div``;
const Box = styled.div`
    width: 400px;
    height: 400px;
    border: 1px solid red;
    float: left;
    display: -webkit-flex; /* Safari */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;
export default class Editor extends React.Component {
    render() {
        return (
        <Box>
            <Droppable droppableId="editor" direction="vertical" style={{minHeight: 300, width: 400, backgroundColor: 'red', float: 'left', overflow: 'auto'}}>
                {(provided) => (
                    <Components
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            backgroundColor: provided.isDragging ? 'green' : 'lightblue',
                        }}
                    >
                        <Draggable draggableId={'editor'+this.props.typeId} index={0} key={this.props.typeId}>
                            {
                            (provided) => {
                                var com = null;
                                if (this.props.typeId === 'category') {
                                com = <Category categories={this.props.content != null ? this.props.content.categories : null} isEdit={true} {...this.props}/>
                                } else if(this.props.typeId === 'hotitems'){
                                com = <HotItems items={this.props.content != null ? this.props.content.items : null} {...this.props} isEdit={true} {...this.props}/>
                                }
                            return  (
                                <Item
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                                {com}
                                </Item>
                            )}
                            }
                        </Draggable>
                        <Draggable draggableId={'editor'} index={1} isDragDisabled={false}>
                    {
                            (provided) => {
                            var height = this.props.typeId == null ? 398 : 0;
                            return  (
                                <Item
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                >
                            <div style={{height: 0, width: 400, backgroundColor: 'green', marginBottom: height}}></div>
                                </Item>
                            )}
                            }
                    </Draggable>
                        {provided.placeholder}
                    </Components>
                )}
            </Droppable>
        </Box>
    );
    }
}