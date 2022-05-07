import React from 'react';
import {Button, Card, Col, message, Pagination, Row, Space, Spin, Typography} from "antd";
import AliIconFont from "./Icon";

const IconFont = AliIconFont;
const { Title } = Typography
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

class LikeList extends React.Component {
    componentDidMount() {
        if (this.state.userId === null || this.state.userId === undefined || this.state.userId === "") {
            message.error("Please Login First!");
        } else {
            this.getLikeData();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.page !== prevState.page) {
            this.getLikeData();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: localStorage.getItem("userId"),
            likeData: null,
            likeCount: -1,
            page: 1
        }
        this.showLikeIcon = this.showLikeIcon.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.getLikeData = this.getLikeData.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    showLikeIcon(index) {
        const like = this.state.likeData[index].like
        if (like === 1) {
            return <IconFont type="icon-like" style={{fontSize: '30px', padding: '10px 10px 0px'}}/>;
        } else {
            return <IconFont type="icon-like-o" style={{fontSize: '30px', padding: '10px 10px 0px'}}/>;
        }
    }

    onChange(pageNumber) {
        // console.log('Page: ', pageNumber);
        this.setState({page: parseInt(pageNumber)});
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
            musicId: this.state.likeData[i].musicId,
            like: 1 - this.state.likeData[i].like
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
                let items = [...this.state.likeData];
                items[item].like = 1 - items[item].like;
                this.setState({likeData: items});
                // message.success(dataMessage);
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getLikeData() {
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/like/" + this.state.userId +
            "&page=" + this.state.page)
            .then(data => {
                // console.log(data);
                const message = data.data.message;
                if (!data.statusOk) {
                    throw new Error(message);
                }
                this.setState({likeData: data.data.music});
                this.setState({likeCount: data.data.count});
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    render() {
        return (
            <div>
                {(this.state.likeData === null || this.state.likeCount === -1) && <Spin style={{marginTop: 100}}/>}
                {this.state.likeData !== null && this.state.likeCount !== -1 &&
                    <div>
                        <Row justify="center" style={{marginTop: 50, minHeight: 50}}>
                            <Typography><Title>Liked Songs</Title></Typography>
                        </Row>
                        <Row justify={"space-around"} align={"middle"}>
                            <Col span={24}>
                                <Card>
                                    {this.state.likeData.map((item, i) => (
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
                                <Pagination style={{marginTop: 50}}
                                            showQuickJumper showSizeChanger={false}
                                            pageSize={12}
                                            defaultCurrent={1} total={this.state.likeCount}
                                            onChange={this.onChange}/>
                            </Col>
                        </Row>
                    </div>
                }
            </div>
        )
    }
}

export default LikeList;