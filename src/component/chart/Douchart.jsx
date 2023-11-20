import React, { useState } from "react";
import Icon from "../Icon";
// import { LineChartExample } from "../chart";
import DouchartPage from "./DouchartPage";

const DouChart = () => {
    const [tab, setTab] = useState("1");
    return (
        <React.Fragment>
            
                <DouchartPage/>
            
            {/* <div className="tab-content mt-0">
                {tab === "1" && (
                  <div>
                    <ChartPage/>
                  </div>  
                )}
            </div> */}
        </React.Fragment>
    )
}

export default DouChart
