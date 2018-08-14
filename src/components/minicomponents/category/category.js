import React from 'react';
import './category.css';
export default class Category extends React.Component{
    render(){
        const cat = this.props.categories != null ? this.props.categories.map((value, index, array) => {
            return (<div key={value.id} className="categoryItem">
                <div>
                    <img src={value.image} className="image" alt={value.name}/>
                </div>
                <div className='span'>
                    <span>{value.name}</span>
                </div>
            </div>);
        }):null;
        return (<div className='category'>
            {cat}
            {this.props.isEdit === true ? (<div className="categoryItem">
                编辑模式
            </div>):(<div/>)}
        </div>);
    }
}