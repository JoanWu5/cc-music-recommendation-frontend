import React from 'react';
import Navigator from "./Navigator";
import {Layout, List, Typography, Row, Col, Card, Button} from "antd";
import VirtualList from 'rc-virtual-list';
import { Link } from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Text } = Typography
const { Meta } = Card;

const lyricsHeight = 300;

const data = {
    "music": "Wish You Were Here",
    "artist": "Pink Floyd",
    "musicurl": "",
    "imageurl": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
    "lyrics": [
        {"time": "0000", "text":"So, so you think you can tell"},
        {"time": "0001", "text":"Heaven from hell?"},
        {"time": "0002", "text":"Heaven from hell?"},
        {"time": "0003", "text":"Heaven from hell?"},
        {"time": "0004", "text":"Heaven from hell?"},
        {"time": "0005", "text":"Heaven from hell?"},
        {"time": "0006", "text":"Heaven from hell?"},
        {"time": "0007", "text":"Heaven from hell?"},
        {"time": "0008", "text":"Heaven from hell?"},
        {"time": "0009", "text":"Heaven from hell?"},
        {"time": "0010", "text":"Heaven from hell?"},
        {"time": "0011", "text":"Heaven from hell?"},
        {"time": "0012", "text":"Heaven from hell?"}
    ]
}

const lyricsData = data.lyrics

class Detail extends React.Component {
    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator/>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                    <Row justify={"space-around"} align={"middle"} style={{marginTop: 80}}>
                        <Col span={6} offset={4}>
                            <Card
                                hoverable
                                style={{ width: 300 }}
                                cover={<img alt="example" src={data.imageurl} />}
                            >
                                <Meta title={data.music} description={data.artist} />
                            </Card>
                            <Link to="/recommendation">
                                <Button style={{float: "left", marginTop: 20}} size={"large"} type={"primary"}>
                                    Back
                                </Button>
                            </Link>
                        </Col>
                        <Col span={6}>
                            <List>
                                <VirtualList
                                    data={lyricsData}
                                    height={lyricsHeight}
                                    itemHeight={40}
                                    itemKey="time"
                                >
                                    {(item, index, props) => (
                                        <List.Item key={item.time}>
                                            <Text level={4}>{item.text}</Text>
                                        </List.Item>
                                    )}
                                </VirtualList>
                            </List>
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

export default Detail;