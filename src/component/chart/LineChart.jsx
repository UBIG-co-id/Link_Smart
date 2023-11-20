import React, { useState } from "react";
import Icon from "../Icon";
// import { LineChartExample } from "../chart";
import LineChartPage from "./LineChartPage";

const LineChart = () => {
    const [tab, setTab] = useState("1");
    return (
        <React.Fragment>
            <LineChartPage />
        </React.Fragment>
    )
}

export default LineChart
