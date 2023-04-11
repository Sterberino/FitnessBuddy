import React from "react"

import '../Styles/bodyStyles.css'
import '../Styles/lineChartStyles.css'

import DonutChart from "./donutChart.js"


export default function DashboardMacroOverview({diaryInfo})
{

    function GetCalorieGoal()
    {
        return 2000;
    }

    //TODO : function for parsing the nutrition information passed as props to a format useable by the app.
    function GetNutritionInformation()
    {

        //current carbs in grams.
        let currentCarbs = diaryInfo.foodEntries.reduce(
            (accumulator, currentVal) => accumulator+currentVal.carbohydrates_total_g,
            0
        )

        //current fat in grams.
        let currentFat = diaryInfo.foodEntries.reduce(
            (accumulator, currentVal) => accumulator+currentVal.fat_total_g,
            0
        )

        //current protein in grams.
        let currentProtein = diaryInfo.foodEntries.reduce(
            (accumulator, currentVal) => accumulator+currentVal.protein_g,
            0
        )

        const calorieGoal = GetCalorieGoal();

        const nutritionInformation = [
            {
                currentAmount : currentCarbs,
                //Total calorie goal * (40% should be carbs) / (1g protein/ 4cals) = grams target for carbs
                goalAmount : Math.trunc(calorieGoal * 0.4 / 4)
            },
            {
                currentAmount : currentFat,
                //Total calorie goal * (30% should be fat) / (1g fat / 9cals) = grams target for fat
                goalAmount : Math.trunc(calorieGoal * 0.3 / 9)
            },
            {
                currentAmount : currentProtein,
                //Same as carbs but target % is 30.
                goalAmount : Math.trunc(calorieGoal * 0.3 / 4)
            }
        ]

        return nutritionInformation;
    }

    

    const nutritionInformation = GetNutritionInformation();

    return(
        
        <div 
            className="displayCard"
        >

        <div className="weight-progress-header">
            <div 
                className="title"
            >{"Macros"}</div>
            <div></div>
        </div>

        <div className="row-flex">
            <div className="column-flex"
            >
                <div 
                    className="title"
                    style = {{
                        "marginLeft" : "0px"
                    }}
                >
                        {"Carbohydrates"}
                </div>

                <DonutChart 
                    height={"60px"}
                    width={"60px"}
                    nutritionInformation={[nutritionInformation[0].currentAmount / nutritionInformation[0].goalAmount, 0, 0]}
                />
                <div 
                    className="title"
                    style ={{
                        "position" : "relative",
                        "top" : "-32px"
                    }}>
                        {`${Math.trunc(nutritionInformation[0].currentAmount / nutritionInformation[0].goalAmount * 100)}%`}
                </div>

                <div
                    className="title"    
                >
                    {`${nutritionInformation[0].currentAmount}G`}
                </div>
            </div>
            
            <div className="column-flex"
            >
                <div 
                    className="title"
                    style = {{
                        "marginLeft" : "0px"
                    }}
                >
                        {"Fat"}
                </div>

                <DonutChart 
                    height={"60px"}
                    width={"60px"}
                    nutritionInformation={[0, nutritionInformation[1].currentAmount / nutritionInformation[1].goalAmount, 0]}
                />
                <div 
                    className="title"
                    style ={{
                        "position" : "relative",
                        "top" : "-32px"
                    }}>
                        {`${Math.trunc(nutritionInformation[1].currentAmount / nutritionInformation[1].goalAmount * 100)}%`}
                </div>

                <div
                    className="title"    
                >
                    {`${nutritionInformation[1].currentAmount}G`}
                </div>
            </div>
            
            
            <div className="column-flex"
            >
                <div 
                    className="title"
                    style = {{
                        "marginLeft" : "0px"
                    }}
                >
                        {"Protein"}
                </div>

                <DonutChart 
                    height={"60px"}
                    width={"60px"}
                    nutritionInformation={[0, 0, nutritionInformation[2].currentAmount / nutritionInformation[2].goalAmount]}
                />
                <div 
                    className="title"
                    style ={{
                        "position" : "relative",
                        "top" : "-32px"
                    }}>
                        {`${Math.trunc(nutritionInformation[2].currentAmount / nutritionInformation[2].goalAmount * 100)}%`}
                </div>

                <div
                    className="title"    
                >
                    {`${nutritionInformation[2].currentAmount}G`}
                </div>
            </div>
        </div>
    </div>
    )
}