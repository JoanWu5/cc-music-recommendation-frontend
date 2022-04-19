import React from 'react';
import {Layout, Typography, Row, Col, Steps, Button, Checkbox, Divider} from "antd";
import Navigator from "./Navigator";
import { Pie, G2, Line } from '@ant-design/plots';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Step } = Steps;

const G = G2.getEngine('canvas');

const languageData = [
    {
        type: 'English',
        value: 0.75,
    },
    {
        type: 'Chinese',
        value: 0.1,
    },
    {
        type: 'Japanese',
        value: 0.1,
    },
    {
        type: 'Other',
        value: 0.05,
    },
];

const languageCfg = {
    appendPadding: 10,
    data: languageData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    height: 150,
    label: {
        type: 'spider',
        labelHeight: 40,
        formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
                type: 'circle',
                attrs: {
                    x: 0,
                    y: 0,
                    width: 40,
                    height: 50,
                    r: 5,
                    fill: mappingData.color,
                },
            });
            group.addShape({
                type: 'text',
                attrs: {
                    x: 10,
                    y: 8,
                    text: `${data.type}`,
                    fill: mappingData.color,
                },
            });
            group.addShape({
                type: 'text',
                attrs: {
                    x: 0,
                    y: 25,
                    text: `${data.percent * 100}%`,
                    fill: 'rgba(0, 0, 0, 0.65)',
                    fontWeight: 700,
                },
            });
            return group;
        },
    },
    interactions: [
        {
            type: 'element-selected',
        },
        {
            type: 'element-active',
        },
    ],
};

const loudnessData = [
    {
        "timePeriod": "30",
        "value": 1
    },
    {
        "timePeriod": "40",
        "value": 2
    },
    {
        "timePeriod": "50",
        "value": 0.5
    }
]

const loudnessCfg = {
    data: loudnessData,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
        range: [0, 1],
    },
    height: 150,
    width: 200,
    autoFit: false,
    smooth: true,
};

const releaseData = [
    {
        "timePeriod": "80",
        "value": 0.5
    },
    {
        "timePeriod": "90",
        "value": 2
    },
    {
        "timePeriod": "95",
        "value": 1
    },
    {
        "timePeriod": "00",
        "value": 0.5
    }
]

const releaseCfg = {
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
};

const keyData = [
    {
        type: 'A-B',
        value: 0.1,
    },
    {
        type: 'C-D',
        value: 0.5,
    },
    {
        type: 'E-F',
        value: 0.2,
    },
    {
        type: 'Other',
        value: 0.2,
    },
];

const keyCfg = {
    appendPadding: 10,
    data: keyData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    legend: false,
    height: 200,
    label: {
        type: 'spider',
        labelHeight: 40,
        formatter: (data, mappingData) => {
            const group = new G.Group({});
            group.addShape({
                type: 'circle',
                attrs: {
                    x: 0,
                    y: 0,
                    width: 40,
                    height: 50,
                    r: 5,
                    fill: mappingData.color,
                },
            });
            group.addShape({
                type: 'text',
                attrs: {
                    x: 10,
                    y: 8,
                    text: `${data.type}`,
                    fill: mappingData.color,
                },
            });
            group.addShape({
                type: 'text',
                attrs: {
                    x: 0,
                    y: 25,
                    text: `${data.percent * 100}%`,
                    fill: 'rgba(0, 0, 0, 0.65)',
                    fontWeight: 700,
                },
            });
            return group;
        },
    },
    interactions: [
        {
            type: 'element-selected',
        },
        {
            type: 'element-active',
        },
    ],
};

function checkboxOnChange(checkedValues) {
    console.log('checked = ', checkedValues);
}

const options = [
    { label: 'English', value: 'English' },
    { label: 'Nostalgic', value: 'Nostalgic' },
    { label: 'Loud', value: 'Loud' },
    { label: 'High-key', value: 'High-key' },
    { label: 'Dance', value: 'Dance' },
    { label: 'Passionate', value: 'Passionate' },
    { label: 'Acoustic', value: 'Acoustic' }
];

