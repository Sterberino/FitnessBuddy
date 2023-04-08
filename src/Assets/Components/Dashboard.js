import React from "react";
import '../Styles/bodyStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/lineChartStyles.css'
import '../Styles/tabStyles.css'

import WeightAreaChart from './WeightAreaChart.js';
import DashboardMacroOverview from "./DashboardMacroOverview.js";
import DashboardCalorieOverview from "./DashboardCalorieOverview";
import { useNavigate } from "react-router-dom";

export default function Dashboard()
{
    const navigate = useNavigate();

    function GetName()
    {
        const name = "Zachary";
        return name;
    }

    /*We return 3 main things on the Dashboard page: A welcome message to the user, an overview of today's
    Calories and Macros, and a view of the user's weight over some period of time. We need to retrieve this 
    information and provide it to those components.*/
    return (
        <div>
            <div 
                className="row-flex"
                style= {{paddingLeft: "10px",paddingRight: "10px"}}
            >
                <div 
                    className="column-flex"
                    style = {{
                        justifyContent: "left"
                    }}    
                >
                    <div className="title"
                    style = {{
                        marginLeft: '0px',
                        'fontSize' : '1.1em',
                        'marginTop' : '10px',
                    }}>
                    {"Welcome back, "}
                    </div>
                    <div className="title"
                    style = {{
                        marginLeft: '-25px',
                        'fontSize' : '1.65em',
                        'marginBottom' : '10px'
                    }}>
                    {GetName()}
                    </div>
                </div>
                <div 
                    className="title tab-button"
                    style = {{width: "50px"}}
                    onClick={()=> {
                        localStorage.clear('token')
                        navigate(0);
                    }}    
                >
                    {"Sign Out"}
                </div>
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