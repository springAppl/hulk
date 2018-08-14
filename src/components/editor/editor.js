import React from 'react';
import styled from 'styled-components';
import Category from '../minicomponents/category/category';
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
        return (<Box>
            <Category categories={this.props.content}/>
        </Box>);
    }
}