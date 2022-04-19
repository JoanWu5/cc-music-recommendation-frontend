import React from 'react';
import Navigator from "./Navigator";
import {Layout, Row, Col, Button, Menu, Form, Input, Typography, Modal} from "antd";

const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function forgetSuccess() {
    Modal.success({
        content: 'We have sent an email to your email address to help you find your password, please check!',
    });
}


class Profile extends React.Component {
    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator/>
                </Header>
                <Layout>
                    <Sider>
                        <Menu theme="dark" style={{marginTop: 100, textAlign: "center"}}
                              defaultSelectedKeys={["setting"]}>
                            <Menu.Item key="setting">Setting</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                        <Row justify="center" style={{marginTop: 100, minHeight: 50}}>
                            <Typography><Title>Update Password</Title></Typography>
                        </Row>
                        <Row justify={"space-around"} align={"middle"} style={{marginTop: 80}}>
                            <Col span={10}>
                                <Form
                                    name="settingForm"
                                    layout="vertical"
                                    initialValues={{ remember: true }}
                                    onFinish={onFinish}
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
                                    <Form.Item wrapperCol={{ offset: 0, span: 2 }}>
                                        <Button type="text" onClick={forgetSuccess}>Forget Old Password?</Button>
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
                </Layout>
                <Footer style={{textAlign: 'center'}}>
                    CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Profile;