import React from 'react';
import {Button, Checkbox, Col, Divider, Layout, message, Row, Spin, Steps, Typography} from "antd";
import Navigator from "./Navigator";
import {Line} from '@ant-design/plots';
import {Navigate} from "react-router-dom";

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;

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

function getReleaseCfg(releaseData) {
    return {
        data: releaseData,
        xField: 'timePeriod',
        yField: 'value',
        xAxis: {
            range: [0, 1],
        },
        height: 100,
        width: 300,
        autoFit: false,
        smooth: true,
    }
}

function getKeyDescription(key) {
    let description = {
        "hasKey": true,
        "range": null,
        "favor": "Normal"
    }
    if (key === -1) {
        description.hasKey = true;
        return description;
    }
    if (key <= 2) {
        description.range = "C~D";
        description.favor = "Low";
    } else if (key <= 4) {
        description.range = "D~E";
        description.favor = "Low";
    } else if (key <= 5) {
        description.range = "E~F";
    } else if (key <= 7) {
        description.range = "F~G";
    } else if (key <= 9) {
        description.range = "G~A";
        description.favor = "High";
    } else if (key <= 11) {
        description.range = "A~C";
        description.favor = "High";
    }
    return description;
}

function getAcousticnessDescription(acousticness) {
    let description = {
        "Acoustic": false
    }
    if (acousticness >= 0.8) {
        description.Acoustic = true;
    }
    return description;
}

function getDanceabilityDescription(danceability) {
    let description = {
        "Danceability": false,
    }
    if (danceability >= 0.8) {
        description.Danceability = true;
    }
    return description;
}

function getEnergyDescription(energy) {
    let description = {
        "Passionate": false
    }
    if (energy >= 0.8) {
        description.Passionate = true;
    }
    return description;
}

function getLivenessDescription(liveness) {
    let description = {
        "Live": false
    }
    if (liveness >= 0.8) {
        description.Live = true;
    }
    return description;
}

function getSpeechinessDescription(speechiness) {
    let description = {
        "speech": false,
        "rap": false,
    }
    if (speechiness >= 0.66) {
        description.speech = true;
    } else if (speechiness >= 0.33) {
        description.rap = true;
    }
    return description;
}

function getValenceDescription(valence) {
    let description = {
        "mood": "normal"
    }
    if (valence >= 0.66) {
        description.mood = "cheerful";
    } else if (valence <= 0.33) {
        description.mood = "depressed";
    }
    return description;
}

function getReleaseDescription(releaseList) {
    let averageYear = 0;
    const count = releaseList.length;
    const nostalgicYear = 2022 - 60;
    let description = {
        "Nostalgic": false,
    }

    for (const release of releaseList) {
        averageYear += parseInt(release.timePeriod) * release.value;
    }
    averageYear = averageYear/count;
    if (averageYear <= nostalgicYear) {
        description.Nostalgic = true;
    }
    return description;
}

