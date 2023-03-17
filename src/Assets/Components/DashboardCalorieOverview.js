import React from "react";

import '../Styles/bodyStyles.css'
import '../Styles/lineChartStyles.css'
import '../Styles/nutritionPageStyles.css'

import DonutChart from "./donutChart";
import DashboardCalorieWidget from "./DashboardCalorieWidget";

export default function DashboardCalorieOverview()
{



    return (
            <div className="displayCard">
                <div className="weight-progress-header">
                    <div className="title">{"Calories"}</div>
                    <div ></div>
                    <div 
                        className="nutrient-amount"
                        style = {{
                            gridColumn : "1 / span 2"
                        }}
                    >
                        {"Remaining = Goal - Food + Exercise"}
                    </div>
                </div>

                <div className="weight-progress-header">
                    <div className="column-flex">
                        <DonutChart nutritionInformation={[0,0,0,0.5]}/>
                        <div 
                            className="title"
                            style = {{
                                position : "relative",
                                marginLeft : "0",
                                top : "-60px",
                                fontSize : "1.25em",
                                textAlign : "center"
                            }}
                        >
                            {`${"1630"}`}
                        </div>
                        
                        <div 
                            className="nutrient-amount"
                            style = {{
                                position : "relative",
                                marginTop : "0px",
                                fontSize : "0.6em", 
                                top : "-60px",
                            }}
                        >
                            {"Remaining"}
                        </div>
                    </div>

                    <div 
                        className="column-flex"
                        style = {{
                            marginTop : "-15px",
                            marginLeft : "-35px"
                        }}
                    >
                        <DashboardCalorieWidget text={"Base Goal"} value = {1690} iconSrc = {`${process.env.PUBLIC_URL}/Images/flag-icon.png`}/>
                        <DashboardCalorieWidget text={"Food"} value = {0} iconSrc = {`${process.env.PUBLIC_URL}/Images/fork-knife-icon.png`}/>
                        <DashboardCalorieWidget text={"Exercise"} value = {0} iconSrc = {`${process.env.PUBLIC_URL}/Images/running-icon.png`}/>
                    </div>

                </div>
            </div>
    )
}