const steps = [
    {
        title: 'General Report',
        content:
            <Typography>
                <Row justify="center" align={"middle"} style={{marginTop: 20, minHeight: 30}}>
                    <Col span={10}><Title level={4}>Most of the songs you like are in </Title></Col>
                    <Col span={4}><Title level={2} type={"danger"}><b>English</b></Title></Col>
                </Row>
                <Row justify="left" align={"middle"} style={{minHeight: 30}}>
                    <Col span={4}><Title level={3}>You have a </Title></Col>
                    <Col span={6}><Title level={2} type={"warning"}><b>Nostalgic</b></Title></Col>
                    <Col span={2}><Title level={3}>soul</Title></Col>
                </Row>
                <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                    <Col span={4}><Title level={3}>You are so </Title></Col>
                    <Col span={6}><Title level={2} type={"success"}><b>Passionate</b></Title></Col>
                    <Col span={10}><Title level={3}>, you enjoy loudness between</Title></Col>
                    <Col span={4}><Title level={3} type={"success"}><b>50~70dB</b></Title></Col>
                </Row>
                <Row justify="left" align={"middle"} style={{minHeight: 30}}>
                    <Col span={6}><Title level={3}>You are such a </Title></Col>
                    <Col span={4}><Title level={2} type={"success"}><b>High-key</b></Title></Col>
                    <Col span={10}><Title level={3}>person, you enjoy Keys between</Title></Col>
                    <Col span={2}><Title level={2} type={"success"}><b>C~D</b></Title></Col>
                </Row>
                <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                    <Col span={10}><Title level={3}>Most song you like has high</Title></Col>
                    <Col span={8}><Title level={2} type={"warning"}><b>danceability</b></Title></Col>
                </Row>
                <Row justify="center" align={"middle"} style={{minHeight: 30}}>
                    <Col span={6}><Title level={3}>You're an </Title></Col>
                    <Col span={4}><Title level={2} type={"danger"}><b>acoustic</b></Title></Col>
                    <Col span={2}><Title level={3}>lover</Title></Col>
                </Row>
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
                <Col span={12}>
                    <Pie {...keyCfg} />
                    <Text>Key</Text>
                </Col>
            </Row>
            <Row justify={"center"} align={"middle"}>
                <Col span={12}>
                    <Pie {...languageCfg} />
                    <Text>Language</Text>
                </Col>
                <Col span={12}>
                    <Line {...loudnessCfg}/>
                    <Text>Loudness</Text>
                </Col>
            </Row>
            <Row justify={"center"} align={"middle"} style={{marginTop: 20}} >
                <Col span={4}><Text>Acoustic Level:</Text></Col>
                <Col span={4}><Title level={2} type={"danger"}><b>95%</b></Title></Col>
                <Col span={4}><Text>Danceability:</Text></Col>
                <Col span={4}><Title level={2} type={"warning"}><b>95%</b></Title></Col>
            </Row>
        </div>
    },
];

class Report extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0
        }
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.ShowCheckbox = this.ShowCheckbox.bind(this);
    }

    next() {
        this.setState({current: this.state.current + 1});
    };

    previous() {
        this.setState({current: this.state.current - 1});
    };

    ShowCheckbox() {
        if (this.state.current === 0) {
            return <div>
                <Divider style={{marginTop: 80}}/>
                <Row align={"middle"} justify={"center"}>
                    <Col span={10}>
                        <Checkbox.Group options={options} defaultValue={['Passionate', 'Nostalgic']}
                                        onChange={checkboxOnChange}/>
                    </Col>
                    <Col span={4}>
                        <Button size={"middle"}>Get More Selected Recommendation</Button>
                    </Col>
                </Row>
            </div>;
        }
    }

    render() {
        return (
            <Layout style={{height:"100vh"}}>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%', height: '80px'}}>
                    <Navigator deafultSelectedKey={"report"}/>
                </Header>
                <Content className="site-layout" style={{minHeight: 300, padding: '0 50px', marginTop: 80}}>
                    <Col span={16} offset={4}>
                        <Steps current={this.state.current} style={{marginTop: 20}}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
                            ))}
                        </Steps>
                        <div className="steps-content">{steps[this.state.current].content}</div>
                        <div className="steps-action">
                            {this.state.current < steps.length - 1 && (
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
                </Content>
                <Footer style={{textAlign: 'center', marginTop: 80}}>
                     CC6998©2022 Created by Chen Li/Chaofan Wang/Danmei Wu/Zipei Jiang
                </Footer>
            </Layout>
        );
    }
}

export default Report;