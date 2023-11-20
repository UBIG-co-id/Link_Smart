import React, { useState } from "react";
import { AudienceLineChart } from "./chart";
import { Icon } from "../Component";

const AudienceOverview = () => {
  const [auOverview, setAuOverview] = useState("pegawai");
  return (
    <React.Fragment>
      <div className="card-title-group pb-3 g-2">
        <div className="card-title card-title-sm">
          <h6 className="title">Presensi</h6>
          <p>Rekap Minggu Ini</p>
        </div>
        <div className="card-tools shrink-0 d-none d-sm-block">
          <ul className="nav nav-switch-s2 nav-tabs bg-white">
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "siswa" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("siswa");
                }}
              >
                Siswa
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#navitem"
                className={auOverview === "pegawai" ? "nav-link active" : "nav-link"}
                onClick={(e) => {
                  e.preventDefault();
                  setAuOverview("pegawai");
                }}
              >
                Pegawai
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="analytic-ov">
        <div className="analytic-data-group analytic-ov-group g-3">
          {/* <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="amount">{auOverview === "month-1" ? "2.57" : "1.21"}K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> {auOverview === "month-1" ? "12.31" : "5.21"}%
            </div>
          </div>
          <div className="analytic-data analytic-ov-data">
            <div className="title">Sessions</div>
            <div className="amount">{auOverview === "month-1" ? "3.98" : "1.6"}K</div>
            <div className="change up">
              <Icon name="arrow-long-up"></Icon> {auOverview === "month-1" ? "47.5" : "80.6"}%
            </div>
          </div> */}
          {/* <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="amount">{auOverview === "month-1" ? "28.25" : "10.25"}%</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> {auOverview === "month-1" ? "12.57" : "18.21"}%
            </div>
          </div> */}
          {/* <div className="analytic-data analytic-ov-data">
            <div className="title">Users</div>
            <div className="amount">{auOverview === "month-1" ? "7m 28" : "2m 36"}s</div>
            <div className="change down">
              <Icon name="arrow-long-down"></Icon> {auOverview === "month-1" ? "0.35" : "1.21"}%
            </div>
          </div> */}
        </div>
        <div className="analytic-ov-ck">
          <AudienceLineChart state={auOverview} />
        </div>
        <div className="chart-label-group ms-5">
          <div className="chart-label">1 </div>
          <div className="chart-label d-none d-sm-block">{auOverview === "pegawai" ? "2" : "2"} </div>
          <div className="chart-label d-none d-sm-block"> {auOverview === "pegawai" ? "3" : "3"} </div>
          <div className="chart-label d-none d-sm-block"> {auOverview === "pegawai" ? "4" : "4"} </div>
          <div className="chart-label d-none d-sm-block"> {auOverview === "pegawai" ? "5" : "5"} </div>
          <div className="chart-label d-none d-sm-block"> {auOverview === "pegawai" ? "6" : "6"} </div>
          <div className="chart-label d-none d-sm-block"> {auOverview === "pegawai" ? "7" : "7"} </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AudienceOverview;







// import React from 'react'
// import Head from '../../layout/Head'
// import Content from '../../layout/Content/Content'
// import {
//     Block,
//     BlockHead,
//     BlockBetween,
//     BlockTitle,
//     BlockHeadContent,
//     BlockDes,
//     Button,
//     Icon,
//     Row,
//     Col,
//     PreviewCard,
//     PreviewAltCard,
//     TooltipComponent,
//     // LineChartExample,
//     // PieChartExample
// } from '../Component'
// import { solidLineChart } from './ChartData'

// const ChartPage = () => {
//     return (
//         <React.Fragment>
//             <PreviewCard>
//                 <div className="nk-ck">
                    
//                     {/* <LineChartExample legend={true} data={solidLineChart} /> */}
//                 </div>
//             </PreviewCard>
//         </React.Fragment>
//     )
// }

// export default ChartPage
