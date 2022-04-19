import React from 'react';
import Navigator from "./Navigator";
import {Layout, List, Typography, Row, Col, Card, Button} from "antd";
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title } = Typography

const data = [
    {
        "music": 'Wish You Were Here',
        "artist": 'Pink Floyd',
    },
    {
        "music": 'Firth Of Fifth',
        "artist": 'Genesis',
    },
    {
        "music": 'Larks’ Tongues In Aspic, Pt. II',
        "artist": 'King Crimson',
    },
    {
        "music": 'No Quarter',
        "artist": 'Led Zeppelin',
    },
];

class Recommendation extends React.Component {
    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"recom"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 50}}>
                    <Row justify={"space-around"} align={"middle"} style={{marginTop: 50}}>
                        <Col span={16}>
                            <List
                                bordered={false}
                                dataSource={data}
                                size={"large"}
                                renderItem={item => (
                                    <List.Item>
                                        <Card hoverable={false} style={{ width: '100%' }}>
                                            <Link to="/detail">
                                                <Title level={4}>{item.music + ' - ' + item.artist}</Title>
                                            </Link>
                                        </Card>
                                    </List.Item>
                                )}
                            />
                            <Button style={{float: "left", marginTop: 20}} size={"large"}>
                                Generate Another Set
                            </Button>
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

export default Recommendation;