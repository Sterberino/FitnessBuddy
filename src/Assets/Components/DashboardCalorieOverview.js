import React from "react";

import '../Styles/bodyStyles.css'
import '../Styles/lineChartStyles.css'
import '../Styles/nutritionPageStyles.css'

import DonutChart from "./donutChart";
import DashboardCalorieWidget from "./DashboardCalorieWidget";

export default function DashboardCalorieOverview({diaryInfo})
{

    function GetCalorieTotalRatio()
    {
        let calsEaten = GetTotalDailyCalories();
        let calsBurned = GetCaloriesBurned();
        let totalCals = (calsEaten - calsBurned)  / GetCalorieGoal();

        totalCals = totalCals > 1 ? 1: totalCals;
        totalCals = totalCals < 0 ? 0: totalCals;


        return totalCals;
    }

    function GetTotalDailyCalories()
    {
        let initialValue = 0;

        let totalCals = diaryInfo.foodEntries.reduce(
            (accumulator, currentValue) => accumulator+currentValue.calories,
            initialValue
        );

        return totalCals;
    }

    function GetCaloriesBurned()
    {
        let initialValue = 0;

        let totalCals = diaryInfo.exerciseEntries.reduce(
            (accumulator, currentValue) => accumulator+currentValue.caloriesBurned,
            initialValue
        );

        return totalCals;
    }

    function GetCalorieGoal()
    {
        return 2000;
    }

    const calorieGoal = GetCalorieGoal();
    const totalDailyCalories = GetTotalDailyCalories();
    const calorieRatio = GetCalorieTotalRatio();
    
    const caloriesBurned = GetCaloriesBurned();

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
                        <DonutChart nutritionInformation={[0,0,0, calorieRatio]}/>
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
                            {`${calorieGoal - Math.trunc(totalDailyCalories) + Math.trunc(caloriesBurned)}`}
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
                        <DashboardCalorieWidget text={"Base Goal"} value = {calorieGoal} iconSrc = {`${process.env.PUBLIC_URL}/Images/flag-icon.png`}/>
                        <DashboardCalorieWidget text={"Food"} value = {Math.trunc(totalDailyCalories)} iconSrc = {`${process.env.PUBLIC_URL}/Images/fork-knife-icon.png`}/>
                        <DashboardCalorieWidget text={"Exercise"} value = {Math.trunc(caloriesBurned)} iconSrc = {`${process.env.PUBLIC_URL}/Images/running-icon.png`}/>
                    </div>

                </div>
            </div>
    )
}