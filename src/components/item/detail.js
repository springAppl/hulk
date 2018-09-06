import React from 'react';
export default class ItemDetail extends React.Component{
    render() {
        console.log(this.props.match);
        return <div>商品详情{this.props.match.params.id}</div>
    }

}