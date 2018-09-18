import React from 'react';
import {get} from '../tools/fetch';
export default class ItemDetail extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            data: null,
            loading: true
        };
    }


    componentWillMount() {
        get('/api/item/'+this.props.match.params.id, data => this.setState({
            data: data,
            loading: false
        }));
    }
    
    
    render() {
        var view = this.state.loading ? 
        (<div/>)
        :
        (<div>
            商品名称{this.state.data.name}
            <img src={this.state.data.image}/>
        </div>);
        return (view);
    }

}