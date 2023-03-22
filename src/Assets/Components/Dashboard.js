import React from "react";
import '../Styles/bodyStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/lineChartStyles.css'

import DonutChart from './donutChart.js'
import WeightAreaChart from './WeightAreaChart.js';
import DashboardMacroOverview from "./DashboardMacroOverview.js";
import DashboardCalorieOverview from "./DashboardCalorieOverview";
import DatePicker from "./DatePicker.js";

export default function Dashboard()
{
    function GetName()
    {
        const name = "Zachary";
        return name;
    }

    return (
        <div>
            <div
                style = {{
                    position: "fixed",
                    left : "50%",
                    top : "50%",
                    marginTop: "-230px",
                    marginLeft : "-185px",
                    zIndex :  "10"
                }}
            >
                <div
                    style = {{
                        width: "100vw",
                        height : "200vh",
                        left : "50%",
                        right: "50%",
                        marginTop: "-50vw",
                        marginLeft : "-50vw",
                        zIndex: "1",
                        backgroundColor : "rgba(0,0,0,0.5)",
                        backdropFilter : "blur(4px)",
                        position : "fixed"
                    }}
                >    
                </div>
                <DatePicker
                    style = {{
                        zIndex : "11",
                        position: "fixed",
                        width : "360px",
                        height : "min-content",
                        maxHeight : "450px",
                        justifyContent : "flex-start"
                    }}/>
            </div>
            <div className="title"
                style = {{
                    'fontSize' : '1.1em',
                    'marginTop' : '10px',
                }}>
                {"Welcome back, "}
            </div>
            <div className="title"
                style = {{
                    'fontSize' : '1.65em',
                    'marginBottom' : '10px'
                }}>
                {GetName()}
            </div>

            <DashboardCalorieOverview />
            <DashboardMacroOverview />

            <div 
                className="displayCard"
                style= {{
                    "marginBottom" : "80px"
                }}>
                <WeightAreaChart data = {
                [
                    {
                        x : "01/23", 
                        y : 152
                    }, 
                    {
                        x : "02/23",
                        y : 164
                    },
                    
                    {
                        x : "03/23",
                        y : 172
                    } , 
                    {
                        x : "04/23",
                        y : 181
                    }
                ]
                }/>
            </div>
        </div>
    )
}