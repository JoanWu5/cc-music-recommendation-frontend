import React from 'react';
import {Layout, Row, Col, Menu, Button, Form, Input, Typography, Modal} from "antd";
import { Link } from "react-router-dom";
import AliIconFont from "./Icon";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const IconFont = AliIconFont;

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false
        }
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    showModal() {
        this.setState({isModalVisible: true});
    };

    handleOk() {
        this.setState({isModalVisible: false});
    }

    handleCancel() {
        this.setState({isModalVisible: false});
    }

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
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off"
                                size={"large"}
                            >
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
                                <Form.Item wrapperCol={{ offset: 0, span: 2 }}>
                                    <Button type="text" onClick={() => this.showModal()}>Forget Password?</Button>
                                    <Modal title="Find Password" visible={this.state.isModalVisible}
                                           onOk={this.handleOk} onCancel={this.handleCancel}>
                                        <p>Please input your email address</p>
                                        <p><Input /></p>
                                        <p>We will send an email to your email address to help you find your password, please check!</p>
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