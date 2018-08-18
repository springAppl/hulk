import React from 'react';
import './category.css';
import { Input, Upload, Icon, message } from 'antd';
import store from '../../../store/store';
import {observer} from 'mobx-react';
@observer
export default class Category extends React.Component{
    state = {
        loading: false,
    };
    changeValue = (e, index, value) => {
        var newItems = this.props.content == null ? [] : this.props.content.categories;
        newItems.splice(index, 1, {
            id: index,
            name: e.target.value,
            image: value.image
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
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
              imageUrl: null,
              loading: false,
            }));
            // TODO 
            var newCategories = this.props.content == null ? [] : this.props.content.categories;
            newCategories.push({
                id: newCategories.length,
                image: info.file.response
            });
            var components = Array.from(store.components);
            var item = components[this.props.index];
            item.content = {
                categories: newCategories
            }
            components.splice(this.props.index, 1, item);
            store.refreshData(components);
          }
        }

    editMode = () => {
        store.setEdit(this.props.id);
    }

    render(){
        const imageUrl = this.state.imageUrl;
        const uploadButton = (
            <div style={{width:60, height:50, margin:0, padding:0}}>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const cat = this.props.content != null ? this.props.content.categories.map((value, index, array) => {
            return (<div key={value.id} className="categoryItem">
                <div>
                    <img src={value.image} className="image" alt={value.name}/>
                </div>
                <div className='span'>
                    <span>                    
                        {
                            this.props.id == store.edit ? (
                                <Input value={value.name}  onChange={(e) => this.changeValue(e, index, value)} />
                            ):(value.name)
                        }
                    </span>
                </div>
            </div>);
        }):null;
        return (
            <a onClick={this.editMode}>
        <div className='category'>
            {cat}
            {this.props.id == store.edit ? (<div className="categoryItem">
                <div >
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
                <div className='span'>
                    <span></span>
                </div>
            </div>):(<div/>)}
        </div>
        </a>
        );
    }
}