export const solidLineChart = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    dataUnit: "BTC",
    lineTension: 0.4,
    legend: true,
    categoryPercentage: 0.9,
    barPercentage: 0.6,
    datasets: [
      {
        label: "Total Received",
        borderColor: "#5ce0aa",
        backgroundColor: "white",
        pointBorderWidth: 2,
        fill: false,
        categoryPercentage: 0.9,
        barPercentage: 0.6,
        data: [110, 80, 125, 55, 95, 75, 90, 110, 80, 125, 55, 95],
      },
      {
        label: "Total Send",
        backgroundColor: "white",
        pointBorderWidth: 2,
        borderColor: "#798bff",
        fill: false,
        categoryPercentage: 0.9,
        barPercentage: 0.6,
        data: [80, 54, 105, 120, 82, 85, 60, 80, 54, 105, 120, 82],
      },
    ],
  };
  export const doughnutChartData = {
    labels: ["Tanggungan", "Terbayar"],
    dataUnit: "BTC",
    legend: true,
    datasets: [
      {
        borderColor: "#fff",
        backgroundColor: ["rgba(128, 128, 128, 0.8)", "rgba(0, 0, 255, 0.8)"],
        data: [110, 125],
      },
    ],
    
  };