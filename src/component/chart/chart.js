import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import { VectorMap } from "react-jvectormap";
import {
  analyticOvData,
  analyticOvDataSet2,
  analyticOvDataSet3,
  TrafficChannelDoughnutData,
  TrafficChannelDoughnutData2,
  TrafficChannelDoughnutData3,
  TrafficChannelDoughnutData4,
} from './AnalyticData';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Filler, Legend, ArcElement } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Filler, Legend, ArcElement);

export const AudienceLineChart = ({ state }) => {
  const [data, setData] = useState(analyticOvData);
  useEffect(() => {
    let object;
    if (state === "pegawai") {
      object = analyticOvDataSet2;
    } else {
      object = analyticOvDataSet3;
    }
    setData(object);
  }, [state]);
  return (
    <Line
      className="analytics-line-large"
      data={data}
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
            displayColors: false,
            backgroundColor: "#eff6ff",
            titleFont: {
              size: '13px',
            },
            titleColor: "#6783b8",
            titleMarginBottom: 6,
            bodyColor: "#9eaecf",
            bodyFont: {
              size: '12px',
            },
            bodySpacing: 4,
            padding: 10,
            footerMarginTop: 0,
            callbacks: {
              label: function (context) {
                return context.parsed.y;
              },
            },
          },
        },
        maintainAspectRatio: false,
        scales: {
          y: {
            display: true,
            ticks: {
              beginAtZero: true,
              color: "#9eaecf",
              font: {
                size: '11px',
              },
              padding: 8,
              stepSize: 2400,
            },
            grid: {
              color: "rgba(82, 100, 132, 0.2)",
              tickMarkLength: 0,
              zeroLineColor: "rgba(82, 100, 132,0.2)",
            },
          },
          x: {
            display: false,
            ticks: {
              color: "#9eaecf",
              font: {
                size: '12px',
              },
              source: "auto",
              padding: 0,
            },
            grid: {
              color: "transparent",
              tickMarkLength: 0,
              zeroLineColor: "transparent",
              offsetGridLines: true,
            },
          },
        },
      }}
    ></Line>
  );
};

export const TCDoughnut = ({ state, className }) => {
  const [data, setData] = useState(TrafficChannelDoughnutData);
  useEffect(() => {
    if (state === "7") {
      setData(TrafficChannelDoughnutData2);
    } else if (state === "15") {
      setData(TrafficChannelDoughnutData3);
    } else {
      setData(TrafficChannelDoughnutData4);
    }
  }, [state]);
  return (
    <Doughnut
      className={className}
      data={data}
      options={{
        plugins: {
          legend: {
              display: false,
          },
          tooltip: {
              enabled: true,
              displayColors: false,
              backgroundColor: "#eff6ff",
              titleFont: {
                size: '13px',
              },
              titleColor: "#6783b8",
              titleMarginBottom: 6,
              bodyColor: "#9eaecf",
              bodyFont: {
                size: '12px',
              },
              bodySpacing: 4,
              padding: 10,
              footerMarginTop: 0,
          },
        },
        rotation: -1.5,
        cutoutPercentage: 70,
        maintainAspectRatio: false,
      }}
    ></Doughnut>
  );
};
// export const BarChartExample = ({ data, stacked }) => {
//   return (
//     <Bar
//       data={data}
//       options={{
//         plugins: {
//           legend: {
//             display: false,
//           },
//           tooltip: {
//             enabled: true,
//             displayColors: false,
//             backgroundColor: "#eff6ff",
//             titleFont: {
//               size: '13px',
//             },
//             titleColor: "#6783b8",
//             titleMarginBottom: 6,
//             bodyColor: "#9eaecf",
//             bodyFont: {
//               size: '12px',
//             },
//             bodySpacing: 4,
//             padding: 10,
//             footerMarginTop: 0,
//           },
//         },
//         maintainAspectRatio: false,
//         scales: {
//           y:
//           {
//             display: true,
//             stacked: stacked ? true : false,
//             ticks: {
//               beginAtZero: true,
//               color: "#9eaecf",
//               font: {
//                 size: '12px',
//               },
//               padding: 5,
//             },
//             grid: {
//               tickMarkLength: 0,
//             },
//           },
//           x:
//           {
//             display: true,
//             stacked: stacked ? true : false,
//             ticks: {
//               color: "#9eaecf",
//               font: {
//                 size: '12px',
//               },
//               source: "auto",
//               padding: 5,
//             },
//             grid: {
//               color: "transparent",
//               tickMarkLength: 10,
//               zeroLineColor: "transparent",
//             },
//           },
//         },
//       }}
//     />
//   );
// };

// export const PieChartExample = ({ data }) => {
//   return (
//     <Pie
//       data={data}
//       options={{
//         plugins: {
//           legend: {
//               display: false,
//           },
//           tooltip: {
//               enabled: true,
//               displayColors: false,
//               backgroundColor: "#eff6ff",
//               titleFont: {
//                 size: '13px',
//               },
//               titleColor: "#6783b8",
//               titleMarginBottom: 6,
//               bodyColor: "#9eaecf",
//               bodyFont: {
//                 size: '12px',
//               },
//               bodySpacing: 4,
//               padding: 10,
//               footerMarginTop: 0,
//           },
//         },
//         rotation: -0.2,
//         maintainAspectRatio: false,
//       }}
//     />
//   );
// };

// export const DoughnutExample = ({ data,legend }) => {
//   return (
//     <Doughnut
//     className="line-chart"
//       data={data}
//       options={{
//         plugins: {
//           legend: {
//               display: legend,
//               labels: {
//                 boxWidth: 12,
//                 padding: 20,
//                 fontColor: "#6783b8",
//               },
//           },
//           tooltip: {
//               enabled: true,
//               displayColors: false,
//               backgroundColor: "#eff6ff",
//               titleFont: {
//                 size: '13px',
//               },
//               titleColor: "#6783b8",
//               titleMarginBottom: 6,
//               bodyColor: "#9eaecf",
//               bodyFont: {
//                 size: '12px',
//               },
//               bodySpacing: 4,
//               padding: 10,
//               footerMarginTop: 0,
//           },
//         },
//         rotation: 1,
//         cutoutPercentage: 40,
//         maintainAspectRatio: false,
//       }}
//     />
//   );
// };

// export const PolarExample = ({ data }) => {
//   return (
//     <PolarArea
//       data={data}
//       options={{
//         plugins: {
//           legend: {
//               display: false,
//           },
//           tooltip: {
//               enabled: true,
//               displayColors: false,
//               backgroundColor: "#eff6ff",
//               titleFont: {
//                 size: '13px',
//               },
//               titleColor: "#6783b8",
//               titleMarginBottom: 6,
//               bodyColor: "#9eaecf",
//               bodyFont: {
//                 size: '12px',
//               },
//               bodySpacing: 4,
//               padding: 10,
//               footerMarginTop: 0,
//           },
//         },
//         maintainAspectRatio: false,
//       }}
//     />
//   );
// };
