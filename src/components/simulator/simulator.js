import React from "react";
import hardware from "../../image/silver_hardware_medium.png";
import "./simulator.css";
import Category from "../minicomponents/category/category";
import HotItems from "../minicomponents/hotitems/hotitems";
import Drag from '../drag/drag';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const Components = styled.div`
width: 100%;
`;
const Item = styled.div`

`;
const items = [
  {
    index: 0,
    typeId: 'category'
  },
  {
    index: 1,
    typeId: 'hotitems'
  },
  {
    index: 2,
    typeId: 'category'
  }
]
export default class Simulator extends React.Component {
  onDragEnd = () => {
    // the only one that is required
  };
  render() {
    var divStyle = {
      backgroundImage: "url(" + hardware + ")",
      height: 628,
      width: 319,
      float: 'left'
    };
    return (
      <div style={divStyle}>
        <div
          style={{
            height: 73
          }}
        />
        <div
          style={{
            background: "white",
            height: 483,
            width: 274,
            marginLeft: 21
          }}
          className="container"
        >
          <DragDropContext
                  onDragEnd={this.onDragEnd}
          >
            <Droppable droppableId="miniprogram" direction="vertical">
              {(provided) => (
                <Components 
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: provided.isDragging ? 'green' : 'lightblue',
                  }}
                >
                  {items.map((value, index) => (
                    <Draggable draggableId={index} index={index} key={index}>
                      {
                        (provided) => {
                          //console.log(value);
                          var com = null;
                          if (value.typeId == 'category') {
                            com = <Category/>
                          } else if(value.typeId == 'hotitems'){
                            com = <HotItems/>
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
                  ))}
                  {provided.placeholder}
                </Components>
              )}
            </Droppable>
          </DragDropContext>
          <Drag/>
        </div>
      </div>
    );
  }
}
