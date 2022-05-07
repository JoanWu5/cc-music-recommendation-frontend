import {Layout, Row, Typography, Carousel, Card, Col, Radio, Button, message, Spin} from 'antd';
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

async function submitForm(method, url, data) {
    const response = await fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        body: JSON.stringify(data)
    });
    return {
        "statusOk": response.ok,
        "data": await response.json()
    };
}

class Interest extends React.Component {
    componentDidMount() {
        if (this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== "") {
            this.getInterestData();
            this.setState({values: this.initialRadioValues()});
            this.setState({carouselItems: this.getInterestItems()});
        } else {
            message.error("Please Login First!");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.interestData !== prevState.interestData) {
            this.setState({values: this.initialRadioValues()});
            this.setState({carouselItems: this.getInterestItems()});
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            values: [],
            interestData: null,
            interestCount: 0,
            carouselItems: [],
            userId: localStorage.getItem("userId")
        }
        this.onChange = this.onChange.bind(this);
        this.getInterestData = this.getInterestData.bind(this);
        this.initialRadioValues = this.initialRadioValues.bind(this);
        this.getInterestItems = this.getInterestItems.bind(this);
        this.sendInterestData = this.sendInterestData.bind(this);
    }

    onChange(e) {
        // console.log("radio checked", e);
        const radioGroupItem = parseInt(e.target.name);
        let items = [...this.state.values];
        items[radioGroupItem].value = e.target.value;
        this.setState({values: items});
    }

    getInterestData() {
        submitForm("GET", "https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/interest/" +
            this.state.userId)
            .then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            if (data.data.count > 5) {
                this.setState({interestData: data.data.music.slice(0, 5)});
                this.setState({interestCount: 5});
            } else {
                this.setState({interestData: data.data.music});
                this.setState({interestCount: data.data.count});
            }
        }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    initialRadioValues() {
        if (this.state.interestCount === 0) {
            return []
        }
        let initialValues = []
        for (let i = 0; i < this.state.interestCount; i++) {
            initialValues.push({
                id: i,
                value: 0
            })
        }
        return initialValues;
    }

    getInterestItems() {
        if (this.state.interestData === null) {
            return []
        }

        let contentList = [];
        for (let i = 0; i < this.state.interestCount; i++) {
            const interestItem = this.state.interestData[i];
            contentList.push({
                page: "page" + i.toString(),
                content:
                    <Row justify="space-around">
                        <Col span={4}>
                            <Card
                                hoverable
                                style={{ width: 300 }}
                                cover={<img alt="example1" src={interestItem.imageUrl}/>}
                            >
                                <Meta title={interestItem.artistName} description={interestItem.musicName} />
                                <video controls autoPlay={false}>
                                    <source src={interestItem.musicUrl} type="audio/mpeg"/>
                                </video>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Typography><Title level={3}>Rate Your Interests</Title></Typography>
                            <div className="site-layout-background" style={{padding: 24, minHeight: 80}}/>
                            <Radio.Group onChange={this.onChange} defaultValue={0} name={i.toString()}>
                                <Radio value={1}>
                                    <IconFont type="icon-happy-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                </Radio>
                                <Radio value={0}>
                                    <IconFont type="icon-normal-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                </Radio>
                                <Radio value={-1}>
                                    <IconFont type="icon-sad-l" style={{fontSize: '40px', padding: '15px 10px 0px'}}/>
                                </Radio>
                            </Radio.Group>
                            {i === this.state.interestCount -1 && <div className="site-layout-background" style={{padding: 24, marginTop: 80}}>
                                <Button style={{float: "right"}} size={"large"} onClick={this.sendInterestData}>Finish</Button>
                            </div>}
                        </Col>
                    </Row>
            })
        }
        return contentList
    }

    sendInterestData() {
        let testInterestData = {
            "music": [],
        }

        for (let i = 0; i < this.state.interestCount; i++) {
            testInterestData.music.push({
                musicId: this.state.interestData[i].musicId,
                like: this.state.values[i].value
            })
        }
        // console.log(testInterestData);
        submitForm("POST", "https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/interest/" +
            this.state.userId,
            testInterestData)
            .then(data => {
                // console.log(data);
                const dataMessage = data.data.message;
                if (!data.statusOk) {
                    throw new Error(dataMessage);
                }
                message.success(dataMessage);
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    render() {
        // console.log("interest", this.state.interestData);
        // console.log("values", this.state.values);
        // console.log("items", this.state.carouselItems);

        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"interest"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: 200, padding: '0 50px', marginTop: 80}}>
                    <Row justify="center" style={{marginTop: 50, minHeight: 50}}>
                        <Typography><Title>Test Your Music Interests</Title></Typography>
                    </Row>
                    {(this.state.interestData === null || this.state.carouselItems.length === 0 ||
                        this.state.values.length === 0) && <Spin style={{marginTop: 100}}/>}
                    {this.state.interestData !== null && this.state.carouselItems.length !== 0 &&
                        this.state.values.length !== 0 && <div>
                    <Row justify="center">
                        <Col span={20} offset={2}>
                        <Carousel dotPosition='right'
                                  dots={false}
                                  arrows
                                  prevArrow={<Arrow type="icon-left" />}
                                  nextArrow={<Arrow type="icon-right" />}>
                            {this.state.carouselItems.map(item => <div key={item.page}>{item.content}</div>)}
                        </Carousel>
                        </Col>
                    </Row>
                    </div>}
                </Content>
                <Footer style={{marginTop: 80, textAlign: 'center'}}>
                     CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Interest;