import React, {Component} from 'react';
import './hotitems.css';
export default class HotItems extends Component{
    render(){
        const cat = this.props.items.map((value, index, array) => {
            return (<div className="item" key={value.id}>
                <div className='image'>
                    <img src={value.image} className="image" alt={value.name}/>
                </div>
                <div className='description'>
                    <span>{value.name}</span>
                </div>
                <div className='price'>
                    <span>{value.price}</span>
                </div>
            </div>);
        });
        return (<div className='hotitems'>
            {cat}
        </div>);
    }
}