import React from 'react';
import Navigator from "./Navigator";
import {Layout, Menu, message, Spin} from "antd";
import Setting from "./Setting";
import LikeList from "./LikeList";

const { Header, Content, Footer, Sider } = Layout;

class Profile extends React.Component {
    componentDidMount() {
        if (this.state.userId === null || this.state.userId === undefined || this.state.userId === "") {
            message.error("Please Login First!");
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            menuName: ["likelist", "setting"],
            menuSelectedKey: "likelist"
        }
        this.onClick = this.onClick.bind(this);
    }

    onClick(item) {
        // console.log(item);
        this.setState({menuSelectedKey: item.key});
    }

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator/>
                </Header>
                <Layout>
                    <Sider>
                        <Menu theme="dark" style={{marginTop: 100, textAlign: "center"}}
                              defaultSelectedKeys={["likelist"]} onClick={this.onClick}>
                            <Menu.Item key="likelist">Liked Songs</Menu.Item>
                            <Menu.Item key="setting">Setting</Menu.Item>
                        </Menu>
                    </Sider>
                    <Content className="site-layout" style={{minHeight: "80vh", padding: '0 50px', marginTop: 80}}>
                        {(this.state.userId === null || this.state.userId === undefined || this.state.userId === "") &&
                            <Spin style={{marginTop: 100}}/>}
                        {this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== "" &&
                            this.state.menuSelectedKey === "setting" && <Setting/>
                        }
                        {this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== "" &&
                            this.state.menuSelectedKey === "likelist" && <LikeList/>
                        }
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