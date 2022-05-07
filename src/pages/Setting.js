import React from 'react';
import {Button, Col, Form, Input, message, Row, Typography} from "antd";

const { Title } = Typography

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

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

class Setting extends React.Component {
    componentDidMount() {
        if (this.state.userId === null || this.state.userId === undefined || this.state.userId === "") {
            message.error("Please Login First!");
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId")
        }
        this.onFinish = this.onFinish.bind(this);
    }

    onFinish = (values) => {
        values["forget"] = false;
        console.log('Success:', values);
        // console.log(userId)
        submitForm("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/password/" + this.state.userId,
            values)
            .then(data => {
                console.log(data);
                const dataMessage = data.data.message;
                if (!data.statusOk) {
                    throw new Error(dataMessage);
                }
                message.success(dataMessage);
            }).catch((error) => {
            console.error('Error:', error.message);
            message.error(error.message);
        });
    }

    render() {
        return (
            <div>
                <Row justify="center" style={{marginTop: 100, minHeight: 50}}>
                    <Typography><Title>Hi, {this.state.userId}</Title></Typography>
                </Row>
                <Row justify="center" style={{ minHeight: 20}}>
                    <Typography><Title level={2}>Update Password</Title></Typography>
                </Row>
                <Row justify={"space-around"} align={"middle"} style={{marginTop: 50}}>
                    <Col span={10}>
                        <Form
                            name="settingForm"
                            layout="vertical"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                            size={"large"}
                        >
                            <Form.Item
                                label="Old Password"
                                name="oldPassword"
                                rules={[{ required: true, message: 'Please input your old password!' }]}
                            >
                                <Input.Password />
                            </Form.Item>
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
            </div>
        )
    }
}

export default Setting;