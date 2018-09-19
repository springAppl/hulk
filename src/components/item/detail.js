import React from 'react';
import {get} from '../tools/fetch';
import ItemForm from './item_form';
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
            <ItemForm  
            itemID={this.state.data.id}
            itemName={this.state.data.name} 
            itemPrice={this.state.data.price} 
            itemImage={this.state.data.image} 
            />
        </div>);
        return (view);
    }

}