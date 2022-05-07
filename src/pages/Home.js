import {Layout, Row, Col, Card, message, Spin, Space, Button} from 'antd';
import React from 'react';
import Navigator from "./Navigator";
import AliIconFont from "./Icon";

const IconFont = AliIconFont;
const {Header, Content, Footer} = Layout;
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

function interpretReportStatistics(reportData) {
    let queryList = [];

    if (reportData.key <= 4) {
        queryList.push("max_key=4");
    } else if (reportData.key >= 8) {
        queryList.push("min_key=8");
    }

    if (reportData.acousticness >= 0.8) {
        queryList.push("min_acousticness=0.8");
    }

    if (reportData.danceability >= 0.8) {
        queryList.push("min_danceability=0.8");
    }

    if (reportData.energy >= 0.8) {
        queryList.push("min_energy=0.8");
    }

    if (reportData.liveness >= 0.8) {
        queryList.push("min_liveness=0.8");
    }

    if (reportData.speechiness >= 0.66) {
        queryList.push("min_speechiness=0.66");
    } else if (reportData.speechiness >= 0.33) {
        queryList.push("min_speechiness=0.33");
        queryList.push("max_speechiness=0.66");
    }

    if (reportData.valence >= 0.66) {
        queryList.push("min_valence=0.66");
    } else if (reportData.valence <= 0.33) {
        queryList.push("max_speechiness=0.33");
    }

    if (queryList.length === 0) {
        queryList.push("min_popularity=50");
    }

    return queryList.join(",");
}

class Home extends React.Component {
    componentDidMount() {
        this.setState({userId: localStorage.getItem("userId")});
        this.setState({isLoggedIn:
                this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== ""});
        this.getStatistics();
        // this.getMoreRecommendation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.userId !== prevState.userId) {
            this.setState({isLoggedIn:
                    this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== ""});
        }

        if (this.state.isLoggedIn !== prevState.isLoggedIn) {
            this.getReportData();
        }

        if (this.state.reportData !== prevState.reportData) {
            // console.log("change report data");
            this.getStatistics();
        }

        if (this.state.query !== prevState.query) {
            // console.log("change query data");
            // console.log(this.state.query);
            this.getMoreRecommendation();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            isLoggedIn: false,
            recommendationData: null,
            query: "",
            reportData: null
        }
        this.getReportData = this.getReportData.bind(this);
        this.showLikeIcon = this.showLikeIcon.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.getMoreRecommendation = this.getMoreRecommendation.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
    }

    getReportData() {
        if (!this.state.isLoggedIn) {
            this.setState({reportData: null});
            return;
        }
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/report/" + this.state.userId)
            .then(data => {
                // console.log(data);
                const message = data.data.message;
                if (!data.statusOk) {
                    throw new Error(message);
                }
                this.setState({reportData: data.data});
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
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

    getMoreRecommendation() {
        if (this.state.query === "") {
            return;
        }
        let url = "https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/morerecom?";
        if (this.state.isLoggedIn) {
            url += "userId=" + this.state.userId + "&q=" + this.state.query
        } else {
            url += "q=" + this.state.query
        }
        getData(url)
            .then(data => {
                // console.log(data);
                const message = data.data.message;
                if (!data.statusOk) {
                    throw new Error(message);
                }
                if (data.data.count > 12) {
                    this.setState({recommendationData: data.data.music.slice(0, 12)});
                } else {
                    this.setState({recommendationData: data.data.music});
                }
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getStatistics() {
        if (!this.state.isLoggedIn) {
            this.setState({query: "min_popularity=50"});
        } else {
            if (this.state.reportData !== null) {
                this.setState({query: interpretReportStatistics(this.state.reportData)});
            }
        }
    }

    render() {
        return (
            <Layout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"home"}/>
                </Header>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64, minHeight: "70vh"}}>
                    {this.state.recommendationData === null && <Spin style={{marginTop: 100}}/>}
                    {this.state.recommendationData !== null && <Row justify="center" style={{marginTop: 100}}>
                        <Col span={20}>
                            <Card>
                                {this.state.recommendationData.map((item, i) => (
                                    <Card.Grid style={gridStyle} key={item.musicId}>
                                        <Card
                                            style={{ width: '100%', padding:10 }}
                                            cover={<img alt="example" src={item.imageUrl} style={{height: 250}}/>}
                                        >
                                            <Meta title={item.musicName} description={item.artistName} />
                                            <Space align="center">
                                                {this.state.isLoggedIn &&
                                                    <Button shape="circle" size="large"
                                                            icon={this.showLikeIcon(i)}
                                                            onClick={(e) => this.onLikeClick(i, e)}>
                                                    </Button>
                                                }
                                                <video controls autoPlay={false}>
                                                    <source src={item.musicUrl} type="audio/mpeg"/>
                                                </video>
                                            </Space>
                                        </Card>
                                    </Card.Grid>
                                ))}
                            </Card>
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

export default Home;