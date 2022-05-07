import React from 'react';
import Navigator from "./Navigator";
import {Layout, Row, Col, Card, Button, message, Spin, Space} from "antd";
import AliIconFont from "./Icon";
import {useLocation} from "react-router-dom";

const IconFont = AliIconFont;
const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const gridStyle = {
    width: '25%',
    padding: 10,
    border: 0
};

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

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        return (
            <Component location={location}
                {...props}
            />
        );
    }

    return ComponentWithRouterProp;
}

class Recommendation extends React.Component {
    componentDidMount() {
        if (this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== "") {
            if (this.props.location && this.props.location.state) {
                this.setState({fromReport: this.props.location.state.fromReport})
            } else {
                this.setState({fromReport: false})
            }
            // this.getRecommendationData();
        } else {
            message.error("Please Login First!");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.fromReport !== prevState.fromReport) {
            this.getRecommendationData();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            recommendationData: null,
            userId: localStorage.getItem("userId"),
            fromReport: null
        }
        this.getRecommendationData = this.getRecommendationData.bind(this);
        this.getAnotherRecommendationData = this.getAnotherRecommendationData.bind(this);
        this.showLikeIcon = this.showLikeIcon.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
    }

    getRecommendationData() {
        // console.log(this.state.fromReport);
        if (this.state.fromReport===true) {
            this.setState({recommendationData: this.props.location.state.recommendationData});
            // this.setState({fromReport: false});
            return;
        }
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/recommendation/" + this.state.userId)
            .then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            if (data.data.music.length > 12) {
                this.setState({recommendationData: data.data.music.slice(0, 12)});
            } else {
                this.setState({recommendationData: data.data.music});
            }
        }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getAnotherRecommendationData() {
        this.setState({recommendationData: null});
        this.setState({fromReport: false})
        this.getRecommendationData();
    }

    showLikeIcon(index) {
        const like = this.state.recommendationData[index].like
        if (like === 1) {
            return <IconFont type="icon-like" style={{fontSize: '40px', padding: '10px 10px 0px'}}/>;
        } else {
            return <IconFont type="icon-like-o" style={{fontSize: '40px', padding: '10px 10px 0px'}}/>;
        }
    }

    onLikeClick(i, e) {
        if (e.currentTarget === e.target) {
            return;
        }

        // console.log('focused child', i);

        let likeData = {
            "music": [],
        }

        // console.log(this.state.recommendationData[i].like);

        likeData.music.push({
            musicId: this.state.recommendationData[i].musicId,
            like: 1 - this.state.recommendationData[i].like
        })

        submitForm("POST", "https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/interest/" +
            this.state.userId,
            likeData)
            .then(data => {
                // console.log(data);
                const dataMessage = data.data.message;
                if (!data.statusOk) {
                    throw new Error(dataMessage);
                }
                const item = parseInt(i);
                let items = [...this.state.recommendationData];
                items[item].like = 1 - items[item].like;
                this.setState({recommendationData: items});
                // message.success(dataMessage);
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"recom"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: "75vh", padding: '0 50px', marginTop: 50}}>
                    {this.state.recommendationData === null && <Spin style={{marginTop: 100}}/>}
                    {this.state.recommendationData !== null && <Row justify={"space-around"} align={"middle"} style={{marginTop: 50}}>
                        <Col span={20}>
                            <Card>
                                {this.state.recommendationData.map((item, i) => (
                                    <Card.Grid style={gridStyle} key={item.musicId}>
                                        <Card
                                            style={{ width: '100%' }}
                                            cover={<img alt="example" src={item.imageUrl} />}
                                        >
                                            <Meta title={item.musicName} description={item.artistName} />
                                            <Space align="center">
                                                <Button shape="circle" size="large"
                                                        icon={this.showLikeIcon(i)}
                                                        onClick={(e) => this.onLikeClick(i, e)}>
                                                </Button>
                                                <video controls autoPlay={false}>
                                                    <source src={item.musicUrl} type="audio/mpeg"/>
                                                </video>
                                            </Space>
                                        </Card>
                                    </Card.Grid>
                                ))}
                            </Card>
                            <Button style={{float: "left", marginTop: 20}} size={"large"}
                                    onClick={this.getAnotherRecommendationData}>
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

export default withRouter(Recommendation);