import React from "react";
import '../Styles/bodyStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/lineChartStyles.css'

import DonutChart from './donutChart.js'
import WeightAreaChart from './WeightAreaChart.js';
import DashboardMacroOverview from "./DashboardMacroOverview.js";
import DashboardCalorieOverview from "./DashboardCalorieOverview";
import DateSetterButton from "./DateSetterButton.js";

export default function Dashboard()
{
    function GetName()
    {
        const name = "Zachary";
        return name;
    }


    return (
        <div>
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
                }}
            >
                
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