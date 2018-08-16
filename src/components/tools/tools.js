import React from 'react'
import styled, { css} from 'styled-components'
import { IconContext } from "react-icons";
import { FaBeer } from 'react-icons/fa';
import logo from './../../logo.svg'
import {Droppable, Draggable } from 'react-beautiful-dnd';
const Components = styled.div`
width: 400px
`;
const Lists = [
  {id: 1, typeId: 'category', icon: logo, title: '类目组件'},
  {id: 2, typeId: 'hotitems', icon: logo, title: '商品组件'},
]

const icon = (ico) => {
  return <ico/>
}
export default class A extends React.Component{
  render(){
    return(
      <Droppable droppableId='tool' direction="vertical" >
          {(provided) => (
            
                <Container
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <List>
                  {Lists.map((item, index) => {
                      return (
                        <Draggable draggableId={item.typeId} index={index} key={item.id}>
                          {
                            (provided) => (
                              <Item 
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                              <Left src={item.icon}/>
                              <Right>
                              {item.title}
                              </Right>
                              </Item>
                            )
                          }
                        </Draggable>
                      )
                    }
                  )
                }
                  </List>
                  {provided.placeholder}
                </Container>
          )}
      </Droppable>
    )
  }
}

const Container = styled.div`
  width: 300px;
  height: 628px;
  min-width: 300px;
  float: left;
  background-color: #001529;
`
const List = styled.div`
  padding: 20px 20px 10px;
  display: flex;
  flex-direction: column;
`
const Item = styled.section`
  height: 60px;
  flex: 1;
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;
  background-color: #1890ff;
`

const Left = styled.img`
  width: 60px;
  height: 60px;
  padding: 8px;
`

const Right = styled.div`
  flex-grow: 1;
  color: #fff;
`
