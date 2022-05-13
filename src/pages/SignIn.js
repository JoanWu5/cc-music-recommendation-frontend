import React from 'react';
import {Button, Col, Form, Input, Layout, Menu, Modal, Row, Typography, message} from "antd";
import { Link, Navigate } from "react-router-dom";
import AliIconFont from "./Icon";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const IconFont = AliIconFont;

async function submitForm(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
    });
    return {
        "statusOk": response.ok,
        "data": await response.json()
    };
}

const onFinishFailed = ({ values, errorFields, outOfDate }) => {
    console.log('Failed:', errorFields);
};

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            isSendEmail: false,
            finish: false,
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.ShowMessage = this.ShowMessage.bind(this);
        this.onForgetFinish = this.onForgetFinish.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.sendEmail = this.sendEmail.bind(this);
    }

    showModal() {
        this.setState({isModalVisible: true});
    };

    handleOk() {
        this.setState({isModalVisible: false});
        this.setState({isSendEmail: false});
    }

    handleCancel() {
        this.setState({isModalVisible: false});
        this.setState({isSendEmail: false});
    }

    ShowMessage() {
        if (this.state.isSendEmail === true) {
            return <p>We have sent an email to your email address to help you find your password, please check!</p>
        }
    }

    onForgetFinish = (values) => {
        console.log('Success:', values);
        submitForm("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/forget", values).then(data => {
            console.log(data);
            // this.setState({isSendEmail: true});
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            this.sendEmail(data.data.userId, values.email);
        }).catch((error) => {
            console.error('Error:', error.message);
            message.error(error.message);
        });
    }

    sendEmail(userId, email) {
        const sendData = {
            userId: userId,
            email: email
        }
        submitForm("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/musicSES", sendData).then(data => {
            console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            this.setState({isSendEmail: true});
            // console.log(message);
        }).catch((error) => {
            console.error('Error:', error.message);
            message.error(error.message);
        });
    }

    onFinish = (values) => {
        console.log('Success:', values);
        submitForm("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/login", values).then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            const userId = data.data.userId;
            console.log(userId)
            localStorage.setItem("userId", userId);
            this.setState({finish: true});
            // <Navigate to="/" replace={true}/>
            // window.open("/#/", "_self");
        }).catch((error) => {
            console.error('Error:', error.message);
            message.error(error.message);
        });
    }

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                {this.state.finish && <Navigate to="/" replace={true}/>}
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Row justify='space-between'>
                        <Col>
                            <Link to="/">
                                <IconFont type="icon-music" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                            </Link>
                        </Col>
                        <Col style={{width:'30%'}}>
                            <Menu theme="dark" mode="horizontal">
                                <Menu.Item key="text" style={{backgroundColor:'#001529'}}>New User?</Menu.Item>
                                <Menu.Item key="signup" style={{backgroundColor:'#001529'}}>
                                    <Link to="/signup"><Button>Create An Account</Button></Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                    <Row justify="center" style={{marginTop: 100, minHeight: 50}}>
                        <Typography><Title>Sign In</Title></Typography>
                    </Row>
                    <Row justify="center">
                        <Col span={10} offset={0}>
                            <Form
                                name="signInForm"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                size={"large"}
                            >
                                <Form.Item
                                    label="Email address"
                                    name="email"
                                    rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item wrapperCol={{ offset: 0, span: 2 }}>
                                    <Button type="text" onClick={() => this.showModal()}>Forget Password?</Button>
                                    <Modal title="Forget Password?" visible={this.state.isModalVisible}
                                           onOk={this.handleOk} onCancel={this.handleCancel}>
                                        <p>Please input your email address</p>
                                        <Form
                                            name="signInForgetForm"
                                            layout="vertical"
                                            initialValues={{ remember: true }}
                                            onFinish={this.onForgetFinish}
                                            onFinishFailed={onFinishFailed}
                                            autoComplete="off"
                                            size={"middle"}
                                        >
                                            <Form.Item
                                                name="email"
                                                rules={[{ required: true, type: "email", message: 'Please input your email!' }]}
                                            >
                                                <Input />
                                            </Form.Item>
                                            <Form.Item wrapperCol={{ offset: 20, span: 4 }}>
                                                <Button type="primary" htmlType="submit">
                                                    Send
                                                </Button>
                                            </Form.Item>
                                        </Form>
                                        <this.ShowMessage/>
                                    </Modal>
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 10, span: 3 }}>
                                    <Button type="primary" htmlType="submit">
                                        Sign in
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>

                </Content>
                <Footer style={{marginTop: 100, textAlign: 'center'}}>
                     CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default SignIn;