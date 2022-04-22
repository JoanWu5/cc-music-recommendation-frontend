import React from 'react';
import Navigator from "./Navigator";
import {Layout, List, Typography, Row, Col, Card, Button, message, Spin} from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title } = Typography

async function getData(url) {
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache'
    });
    return {
        "statusOk": response.ok,
        "data": await response.json()
    };
}

class Recommendation extends React.Component {
    componentDidMount() {
        if (this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== "") {
            this.getRecommendationData();
        } else {
            message.error("Please Login First!");
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            recommendationData: null,
            previous: "",
            userId: localStorage.getItem("userId")
        }
        this.getRecommendationData = this.getRecommendationData.bind(this);
        this.getAnotherRecommendation = this.getAnotherRecommendation.bind(this);
    }

    getRecommendationData() {
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/recommendation/" + this.state.userId)
            .then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            this.setState({recommendationData: data.data.music});
            this.setState({previous: data.data.previous});
        }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getAnotherRecommendation() {
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/recommendation/" + this.state.userId +
            "?previous=" + this.state.recommendationData.previous).then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            this.setState({recommendationData: data.data.music});
            this.setState({previous: data.data.previous});
        }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"recom"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 50}}>
                    {this.state.recommendationData === null && <Spin style={{marginTop: 100}}/>}
                    {this.state.recommendationData !== null && <Row justify={"space-around"} align={"middle"} style={{marginTop: 50}}>
                        <Col span={16}>
                            <List
                                bordered={false}
                                dataSource={this.state.recommendationData}
                                size={"large"}
                                renderItem={item => (
                                    <List.Item>
                                        <Card hoverable={false} style={{ width: '100%' }}>
                                            <Link to="/detail">
                                                <Title level={4}>{item.musicName + ' - ' + item.artistName}</Title>
                                            </Link>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                            <Button style={{float: "left", marginTop: 20}} size={"large"}
                                    onClick={this.getAnotherRecommendation}>
                                Generate Another Set
                            </Button>
                        </Col>
                    </Row>}

                </Content>
                <Footer style={{marginTop: 100, textAlign: 'center'}}>
                     CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Recommendation;