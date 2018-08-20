import React from "react";
import hardware from "../../image/silver_hardware_medium.png";
import "./simulator.css";
import Category from "../minicomponents/category/category";
import HotItems from "../minicomponents/hotitems/hotitems";
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import store from '../../store/store';
import { observer } from "mobx-react"
const Components = styled.div`
width: 100%;
display: block;
`;
const Item = styled.div`
width: 100%;
margin: 0px;
background-color: red
`;
class Simulator extends React.Component {

  render() {
    var divStyle = {
      backgroundImage: "url(" + hardware + ")",
      height: 628,
      width: 319,
      margin: 0
    };
    return (
      <div style={divStyle}>
        <div
          style={{
            height: 73,
            width: 319
          }}
        />
        <Droppable  droppableId="simulator" direction="vertical">
              {(provided) => {
                return <Components
                className="container"

                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: provided.isDragging ? 'green' : 'lightblue',
                    height: 483,
                    width: 274,
                    marginLeft: 21
                  }}
                >
                  {
                    this.props.components.map((value, index) => (
                          <Draggable draggableId={index} index={index} key={index}>
                            {
                              (provided) => {
                                var com = null;
                                if (value.typeId === 'category') {
                                  com = <Category {...value} index={index}  />
                                } else if(value.typeId === 'hotitems'){
                                  com = <HotItems {...value} index={index} />
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
                      )
                    )
                  }
                  {provided.placeholder}
                </Components>
              }}
            </Droppable>
      </div>
    );
  }
}
Simulator = observer(Simulator)
export default Simulator
