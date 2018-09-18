import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { put } from '../tools/fetch';
import { Upload, message } from 'antd';

const FormItem = Form.Item;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
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


class Item extends React.Component {
    state = {
        loading: false,
      };
    
      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
            imageResponse: info.file.response,
          }));
        }
      }




    handleSubmit = (e) => {
        e.preventDefault();
        var data = this.props.form.getFieldsValue();
        data.image = this.state.imageResponse;
        console.log(data);
        put('/api/item', data);
        window.location = '/item';
    }



    render() {
        const { getFieldDecorator } = this.props.form;
        const uploadButton = (
            <div>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">Upload</div>
            </div>
          );
        const imageUrl = this.state.imageUrl;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                {getFieldDecorator('name', {
                    rules: [{ required: true, message: 'Please input item name!' }],
                })
                (
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="name" />
                )
                }
                </FormItem>
                <FormItem>
                    {
                        getFieldDecorator('price', {
                            rules: [{required: true, message: 'Please input item price'}]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="商品价格" />
                        )
                    }
                </FormItem>
                <FormItem>
                <Upload
                    name="file"
                    action="/api/image"
                    // beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        创建
                    </Button>
                </FormItem>
            </Form>
        );
    }
}
export const ItemForm = Form.create()(Item);