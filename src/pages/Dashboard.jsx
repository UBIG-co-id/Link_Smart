import React, { useState } from 'react'
import {
    Block,
    BlockHead,
    BlockBetween,
    BlockTitle,
    BlockHeadContent,
    BlockDes,
    Button,
    Icon,
    Row,
    Col,
    PreviewAltCard,
    TooltipComponent,
} from '../component/Component'
import Head from '../layout/Head'
import Content from '../layout/Content/Content'
import { DepositBarChart, WithdrawBarChart, BalanceBarChart } from '../component/invest/InvestChart'
import LineChart from '../component/chart/LineChart'
import Douchart from '../component/chart/Douchart'
import { doughnutChartData } from '../component/chart/ChartData'

const Dashboard = () => {
    const [sm, updateSm] = useState(false);
    return (
        <React.Fragment>
            <Head title="Dashboard" />
            <Content>
                <BlockHead size="sm">
                    <BlockBetween>
                        <BlockHeadContent>
                            <BlockTitle page>Dahsboard</BlockTitle>
                            <BlockDes className="text-soft">
                                <p>Welcome to Link Smart </p>
                            </BlockDes>
                        </BlockHeadContent>

                    </BlockBetween>
                </BlockHead>

                <Block>
                    <Row className="g-gs">
                        <Col md="4">
                            <PreviewAltCard className="card-full">
                                <div className="card-title-group align-start mb-0">
                                    <div className="card-title">
                                        <h6 className="subtitle">Total Siswa</h6>
                                    </div>
                                    <div className="card-tools">
                                        <TooltipComponent
                                            iconClass="card-hint"
                                            icon="help-fill"
                                            direction="left"
                                            id="invest-deposit"
                                            text="Total Deposited"
                                        ></TooltipComponent>
                                    </div>
                                </div>
                                <div className="card-amount">
                                    <span className="amount">
                                        10 <span className="currency currency-usd"></span>
                                    </span>
                                    <span className="change up text-success">
                                        {/* <Icon name="arrow-long-up"></Icon>1.93% */}
                                    </span>
                                </div>
                                <div className="invest-data">
                                    <div className="invest-data-amount g-2">
                                        <div className="invest-data-history">
                                            <br></br>
                                            <div className="title">Total Kehadiran
                                                <span className="change up text-success">
                                                    <Icon name="arrow-long-up"></Icon>1.93%
                                                </span>
                                            </div>
                                            {/* <span className="amount">
                                                2,940.59 <span className="currency currency-usd"> USD</span>
                                                
                                            </span> */}
                                        </div>
                                        {/* <div className="invest-data-history">
                                            <div className="title">This Week</div>
                                            <span className="amount">
                                                1,259.28 <span className="currency currency-usd"> USD</span>
                                            </span>
                                        </div> */}
                                    </div>
                                    {/* <div className="invest-data-ck">
                                        <DepositBarChart />
                                    </div> */}
                                </div>
                            </PreviewAltCard>
                        </Col>

                        <Col md="4">
                            <PreviewAltCard className="card-full">
                                <div className="card-title-group align-start mb-0">
                                    <div className="card-title">
                                        <h6 className="subtitle">Total Pegawai</h6>
                                    </div>
                                    <div className="card-tools">
                                        <TooltipComponent
                                            iconClass="card-hint"
                                            icon="help-fill"
                                            direction="left"
                                            id="invest-withdraw"
                                            text="Total Withdrawn"
                                        ></TooltipComponent>
                                    </div>
                                </div>
                                <div className="card-amount">
                                    <span className="amount">
                                        5 <span className="currency currency-usd"></span>
                                    </span>
                                    {/* <span className="change down text-danger">
                                        <Icon name="arrow-long-down"></Icon>1.93%
                                    </span> */}
                                </div>
                                <div className="invest-data">
                                    <div className="invest-data-amount g-2">
                                        <div className="invest-data-history">
                                            <br/>
                                            <div className="title">Total Kehadiran
                                            <span className="change down text-danger">
                                                <Icon name="arrow-long-down"></Icon>1.93%
                                            </span>
                                            </div>
                                            {/* <div className="amount">
                                                2,940.59 <span className="currency currency-usd">USD</span>
                                               
                                            </div> */}
                                        </div>
                                        {/* <div className="invest-data-history">
                                            <div className="title">This Week</div>
                                            <div className="amount">
                                                1,259.28 <span className="currency currency-usd">USD</span>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* <div className="invest-data-ck">
                                        <WithdrawBarChart />
                                    </div> */}
                                </div>
                            </PreviewAltCard>
                        </Col>

                        <Col md="4">
                            <PreviewAltCard className="card-full">
                                <div className="card-title-group align-start mb-0">
                                    <div className="card-title">
                                        <h6 className="subtitle">Total Kelas</h6>
                                    </div>
                                    <div className="card-tools">
                                        <TooltipComponent
                                            iconClass="card-hint"
                                            icon="help-fill"
                                            direction="left"
                                            id="invest-balance"
                                            text="Total Balance"
                                        ></TooltipComponent>
                                    </div>
                                </div>
                                <div className="card-amount">
                                    <span className="amount">
                                        1<span className="currency currency-usd"></span>
                                    </span>
                                </div>
                                {/* <div className="invest-data">
                                    <div className="invest-data-amount g-2">
                                        <div className="invest-data-history">
                                            <div className="title">This Month</div>
                                            <div className="amount">
                                                2,940.59 <span className="currency currency-usd">USD</span>
                                            </div>
                                        </div>
                                        <div className="invest-data-history">
                                            <div className="title">This Week</div>
                                            <div className="amount">
                                                1,259.28 <span className="currency currency-usd">USD</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="invest-data-ck">
                                        <BalanceBarChart />
                                    </div>
                                </div> */}
                            </PreviewAltCard>
                        </Col>

                        <Col md="6" xxl="4">
                            <PreviewAltCard className="card-full">
                                <LineChart />
                            </PreviewAltCard>
                        </Col>

                        <Col md="6" xxl="4">
                            <PreviewAltCard className="card-full">
                                <Douchart />
                                
                                        {/* <div className="invest-ov-stats">
                                            <div>
                                                <span className="amount">23</span>
                                                <span className="change down text-danger">
                                                    <Icon name="arrow-long-down"></Icon>
                                                    1.93%
                                                </span>
                                            </div>
                                            <div className="title">Plans</div>
                                        </div> */}
                                   
                            </PreviewAltCard>
                            {/* <InvestPlan /> */}
                        </Col>
                    </Row>
                </Block>

            </Content>
        </React.Fragment>
    )
}

export default Dashboard
