import React from 'react'
import styled, { css} from 'styled-components'

import { IconContext } from "react-icons";
import { FaBeer } from 'react-icons/fa';
import logo from './../../logo.svg'

const Lists = [
  {typeId: 1, icon: logo, title: '轮播组件'},
  {typeId: 2, icon: logo, title: '轮播组件'},
  {typeId: 3, icon: logo, title: '轮播组件'},
  {typeId: 4, icon: logo, title: '轮播组件'},
  {typeId: 5, icon: logo, title: '轮播组件'},
  {typeId: 6, icon: logo, title: '轮播组件'},
  {typeId: 7, icon: logo, title: '轮播组件'},
]

const icon = (ico) => {
  return <ico/>
}
export default class A extends React.Component{
  render(){
    return(
      <Container>

        <List>
          {Lists.map(item => {
            return <Item key={item.typeId }>
                <Left src={item.icon}/>
                <Right>
                 {item.title}
                </Right>
              </Item>
          })}
        </List>

      </Container>
    )
  }
}

const Container = styled.div`
  width: 100%;
  height: 628px;
  max-width: 300px;
  float: right;
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
