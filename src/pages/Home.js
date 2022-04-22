import {Layout, Row, Col, Card} from 'antd';
import React from 'react';
import Navigator from "./Navigator";

const {Header, Content, Footer} = Layout;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

class Home extends React.Component {
    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"home"}/>
                </Header>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                    <Row justify="center" style={{marginTop: 100}}>
                        <Col span={20} offset={2}>
                            <Card title="High Danceability">
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                            </Card>
                            <Card title="High Danceability">
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                            </Card>
                            <Card title="High Danceability">
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                                <Card.Grid style={gridStyle}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%' }}
                                        cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                    >
                                    </Card>
                                </Card.Grid>
                            </Card>
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

export default Home;