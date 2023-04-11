import React from "react";
import '../Styles/bodyStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/lineChartStyles.css'
import '../Styles/tabStyles.css'

import WeightAreaChart from './WeightAreaChart.js';
import DashboardMacroOverview from "./DashboardMacroOverview.js";
import DashboardCalorieOverview from "./DashboardCalorieOverview";
import { useNavigate } from "react-router-dom";
import { DiaryContext, DateContext } from "../../App";

export default function Dashboard()
{
    const navigate = useNavigate();
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);
    const {currentDate, setCurrentDate} = React.useContext(DateContext);
    
    function GetTimePeriod()
    {
        let highestDifference = 0;
        for(let i = 0; i < diaryInfo.weightEntries.length; i++)
        {
            let difference = new Date().getTime() - new Date(diaryInfo.weightEntries[i].DiaryDate).getTime();
            difference /= (1000 * 3600 * 24);
            if(difference > highestDifference)
            {
                highestDifference = difference;
            }
        }
        return Math.trunc(highestDifference);
    }

    function GetName()
    {
        const name = diaryInfo.userName;
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
           
           

            <DashboardCalorieOverview diaryInfo={diaryInfo}/>
            <DashboardMacroOverview diaryInfo = {diaryInfo}/>

            <div
                className="displayCard"
                style= {{
                    "marginBottom" : "80px"
                }}
            >
                
                <WeightAreaChart 
                    data = 
                    {
                        diaryInfo.weightEntries.map(item => {
                            const date = new Date(item.DiaryDate);
                            const month = date.getMonth() < 10 ? `0${date.getMonth()+1}` : date.getMonth() + 1;
                            return {
                                x: `${month}/${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}`,
                                y: item.userWeight
                            }
                    
                        })
                    }
                    timePeriod = {
                        GetTimePeriod()
                    }

                />
            </div>
        </div>
    )
}