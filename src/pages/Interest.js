import {Layout, Row, Typography, Carousel, Card, Col, Radio, Button} from 'antd';
import React from 'react';
import Navigator from "./Navigator";
import AliIconFont from "./Icon";

const {Header, Content, Footer} = Layout;
const { Title } = Typography;
const { Meta } = Card;

const IconFont = AliIconFont;

const Arrow = ({ type, style, className, onClick }) => (
    <IconFont type={type} style={style} className={className} onClick={onClick} />
);

class Interest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 1
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        console.log('radio checked', e.target.value);
        this.setState({value: e.target.value});
    };

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"interest"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                    <Row justify="center" style={{marginTop: 50, minHeight: 50}}>
                        <Typography><Title>Test Your Music Interests</Title></Typography>
                    </Row>
                    <Row justify="center" style={{marginTop: 50}}>
                        <Col span={20} offset={2}>
                        <Carousel dotPosition='right'
                                  dots={false}
                                  arrows
                                  prevArrow={<Arrow type="icon-left" />}
                                  nextArrow={<Arrow type="icon-right" />}>
                            <div>
                                <Row justify="space-around">
                                    <Col span={4}>
                                        <Card
                                            hoverable
                                            style={{ width: 300 }}
                                            cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                        >
                                            <Meta description="music piece 1" />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Typography><Title level={3}>Rate Your Interests</Title></Typography>
                                        <div className="site-layout-background" style={{padding: 24, minHeight: 80}}/>
                                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>
                                                <IconFont type="icon-happy-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={2}>
                                                <IconFont type="icon-normal-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={3}>
                                                <IconFont type="icon-sad-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row justify="space-around">
                                    <Col span={4}>
                                        <Card
                                            hoverable
                                            style={{ width: 300 }}
                                            cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                        >
                                            <Meta description="music piece 2" />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Typography><Title level={3}>Rate Your Interests</Title></Typography>
                                        <div className="site-layout-background" style={{padding: 24, minHeight: 80}}/>
                                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>
                                                <IconFont type="icon-happy-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={2}>
                                                <IconFont type="icon-normal-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={3}>
                                                <IconFont type="icon-sad-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row justify="space-around">
                                    <Col span={4}>
                                        <Card
                                            hoverable
                                            style={{ width: 300 }}
                                            cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                        >
                                            <Meta description="music piece 3" />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Typography><Title level={3}>Rate Your Interests</Title></Typography>
                                        <div className="site-layout-background" style={{padding: 24, minHeight: 80}}/>
                                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>
                                                <IconFont type="icon-happy-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={2}>
                                                <IconFont type="icon-normal-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={3}>
                                                <IconFont type="icon-sad-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                        </Radio.Group>
                                    </Col>
                                </Row>
                            </div>
                            <div>
                                <Row justify="space-around">
                                    <Col span={4}>
                                        <Card
                                            hoverable
                                            style={{ width: 300 }}
                                            cover={<img alt="example" src="https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228" />}
                                        >
                                            <Meta description="music piece 4" />
                                        </Card>
                                    </Col>
                                    <Col span={12}>
                                        <Typography><Title level={3}>Rate Your Interests</Title></Typography>
                                        <div className="site-layout-background" style={{padding: 24, minHeight: 80}}/>
                                        <Radio.Group onChange={this.onChange} value={this.state.value}>
                                            <Radio value={1}>
                                                <IconFont type="icon-happy-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={2}>
                                                <IconFont type="icon-normal-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                            <Radio value={3}>
                                                <IconFont type="icon-sad-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                            </Radio>
                                        </Radio.Group>
                                        <div className="site-layout-background" style={{padding: 24, marginTop: 80}}>
                                            <Button style={{float: "right"}} size={"large"}>Finish</Button>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Carousel>
                        </Col>
                    </Row>
                </Content>
                <Footer style={{marginTop: 80, textAlign: 'center'}}>
                     CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Interest;