import React, {Component} from 'react';
import './hotitems.css';
import { Input, Upload, Icon, message } from 'antd';
import {observer} from 'mobx-react';
import close from '../../../image/close.png';
import trash from '../../../image/trash.png';

const { TextArea } = Input;
@observer
export default class HotItems extends Component{
    state = {
        loading: false,
      };


      changeName = (e, index, value) => {
        var components = Array.from(this.props.store.components);
        components[this.props.index].content.items.splice(index, 1, {
            id: index,
            name: e.target.value,
            image: value.image,
            price: value.price
        });
        this.props.store.refreshData(components);
    }

    changePrice = (e, index, value) => {
        var components = Array.from(this.props.store.components);
        components[this.props.index].content.items.splice(index, 1, {
            id: index,
            price: e.target.value,
            image: value.image,
            name: value.name
        });
        this.props.store.refreshData(components);
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
            var components = Array.from(this.props.store.components);
            var item = components[this.props.index];
            item.content = {
                items: newItems
            }
            components.splice(this.props.index, 1, item);
            this.props.store.refreshData(components);

          }
        }

    editMode = () => {
        this.props.store.setEdit(this.props.id);
    }
    delete = () => {
        var components = Array.from(this.props.store.components);
        components.splice(this.props.index, 1);
        this.props.store.refreshData(components);
    }
    delInnerComponent = index => {
        var components = Array.from(this.props.store.components);
        components[this.props.index].content.items.splice(index, 1);
        this.props.store.refreshData(components);
    }
    render(){

        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
          var edit = this.props.id == this.props.store.edit;
          var display = this.props.store.edit == this.props.id ? 'flex' : 'none';
        return (
            <div className="componentWrapper">
            <div onClick={this.delete} className="deleteList" style={{display: display}}>
              <div className="trashBtn">
                <img src={trash}/>
              </div>
            </div>
            <a onClick={this.editMode}>
        <div className='hotitems'>
            {
                this.props.content != null ? this.props.content.items.map((value, index, array) => {
                    return (<div className="item" key={index}>
                        <div className='image'>
                            <img className="deleteItem" onClick={() => this.delInnerComponent(index)} style={{float: 'right', display: display}} src={close} />
                            <img src={value.image} className="image" alt={value.name}/>
                        </div>
                        <div className='description'>

                            {
                                edit ? (
                                    <TextArea rows={4} value={value.name} onChange={(e) => this.changeName(e, index, value)} />
                                ):(value.name)
                            }

                        </div>
                        <div className='price'>

                            {
                                    edit ? (
                                      <div>
                                        <Input className="priceEdit" value={value.price} onChange={(e) => this.changePrice(e, index, value)} /> 
                                      </div>
                                    ):(<div>{( value.price / 100 ).toFixed( 2 )} <span>元</span> </div> )
                            }

                        </div>
                    </div>);
                }):(<div/>)
            }
            {this.props.id == this.props.store.edit ? (<div className="item" >
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