function checkboxOnChange(checkedValues) {
    console.log('checked = ', checkedValues);
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

class Report extends React.Component {
    componentDidMount() {
        if (this.state.userId !== null && this.state.userId !== undefined && this.state.userId !== "") {
            this.getReportData();
            if (this.state.reportData !== null) {
                this.setState({releaseData: this.getReleaseData(this.state.reportData.release)});
                this.setState({steps: this.getSteps()});
                this.getStatistics();
            }
        } else {
            message.error("Please Login First!");
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // Typical usage (don't forget to compare props):
        if (this.state.reportData !== prevState.reportData) {
            this.setState({releaseData: this.getReleaseData(this.state.reportData.release)});
            this.setState({steps: this.getSteps()});
            this.getStatistics();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            reportData: null,
            releaseData: [],
            steps: [],
            options: [],
            userId: localStorage.getItem("userId"),
            query: "",
            moreRec: false,
            recommendationData: null
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.ShowCheckbox = this.ShowCheckbox.bind(this);
        this.getReportData = this.getReportData.bind(this);
        this.getSteps = this.getSteps.bind(this);
        this.getReleaseData = this.getReleaseData.bind(this);
        this.getMoreRecommendation = this.getMoreRecommendation.bind(this);
        this.getStatistics = this.getStatistics.bind(this);
    }

    next() {
        this.setState({current: this.state.current + 1});
    };

    previous() {
        this.setState({current: this.state.current - 1});
    };

    ShowCheckbox() {
        if (this.state.current === 0 && this.state.options.length !== 0) {
            return <div>
                <Divider style={{marginTop: 80}}/>
                <Row align={"middle"} justify={"center"}>
                    <Col span={10}>
                        <Checkbox.Group options={this.state.options}
                                        onChange={checkboxOnChange}/>
                    </Col>
                    <Col span={4}>
                        <Button size={"middle"} onClick={this.getMoreRecommendation}>
                            Get More Selected Recommendation
                        </Button>
                    </Col>
                </Row>
            </div>;
        }
    }

    getMoreRecommendation() {
        let url = "https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/morerecom?userId="
            + this.state.userId + "&q=" + this.state.query;
        getData(url)
            .then(data => {
                // console.log(data);
                const message = data.data.message;
                if (!data.statusOk) {
                    throw new Error(message);
                }
                this.setState({moreRec: true});
                this.setState({recommendationData: data.data.music});
            }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getStatistics() {
        if (this.state.reportData !== null) {
            this.setState({query: interpretReportStatistics(this.state.reportData)});
        }
    }

    getReportData() {
        getData("https://jdxo4zd1i6.execute-api.us-east-1.amazonaws.com/test/report/" + this.state.userId)
            .then(data => {
            // console.log(data);
            const message = data.data.message;
            if (!data.statusOk) {
                throw new Error(message);
            }
            this.setState({reportData: data.data});
            this.setState({releaseData: this.getReleaseData(data.data.release)});
            this.setState({steps: this.getSteps()})
        }).catch((error) => {
            console.error('Error:', error);
            message.error(error.message);
        });
    }

    getReleaseData(release) {
        let releaseList = [];
        for (const m in release) {
            if (release[m] === 0) {
                continue;
            }
            releaseList.push({
                "timePeriod": m,
                "value": release[m]
            })
        }
        return releaseList
    }

    getSteps() {
        if (this.state.reportData === null) {
            return []
        }
        // console.log(this.state.reportData);
        const releaseDescription = getReleaseDescription(this.state.releaseData);
        const keyDescription = getKeyDescription(this.state.reportData.key);
        const acousticnessDescription = getAcousticnessDescription(this.state.reportData.acousticness);
        const danceabilityDescription = getDanceabilityDescription(this.state.reportData.danceability);
        const energyDescription = getEnergyDescription(this.state.reportData.energy);
        const livenessDescription = getLivenessDescription(this.state.reportData.liveness);
        const speechinessDescription = getSpeechinessDescription(this.state.reportData.speechiness);
        const valenceDescription = getValenceDescription(this.state.reportData.valence);
        const releaseCfg = getReleaseCfg(this.state.releaseData);

        let checkboxOptions = [];

        if (releaseDescription.Nostalgic) {
            checkboxOptions.push({
                "label": "Nostalgic",
                "value": "Nostalgic"
            })
        }

        if (energyDescription.Passionate) {
            checkboxOptions.push({
                "label": "Passionate",
                "value": "Passionate"
            })
        }

        if (keyDescription.hasKey && keyDescription.favor !== "Normal") {
            checkboxOptions.push({
                "label": keyDescription.favor + "-Key",
                "value": keyDescription.favor + "-Key"
            })
        }

        if (valenceDescription.mood !== "normal") {
            checkboxOptions.push({
                "label": valenceDescription.mood + "music",
                "value": valenceDescription.mood + "music"
            })
        }

        if (danceabilityDescription.Danceability) {
            checkboxOptions.push({
                "label": "Danceability",
                "value": "Danceability"
            })
        }

        if (speechinessDescription.rap) {
            checkboxOptions.push({
                "label": "RAP",
                "value": "RAP"
            })
        }

        if (acousticnessDescription.Acoustic) {
            checkboxOptions.push({
                "label": "Acoustic",
                "value": "Acoustic"
            })
        }

        if (livenessDescription.Live) {
            checkboxOptions.push({
                "label": "Live",
                "value": "Live"
            })
        }

        this.setState({options: checkboxOptions})

        return [
            {
                title: 'General Report',
                content:
                    <Typography>
                        <Row justify="center" align={"middle"} style={{marginTop: 20, minHeight: 30}}>
                            <Col span={10}><Title level={4}>Most of the songs you like are in </Title></Col>
                            <Col span={4}><Title level={2} type={"danger"}><b>English</b></Title></Col>
                        </Row>
                        {releaseDescription.Nostalgic && (
                            <Row justify="left" align={"middle"} style={{marginTop: 20, minHeight: 30}}>
                                <Col span={4}><Title level={3}>You have a </Title></Col>
                                <Col span={6}><Title level={2} type={"warning"}><b>Nostalgic</b></Title></Col>
                                <Col span={2}><Title level={3}>soul</Title></Col>
                            </Row>
                        )}
                        {energyDescription.Passionate && (
                            <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                                <Col span={4}><Title level={3}>You are so </Title></Col>
                                <Col span={6}><Title level={2} type={"success"}><b>Passionate</b></Title></Col>
                            </Row>
                        )}
                        {keyDescription.hasKey && keyDescription.favor !== "Normal" && (
                            <Row justify="left" align={"middle"} style={{minHeight: 30}}>
                                <Col span={6}><Title level={3}>You are such a </Title></Col>
                                <Col span={4}><Title level={2} type={"success"}><b>{keyDescription.favor}-key</b></Title></Col>
                                <Col span={10}><Title level={3}>person, you enjoy Keys between</Title></Col>
                                <Col span={2}><Title level={2} type={"success"}><b>{keyDescription.range}</b></Title></Col>
                            </Row>
                        )}
                        {valenceDescription.mood !== "normal" && (
                            <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                                <Col span={4}><Title level={3}>Most songs you like are </Title></Col>
                                <Col span={6}><Title level={2} type={"success"}><b>valenceDescription.mood</b></Title></Col>
                            </Row>
                        )}
                        {danceabilityDescription.Danceability && (
                            <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                                <Col span={10}><Title level={3}>Most songs you like has high</Title></Col>
                                <Col span={8}><Title level={2} type={"warning"}><b>danceability</b></Title></Col>
                            </Row>
                        )}
                        {speechinessDescription.rap && (
                            <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                                <Col span={10}><Title level={3}>Most songs you like are</Title></Col>
                                <Col span={8}><Title level={2} type={"warning"}><b>RAP</b></Title></Col>
                            </Row>
                        )}
                        {acousticnessDescription.Acoustic && (
                            <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                                <Col span={6}><Title level={3}>You're an </Title></Col>
                                <Col span={4}><Title level={2} type={"danger"}><b>acoustic</b></Title></Col>
                                <Col span={2}><Title level={3}>lover</Title></Col>
                            </Row>
                        )}
                        {livenessDescription.Live && (
                            <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                                <Col span={6}><Title level={3}>You enjoy the </Title></Col>
                                <Col span={4}><Title level={2} type={"danger"}><b>Live</b></Title></Col>
                                <Col span={2}><Title level={3}>music</Title></Col>
                            </Row>
                        )}
                    </Typography>
            },
            {
                title: 'Full Data Report',
                content:
                    <div className="site-layout-background" style={{minHeight: 200}}>
                        <Row justify={"center"} align={"middle"}>
                            <Col span={12}>
                                <Line {...releaseCfg}/>
                                <Text>Release</Text>
                            </Col>
                        </Row>
                        <Row justify={"center"} align={"middle"} style={{marginTop: 20}}>
                            <Col span={4}><Text>Acoustic Level:</Text></Col>
                            <Col span={4}><Title level={2} type={"danger"}><b>{this.state.reportData.acousticness.toFixed(2) * 100}%</b></Title></Col>
                            <Col span={4}><Text>Danceability:</Text></Col>
                            <Col span={4}><Title level={2} type={"warning"}><b>{this.state.reportData.danceability.toFixed(2) * 100}%</b></Title></Col>
                        </Row>
                        <Row justify={"center"} align={"middle"} style={{marginTop: 20}}>
                            <Col span={4}><Text>Liveness Level:</Text></Col>
                            <Col span={4}><Title level={2} type={"danger"}><b>{this.state.reportData.liveness.toFixed(2) * 100}%</b></Title></Col>
                            <Col span={4}><Text>Loudness:</Text></Col>
                            <Col span={4}><Title level={2} type={"warning"}><b>{this.state.reportData.loudness.toFixed(0)}dB</b></Title></Col>
                        </Row>
                        <Row justify={"center"} align={"middle"} style={{marginTop: 20}}>
                            <Col span={4}><Text>Speechiness Level:</Text></Col>
                            <Col span={4}><Title level={2} type={"danger"}><b>{this.state.reportData.speechiness.toFixed(2) * 100}%</b></Title></Col>
                            <Col span={4}><Text>Valence:</Text></Col>
                            <Col span={4}><Title level={2} type={"warning"}><b>{this.state.reportData.valence.toFixed(2)}</b></Title></Col>
                        </Row>
                        <Row justify={"center"} align={"middle"} style={{marginTop: 20}}>
                            <Col span={4}><Text>Energetic Level:</Text></Col>
                            <Col span={4}><Title level={2} type={"danger"}><b>{this.state.reportData.energy.toFixed(2) * 100}%</b></Title></Col>
                            <Col span={4}><Text>Key:</Text></Col>
                            <Col span={4}><Title level={2} type={"warning"}><b>{this.state.reportData.key.toFixed(2)}</b></Title></Col>
                        </Row>
                    </div>
            },
        ]
    }

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                {this.state.moreRec && <Navigate to="/recommendation" replace={true} state={{fromReport: true,
                    recommendationData: this.state.recommendationData}}/>}
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"report"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: 300, padding: '0 50px', marginTop: 80}}>
                    {(this.state.reportData === null || this.state.steps.length === 0) && <Spin style={{marginTop: 100}}/>}
                    {this.state.reportData !== null && this.state.steps.length !== 0 && (<div>
                        <Col span={16} offset={4}>
                            <Steps current={this.state.current} style={{marginTop: 20}}>
                                {this.state.steps.map(item => (
                                    <Step key={item.title} title={item.title} />
                                ))}
                            </Steps>
                            <div className="steps-content">{this.state.steps[this.state.current].content}</div>
                            <div className="steps-action">
                                {this.state.current < this.state.steps.length - 1 && (
                                    <Button type="primary" size={"large"} onClick={() => this.next()} style={{float: "right"}}>
                                        See Full Data Report
                                    </Button>
                                )}
                                {this.state.current > 0 && (
                                    <Button size={"large"} style={{ float: "right" }} onClick={() => this.previous()}>
                                        See General Report
                                    </Button>
                                )}
                            </div>
                        </Col>
                        <this.ShowCheckbox />
                    </div>)}
                </Content>
                <Footer style={{textAlign: 'center', marginTop: 80}}>
                     CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Report;