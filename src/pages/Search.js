import {Layout, Row, Col, Card, message, Pagination, Spin, Space, Button} from 'antd';
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

class Search extends React.Component {
    componentDidMount() {
        this.setState({userId: localStorage.getItem("userId")});
        this.setState({isLoggedIn:
                this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== ""});
        if (this.state.params && this.state.params !== "") {
            this.getQueryParams();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.params !== prevState.params) {
            this.getQueryParams();
        }
        if (this.state.query !== prevState.query || this.state.page !== prevState.page) {
            this.onSearch();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            searchData: [],
            searchCount: -1,
            params: window.location.href.split('?')[1],
            query: "",
            page: 1,
            userId: localStorage.getItem("userId"),
            isLoggedIn: false
        }
        this.onSearch = this.onSearch.bind(this);
        this.getQueryParams = this.getQueryParams.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showLikeIcon = this.showLikeIcon.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
    }

    onSearch() {
        if (this.state.query === "") {
            message.error("Please input the search content!");
            return;
        }
        // console.log(value);
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/search?q=" + this.state.query +
            "&page=" + this.state.page)
            .then(data => {
                // console.log(data);
                const message = data.data.message;
                if (!data.statusOk) {
                    throw new Error(message);
                }
                this.setState({searchData: data.data.music});
                this.setState({searchCount: data.data.count});
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getQueryParams() {
        if (this.state.params && this.state.params !== '') {
            const result = this.state.params.split('&').reduce(function (res, item) {
                const parts = item.split('=');
                res[parts[0]] = parts[1];
                return res;
            }, {});
            console.log("query", result);
            if ("q" in result){
                this.setState({query: result["q"]});
            }
            if ("page" in result) {
                this.setState({page: parseInt(result["page"])})
            }
        }
    }

    onChange(pageNumber) {
        // console.log('Page: ', pageNumber);
        this.setState({page: parseInt(pageNumber)});
    }

    showLikeIcon(index) {
        const like = this.state.searchData[index].like
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

        // console.log(this.state.searchData[i].like);

        likeData.music.push({
            musicId: this.state.searchData[i].musicId,
            like: 1 - this.state.searchData[i].like
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
                let items = [...this.state.searchData];
                items[item].like = 1 - items[item].like;
                this.setState({searchData: items});
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
                    <Navigator deafultSelectedKey={"search"}/>
                </Header>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64, minHeight: "70vh"}}>
                    {this.state.searchCount === -1 && <Spin style={{marginTop: 100}}/>}
                    {this.state.searchCount !== -1 && <Row justify="center" style={{marginTop: 50}}>
                        <Col span={20}>
                            <Card>
                                {this.state.searchData.map((item, i) => (
                                    <Card.Grid style={gridStyle} key={item.musicId}>
                                        <Card
                                            style={{ width: '100%', padding:10 }}
                                            cover={<img alt="example" src={item.imageUrl} />}
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
                            <Pagination style={{marginTop: 50}}
                                showQuickJumper showSizeChanger={false}
                                        pageSize={12}
                                        defaultCurrent={1} total={this.state.searchCount}
                                        onChange={this.onChange}/>
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

export default Search;