import React from "react";
import hardware from "../../image/silver_hardware_medium.png";
import "./simulator.css";
import Category from "../minicomponents/category/category";
import HotItems from "../minicomponents/hotitems/hotitems";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
const Components = styled.div`
width: 100%;
`;
const Item = styled.div``;
export default class Simulator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      components: []
    }
    console.log(this.props.components());
  }

  componentWillMount() {
    fetch('/api/index')
    .then(response => response.json())
    .then(data => {
      this.setState({
        components: data
      });
    });
}



  onDragEnd = result => {
    // the only one that is required
    const {destination, source} = result;
    if (!destination) {
      return;
    }
    if(source.draggableId === destination.draggableId &&
      source.index === destination.index
    ) {
      return;
    }
    // 链表和数组的出对入队
   var newItems = Array.from(this.state.components);
   var sourceItem = newItems[source.index];
   newItems.splice(source.index, 1);
   console.log(newItems);
   newItems.splice(destination.index, 0, sourceItem);
   console.log(newItems);
   this.setState({
     components: newItems
   });
   this.props.components(newItems);
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
                  {this.state.components.map((value, index) => (
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
          </DragDropContext>
        </div>
      </div>
    );
  }
}
