import React from "react";
import Barfill from "./donutChartBarfill.js"

import '../Styles/donutChartStyles.css'

export default function DonutChart({nutritionInformation, height, width, style})
{
    const [currentFill, setCurrentFill] = React.useState(nutritionInformation ? new Array(nutritionInformation.length).fill(0) : [0, 0, 0])

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
        },
        {
            fillColor : {
                r : 190,
                g : 190,
                b : 190, 
                a: 1
            },
            glowColor : {
                r : 200,
                g : 200,
                b : 200, 
                a: 0.6
            }
        }
    ]

    const [bars, setBars] = React.useState(InitBars()) 
    
    function GetFillPercentages()
    {
        const percentages = [0.5, 0.15, 0.35]
        return nutritionInformation ? nutritionInformation : percentages;
    }

    function InitBars()
    {
        return[
            <Barfill 
                rotation={0} 
                fillPercentage = {0} 
                barColor ={
                    {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
                glowColor = {
                    {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
                key = {0}
            />,
            <Barfill 
                rotation={0} 
                fillPercentage = {0} 
                barColor ={
                    {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
                glowColor = {
                    {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
                key = {1}
            />,
            <Barfill 
                rotation={0} 
                fillPercentage = {0} 
                barColor ={
                    {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
                glowColor = {
                    {
                        r : 0,
                        g : 0,
                        b : 0,
                        a : 0
                    }
                }
                key = {2}
            />,

        ]
    }

    function CreateBars(percentages, barColors)
    {
        let bars = [];
        let i = 0;
        let runningTotal = 0;

        for(i; i < percentages.length; i++)
        {
            let barFill = <Barfill 
                rotation={(runningTotal + (percentages.length === 2 ? 0.005 : 0)) * 360 + 2.6 * percentages.length} 
                fillPercentage = {
                    percentages[i] === 0 ? 0 : percentages[i] - 0.015 * (percentages.length === 2 ? 3 : percentages.length)} 
                barColor ={
                    i >= barColors.length ? barColors.length - 1 : barColors[i].fillColor
                }
                glowColor = {
                    i >= barColors.length ? barColors.length - 1 : barColors[i].glowColor
                }
                key = {i}
            />

        bars.push(barFill);
        runningTotal += percentages[i];
        }
        return bars;
    }



    React.useEffect(()=> {
        let interval = setInterval(()=> {
            let i = 0; 
            let currentValues = currentFill;
            let changed = false;
            for(i; i < currentFill.length; i++)
            {
                if(currentFill[i] === GetFillPercentages()[i])
                {
                    continue;
                }
                else{
                    let val = currentFill[i] + 0.035;
                    if(val > GetFillPercentages()[i])
                    {
                        val = GetFillPercentages()[i]
                    }
                    currentValues[i] = val;
                    setCurrentFill(currentValues);
                    setBars (CreateBars(currentFill, barColors));
                    changed = true;
                    break;
                }
            }

            if(!changed)
            {
                clearTimeout(interval)
            }
            
        }, 2)




        return ()=> {
            clearInterval(interval)
        }
    }, [currentFill])
    //const Percentages = GetFillPercentages();

    const numValues = 3;

    return (
    <div className="donut-chart" style = {{
        ...style,
        ...(height && {'height' : height}),
        ...(width && {'width' : height}),
    }}>
        {bars}
        <div className="inner"></div>        
    </div>
    )
}