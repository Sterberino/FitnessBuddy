import React from "react"

import '../Styles/bodyStyles.css'


import DonutChart from "./donutChart.js"


export default function DashboardMacroOverview()
{
    //TODO : function for parsing the nutrition information passed as props to a format useable by the app.
    function GetNutritionInformation()
    {
        const nutritionInformation = [
            {
                currentAmount : 45,
                goalAmount : 100
            },
            {
                currentAmount : 35,
                goalAmount : 100
            },
            {
                currentAmount : 25,
                goalAmount : 100
            }
        ]

        return nutritionInformation;
    }

    const nutritionInformation = GetNutritionInformation();

    return(
        
        <div 
        className="displayCard"
    >
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