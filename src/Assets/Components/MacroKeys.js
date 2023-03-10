import React from "react";
import '../Styles/nutritionPageStyles.css'

export default function MacroKeys()
{
    const barColors = [
        {
            fillColor : {
                r : 255,
                g : 55,
                b : 92, 
                a: 1
            },
            glowColor : {
                r : 255,
                g : 65,
                b : 102, 
                a: 0.6
            }
        },
        {
            fillColor : {
                r : 137,
                g : 255,
                b : 118, 
                a: 1
            },
            glowColor : {
                r : 157,
                g : 255,
                b : 138, 
                a: 0.6
            }
        },
        {
            fillColor : {
                r : 72,
                g : 222,
                b : 255, 
                a: 1
            },
            glowColor : {
                r : 82,
                g : 232,
                b : 255, 
                a: 0.6
            }
        }
    ]

    function GetCurrentPercentages()
    {
        const percentages = [0.5, 0.15, 0.35]
        return percentages
    }

    function GetGramValues()
    {
        const values = [100, 30, 70]
        return values;
    }

    function GetGoalPercentages()
    {
        const percentages = [0.5, 0.25, 0.25]
        return percentages
    }

    return(
        <div className="macro-keys">
            <div className="title total-title">{"Total"}</div>
            <div className="title goal-title">{"Goal"}</div>
            <div className="macro-key">
                <div className="key-symbol" style ={{ 
                    "backgroundColor" : `rgba(${barColors[0].fillColor.r} ,${barColors[0].fillColor.g} , ${barColors[0].fillColor.b}, ${barColors[0].fillColor.a})`,
                    "boxShadow" : `0px 0px 3.5px rgba(${barColors[0].glowColor.r} ,${barColors[0].glowColor.g} , ${barColors[0].glowColor.b}, ${barColors[0].glowColor.a})`
                }}></div>                
                <div className="title nutrient-name">{"Carbohydrates"}</div>
                <div className="nutrient-amount">{`(${Math.trunc(GetGramValues()[0])}G)`}</div>
            </div>
            <div className="nutrient-amount">{`${Math.trunc(GetCurrentPercentages()[0] * 100)}%`}</div>
            <div className="nutrient-amount">{`${Math.trunc(GetGoalPercentages()[0] * 100)}%`}</div>
            <div className="macro-key">
                <div className="key-symbol" style ={{ 
                    "backgroundColor" : `rgba(${barColors[1].fillColor.r} ,${barColors[1].fillColor.g} , ${barColors[1].fillColor.b}, ${barColors[1].fillColor.a})`,
                    "boxShadow" : `0px 0px 3.5px rgba(${barColors[1].glowColor.r} ,${barColors[1].glowColor.g} , ${barColors[1].glowColor.b}, ${barColors[1].glowColor.a})`
                }}></div>
                <div className="title nutrient-name">{"Fat"}</div>
                <div className="nutrient-amount">{`(${Math.trunc(GetGramValues()[1])}G)`}</div>
            </div>
            <div className="nutrient-amount">{`${Math.trunc(GetCurrentPercentages()[1] * 100)}%`}</div>
            <div className="nutrient-amount">{`${Math.trunc(GetGoalPercentages()[1] * 100)}%`}</div>
            <div className="macro-key">
                <div className="key-symbol" style ={{ 
                    "backgroundColor" : `rgba(${barColors[2].fillColor.r} ,${barColors[2].fillColor.g} , ${barColors[2].fillColor.b}, ${barColors[2].fillColor.a})`,
                    "boxShadow" : `0px 0px 3.5px rgba(${barColors[2].glowColor.r} ,${barColors[2].glowColor.g} , ${barColors[2].glowColor.b}, ${barColors[2].glowColor.a})`
                }}></div>       
                <div className="title nutrient-name">{"Protein"}</div>
                <div className="nutrient-amount">{`(${Math.trunc(GetGramValues()[2])}G)`}</div>
            </div>
            <div className="nutrient-amount">{`${Math.trunc(GetCurrentPercentages()[2] * 100)}%`}</div>
            <div className="nutrient-amount">{`${Math.trunc(GetGoalPercentages()[2] * 100)}%`}</div>
        </div>
    )
}
