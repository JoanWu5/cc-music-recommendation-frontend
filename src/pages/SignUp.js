import React from 'react';
import {Layout, Row, Col, Menu, Button, Form, Input, Typography, message, Modal} from "antd";
import {Link, Navigate} from "react-router-dom";
import AliIconFont from "./Icon";
import { authUrl } from '../spotifyAuth';

const {Header, Content, Footer} = Layout;
const { Title} = Typography;

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

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            finish: false,
            isModalVisible: false,
        }
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onFinish = this.onFinish.bind(this);
    }

    showModal() {
        this.setState({isModalVisible: true});
    };

    handleOk() {
        this.setState({isModalVisible: false});
        console.log('authorization ok:', authUrl);
        window.location = authUrl;
        // window.open(authUrl);
        this.setState({finish: true});
    }

    handleCancel() {
        this.setState({isModalVisible: false});
        this.setState({finish: true});
    }

    onFinish = (values) => {
        console.log('Success:', values);
        submitForm("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/signup", values).then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            const userId = data.data.userId;
            console.log(userId)
            localStorage.setItem("userId", userId);
            this.setState({isModalVisible: true});
            // this.setState({finish: true});
            // window.open("/#/", "_self");
        }).catch((error) => {
            console.error('Error:', error.message);
            message.error(error.message);
        });
    };

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                {this.state.finish && <Navigate to="/" replace={true}/>}
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Row justify='space-between'>
                        <Col>
                            <IconFont type="icon-music" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                        </Col>
                        <Col style={{width:'30%'}}>
                            <Menu theme="dark" mode="horizontal">
                                <Menu.Item key="text" style={{backgroundColor:'#001529'}}>
                                    Already have an account?
                                </Menu.Item>
                                <Menu.Item key="signup" style={{backgroundColor:'#001529'}}>
                                    <Link to="/login"><Button>Sign In</Button></Link>
                                </Menu.Item>
                            </Menu>
                        </Col>
                    </Row>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                    <Row justify="center" style={{marginTop: 100, minHeight: 50}}>
                        <Typography><Title>Sign Up</Title></Typography>
                    </Row>
                    <Row justify="center">
                        <Col span={10} offset={0}>
                            <Form
                                name="signUpForm"
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={this.onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                size={"large"}
                            >
                                <Form.Item
                                    label="Username"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input />
                                </Form.Item>
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

                                <Form.Item wrapperCol={{ offset: 10, span: 3 }}>
                                    <Button type="primary" htmlType="submit">
                                        Sign Up
                                    </Button>
                                </Form.Item>
                            </Form>
                            <Modal title="Authorization" visible={this.state.isModalVisible}
                                    onOk={this.handleOk} onCancel={this.handleCancel}>
                                        <p>Do you want us to get your spotify data?</p>
                            </Modal>
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

export default SignUp;