import React from 'react';
import Navigator from "./Navigator";
import {Layout, Row, Col, Button, Form, Input, message} from "antd";

const { Header, Content, Footer} = Layout;

async function submitForm(url, data) {
    const response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
    });
    return {
        "statusOk": response.ok,
        "data": await response.json()
    };
}

const href = window.location.href;
const params = href.split('?')[1];
let userId = "";

// Be sure url params exist
if (params && params !== '') {
    const result = params.split('&').reduce(function (res, item) {
        const parts = item.split('=');
        res[parts[0]] = parts[1];
        return res;
    }, {});
    console.log(result);
    userId = result["userId"];
}

const onFinish = (values) => {
    values["forget"] = true;
    console.log('Success:', values);
    console.log(userId)
    submitForm("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/password/" + userId, values).then(data => {
        // console.log(data);
        const dataMessage = data.data.message;
        if (!data.statusOk) {
            throw new Error(dataMessage);
        }
        message.success(dataMessage);
    }).catch((error) => {
        console.error('Error:', error.message);
        message.error(error.message);
    });
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

class Forget extends React.Component {
    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator/>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                    <Row justify={"space-around"} align={"middle"} style={{marginTop: 80}}>
                        <Col span={10}>
                            <Form
                                name="forgetForm"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                size={"large"}
                            >
                                <Form.Item
                                    label="New Password"
                                    name="newPassword"
                                    rules={[{ required: true, message: 'Please input your new password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 10, span: 3 }}>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Forget;