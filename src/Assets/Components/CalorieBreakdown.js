import React from "react";
import '../Styles/nutritionPageStyles.css'


export default function CalorieBreakdown()
{
    const colors = [
        {
            "fillColor" : "rgba(134, 255, 255, 1)",
            "glowColor" : "rgba(154, 255, 255, 0.6)"
        },
        {
            "fillColor" : "rgba(0, 215, 255, 1)",
            "glowColor" : "rgba(0, 235, 255, 0.6)"
        },
        {
            "fillColor" : "rgba(0, 140, 255, 1)",
            "glowColor" : "rgba(15, 155, 255, 0.6)"
        },
        {
            "fillColor" : "rgba(10, 85, 160, 1)",
            "glowColor" : "rgba(20, 95, 170, 0.6)"
        }
    ]

    function GetPercentages()
    {
        const percentages = [0.25, 0.35, 0.15, 0.25]
        return percentages;
    }

    function GetCalorieAmounts()
    {
        return [250, 350, 150, 250]
    }


    return(<div className="calorie-breakdown-grid">
                <div className="meal-key">
                    <div className="key-symbol" style ={{ 
                        "backgroundColor" : colors[0].fillColor,
                        "boxShadow" : colors[0].glowColor
                    }}></div>                
                    <div className="title nutrient-name">{"Breakfast"}</div>
                    <div className="nutrient-amount">{`(${Math.trunc(GetCalorieAmounts()[0])}Cal)`}</div>
                </div>
                <div className="meal-key">
                    <div className="key-symbol" style ={{ 
                        "backgroundColor" : colors[1].fillColor,
                        "boxShadow" : colors[1].glowColor
                    }}></div>                
                    <div className="title nutrient-name">{"Lunch"}</div>
                    <div className="nutrient-amount">{`(${Math.trunc(GetCalorieAmounts()[1])}Cal)`}</div>
                </div>
                <div className="meal-key">
                    <div className="key-symbol" style ={{ 
                        "backgroundColor" : colors[2].fillColor,
                        "boxShadow" : colors[2].glowColor
                    }}></div>                
                    <div className="title nutrient-name">{"Dinner"}</div>
                    <div className="nutrient-amount">{`(${Math.trunc(GetCalorieAmounts()[0])}Cal)`}</div>
                </div>
                <div className="meal-key">
                    <div className="key-symbol" style ={{ 
                        "backgroundColor" : colors[3].fillColor,
                        "boxShadow" : colors[3].glowColor
                    }}></div>                
                    <div className="title nutrient-name">{"Snacks"}</div>
                    <div className="nutrient-amount">{`(${Math.trunc(GetCalorieAmounts()[0])}Cal)`}</div>
                </div>
        </div>)
}