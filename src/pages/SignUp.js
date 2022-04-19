import React from 'react';
import {Layout, Row, Col, Menu, Button, Form, Input, Typography} from "antd";
import { Link } from "react-router-dom";
import AliIconFont from "./Icon";

const {Header, Content, Footer} = Layout;
const { Title} = Typography;

const IconFont = AliIconFont;

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

class SignUp extends React.Component {
    render() {
        return (
            <Layout style={{height:"100vh"}}>
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
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                size={"large"}
                            >
                                <Form.Item
                                    label="Name"
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your name!' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Email address"
                                    name="email"
                                    rules={[{ required: true, message: 'Please input your email!' }]}
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