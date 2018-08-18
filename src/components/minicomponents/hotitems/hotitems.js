import React, {Component} from 'react';
import './hotitems.css';
import { Input, Upload, Icon, message } from 'antd';
import store from '../../../store/store';
import {observer} from 'mobx-react';
import del from '../../../image/del.png';
import dd from '../../../image/dd.png';
const { TextArea } = Input;
@observer
export default class HotItems extends Component{
    state = {
        loading: false,
      };


      changeName = (e, index, value) => {
        var newItems = this.props.items == null ? [] : this.props.items;
        newItems.splice(index, 1, {
            id: index,
            name: e.target.value,
            image: value.image,
            price: value.price
        });
        this.props.changeContent({
            items: newItems
        });
    }

    changePrice = (e, index, value) => {
        var newItems = this.props.items == null ? [] : this.props.items;
        newItems.splice(index, 1, {
            id: index,
            price: e.target.value,
            image: value.image,
            name: value.name
        });
        this.props.changeContent({
            items: newItems
        });
    }


    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      }
      
      beforeUpload = (file) => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
      }
      
        handleChange = (info) => {
          if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            console.log(info.file);
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
              imageUrl: null,
              loading: false,
            }));
            // TODO 
            var newItems = this.props.content == null ? [] : this.props.content.items;
            newItems.push({
                image: info.file.response
            });
            var components = Array.from(store.components);
            var item = components[this.props.index];
            item.content = {
                items: newItems
            }
            components.splice(this.props.index, 1, item);
            store.refreshData(components);

          }
        }

    editMode = () => {
        store.setEdit(this.props.id);
    }
    delete = () => {
        var components = Array.from(store.components);
        components.splice(this.props.index, 1);
        store.refreshData(components);
        console.log('del: ' + this.props.index );
    }
    delInnerComponent = index => {
        var components = Array.from(store.components);
        components[this.props.index].content.categories.splice(index, 1);
        store.refreshData(components);
    }
    render(){
        
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          var edit = this.props.id == store.edit;
          var display = store.edit == this.props.id ? 'block' : 'none';
        return (
            <div>
                <a onClick={this.delete}>
            <div style={{display: display, backgroundColor:'white', height: 16}}>
                <img style={{float: 'left', backgroundColor: '#FA8072'}} src={del}/>
            </div>
            </a>
            <a onClick={this.editMode}>
        <div className='hotitems'>
            {
                this.props.content != null ? this.props.content.items.map((value, index, array) => {
                    return (<div className="item" key={index}>
                        <div className='image'>
                            <a onClick={() => this.delInnerComponent(index)}><img style={{float: 'right', display: display}} src={dd} /></a>
                            <img src={value.image} className="image" alt={value.name}/>
                        </div>
                        <div className='description'>
                        <span>                    
                            {
                                edit ? (
                                    <TextArea rows={4} value={value.name} onChange={(e) => this.changeName(e, index, value)} />
                                ):(value.name)
                            }
                        </span>
                        </div>
                        <div className='price'>
                            <span>                    
                            {
                                    edit ? (
                                        <Input style={{width: 100}} value={value.price} onChange={(e) => this.changePrice(e, index, value)} />
                                    ):(value.price)
                            }    
                            </span>
                        </div>
                    </div>);
                }):(<div/>)
            }
            {this.props.id == store.edit ? (<div className="item" >
                <div className='image'>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/api/image/"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
                </div>
            </div>):(<div/>)}
        </div>
        </a>
            </div>
        );
    }
}