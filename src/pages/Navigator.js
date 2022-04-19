import {Menu, Input, Space, Button, Col, Row} from 'antd';
import { Link } from "react-router-dom";
import React from 'react';
import AliIconFont from "./Icon";

const IconFont = AliIconFont;

const onSearch = value => {
    console.log(value);
}

const userId ="a";
const DinosaurIcon = props => <IconFont type="icon-040-birthday" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>;

function ShowUser(props) {
    return <Menu theme="dark" mode="horizontal">
        <Menu.SubMenu key="user" icon={<DinosaurIcon/>} style={{width: '20%'}}>
            <Menu.Item key="profile"><Link to="/profile">Profile</Link></Menu.Item>
            <Menu.Item key="logout"><Link to="/login">Log Out</Link></Menu.Item>
        </Menu.SubMenu>
    </Menu>
}

function NoUsers(props) {
    return <Menu theme="dark" mode="horizontal">
        <Menu.Item key="signin" style={{backgroundColor:'#001529'}}>
            <Link to="/login">Sign In</Link>
        </Menu.Item>
        <Menu.Item key="signup" style={{backgroundColor:'#001529'}}>
            <Link to="/signup"><Button>Sign Up</Button></Link>
        </Menu.Item>
    </Menu>
}

function ShowUserState(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn !== "") {
        return <ShowUser/>
    }
    return <NoUsers/>
}

class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultSelectedKey: props.deafultSelectedKey
        }
    }

    render() {
        return (
            <Row justify="space-between">
                <Col span={16}>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.state.defaultSelectedKey]}>
                        <Menu.Item to="/" key="icon" style={{backgroundColor: '#001529'}}>
                            <IconFont type="icon-music" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                        </Menu.Item>
                        <Menu.Item key="recom"><Link to="/recommendation">Recommendation</Link></Menu.Item>
                        <Menu.Item key="report"><Link to="/report">Report</Link></Menu.Item>
                        <Menu.Item key="interest"><Link to="/interest">Test Interests</Link></Menu.Item>
                        <Menu.Item key="search" style={{padding: '15px 20px 0px', backgroundColor: '#001529'}}>
                            <Space direction="vertical">
                                <Input.Search placeholder="Search" onSearch={onSearch} enterButton/>
                            </Space>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    <ShowUserState isLoggedIn={userId}/>
                </Col>
            </Row>
        );
    }
}

export default Navigator;