import React from "react";
import hardware from "../../image/silver_hardware_medium.png";
import "./simulator.css";
import Category from "../minicomponents/category/category";
import HotItems from "../minicomponents/hotitems/hotitems";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const Components = styled.div`
width: 100%;
`;
const Item = styled.div``;
export default class Simulator extends React.Component {

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

            <Droppable droppableId="simulator" direction="vertical">
              {(provided) => (
                <Components
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: provided.isDragging ? 'green' : 'lightblue',
                  }}
                >
                  {this.props.components.map((value, index) => (
                    <Draggable draggableId={index} index={index} key={index}>
                      {
                        (provided) => {
                          var com = null;
                          if (value.typeId === 'category') {
                            com = <Category categories={value.content.categories}/>
                          } else if(value.typeId === 'hotitems'){
                            com = <HotItems items={value.content.items}/>
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
        </div>
      </div>
    );
  }
}
