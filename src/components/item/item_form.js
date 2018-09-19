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
        data.id = this.state.itemID;
        put('/api/item', data);
        window.location = '/item';
    }

    componentDidMount() {
        this.props.form.setFieldsValue({
            'name': this.props.itemName,
            'price': this.props.itemPrice
        });
        this.setState({
            imageUrl: this.props.itemImage,
            itemID: this.props.itemID,
        });
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
                    {
                        getFieldDecorator('name', {
                            rules: [{ required: true, message: 'Please input item name!' }],
                        })
                        (
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="商品名称" />
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
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="image" /> : uploadButton}
                        {this.props.itemImage ? uploadButton : <div/>}
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
const ItemForm = Form.create()(Item);
export default ItemForm;