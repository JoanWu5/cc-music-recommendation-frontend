import {Menu, Input, Button, Col, Row, message} from 'antd';
import {Link, Navigate} from "react-router-dom";
import React from 'react';
import AliIconFont from "./Icon";

const IconFont = AliIconFont;
const DinosaurIcon = props => <IconFont type="icon-040-birthday" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>;

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

class Navigator extends React.Component {
    componentDidMount() {
        this.setState({userId: localStorage.getItem("userId")});
        this.setState({isLoggedIn:
                this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== ""});
        if (this.state.query !== "") {
            this.setState({query: ""});
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.userId !== prevState.userId || this.state.userId !== localStorage.getItem("userId")) {
            this.setState({userId: localStorage.getItem("userId")})
            this.setState({isLoggedIn:
                    this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== ""});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            isLoggedIn: false,
            isLoggedOut: false,
            query: ""
        }
        this.LoginOut = this.LoginOut.bind(this);
        this.ShowUser = this.ShowUser.bind(this);
        this.ShowUserState = this.ShowUserState.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    LoginOut() {
        localStorage.clear();
        this.setState({userId: ""});
        this.setState({isLoggedIn: false});
        this.setState({isLoggedOut: true});
    }

    ShowUser() {
        return <Menu theme="dark" mode="horizontal">
            <Menu.SubMenu key="user" icon={<DinosaurIcon/>} style={{width: '20%'}}>
                <Menu.Item key="profile"><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item key="logout">
                    <Button type="text" style={{color: "#fff", backgroundColor: "transparent", padding: "0px"}}
                            onClick={this.LoginOut}>
                        Log Out
                    </Button>
                </Menu.Item>
            </Menu.SubMenu>
        </Menu>
    }

    ShowUserState() {
        const isLoggedIn = this.state.userId;
        if (isLoggedIn !== null && isLoggedIn !== undefined && isLoggedIn !== "") {
            return <this.ShowUser/>
        }
        return <NoUsers/>
    }

    onSearch(value) {
        if (value === "") {
            message.error("Please input the search content!");
            return;
        }
        this.setState({query: value});
    }

    render() {
        return (
            <div>
                {this.state.query !== "" && <Navigate to={`/search?q=${this.state.query}`} replace={true}
                                                      state={{query: this.state.query}}/>}
                {this.state.isLoggedOut && <Navigate to="/" replace={true}/>}
                <Row justify="space-between">
                    <Col span={16}>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[this.props.deafultSelectedKey]}>
                            <Menu.Item key="icon" style={{backgroundColor: '#001529'}}>
                                <Link to="/">
                                    <IconFont type="icon-music" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="home"><Link to="/">Home</Link></Menu.Item>
                            <Menu.Item key="recom" disabled={!this.state.isLoggedIn}><Link to="/recommendation">Recommendation</Link></Menu.Item>
                            <Menu.Item key="report" disabled={!this.state.isLoggedIn}><Link to="/report">Report</Link></Menu.Item>
                            <Menu.Item key="interest" disabled={!this.state.isLoggedIn}><Link to="/interest">Test Interests</Link></Menu.Item>
                            <Menu.Item key="search" style={{padding: '15px 20px 0px', backgroundColor: '#001529'}}>
                                <div>
                                    <Input.Search placeholder="Search" onSearch={this.onSearch} enterButton/>
                                </div>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={4}>
                        <this.ShowUserState />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Navigator;