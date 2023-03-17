import React from "react";
import '../Styles/bodyStyles.css'
import '../Styles/lineChartStyles.css'
import '../Styles/nutritionPageStyles.css'


export default function DashboardCalorieWidget({iconSrc, text, value})
{
    
    return(
        <div className="weight-progress-header">
            <img 
                src={iconSrc}
                style = {{
                    position : "relative",
                    width : "15px",
                    height : "15px",
                    justifySelf : "flex-end",
                    alignSelf : "center",
                    top : "10%"
                }}
            />
            <div className="column-flex">
                <div 
                    className="title"
                    style = {{
                        textAlign : "left",
                        alignSelf : "flex-start"
                    }} 
                >{text}</div>
                <div 
                    className="nutrient-amount"
                    style = {{
                        textAlign : "left",
                        alignSelf : "flex-start"
                    }}     
                >{`${value}`}</div>
            </div>
        </div>
    )
}