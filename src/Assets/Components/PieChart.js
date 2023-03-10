import React from "react";
import '../Styles/pieChartStyles.css'

export default function PieChart()
{
    const colors = [
        {
            "fillColor" : "rgba(114, 255, 255, 1)",
            "glowColor" : "rgba(134, 255, 255, 0.6)"
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

    function GetInitialPercentages()
    {
        const percentages = GetPercentages();
        const initialPercentages = new Array(percentages.length).fill(0);
        return initialPercentages;
    }

    function GetPercentages()
    {
        const percentages = [0.25, 0.35, 0.15, 0.25]
        return percentages;
    }

    function InitSlices()
    {
        const initialBars = GetPieSlices(GetInitialPercentages());
        return initialBars;
    }

    function GetPieSlices(percentages)
    {
        const pieSlices = [];

        let runningTotal = 0;

        let i = 0;
        for(i; i < percentages.length; i++)
        {
            
                let sliceCenterAngle = (runningTotal + percentages[i] / 2 ) * 2 * Math.PI
                /*sliceCenterAngle *= (180 / Math.PI)
                console.log(`sliceCenterAngle : ${sliceCenterAngle}`)
                sliceCenterAngle *= (Math.PI / 180)*/
                let pieSlice = (<div className="pie-chart-slice" key = {i} style={{
                    "background" : `conic-gradient(rgba(0,0,0,0) ${runningTotal * 360}deg, ${colors[i].fillColor} ${runningTotal * 360}deg, ${colors[i].fillColor} ${(runningTotal + percentages[i]) * 360}deg, rgba(0,0,0,0) ${(runningTotal + percentages[i]) * 360 + 0.05}deg`,
                    "filter" : `drop-shadow(0px 0px 5.5px ${colors[i].glowColor}`
                }}>
                    {percentages[i] === GetPercentages()[i] && <div className="pie-chart-text" style={{
                        "top" : `${Math.sin(sliceCenterAngle  - Math.PI / 2) * 31 + 40}%`,
                        "left" : `${Math.cos(sliceCenterAngle - Math.PI / 2) * 31 + 40}%`,
                    }}>{`${Math.trunc(percentages[i] * 100)}%`}</div>}
                </div>)
                 pieSlices.push(pieSlice);
                 runningTotal += percentages[i]
            
        }
        //console.log(pieSlices)
        return pieSlices;
    }

    const [currentFill, setCurrentFill] = React.useState([0,0,0,0])
    const [slices, setSlices] = React.useState(InitSlices())

    React.useEffect(() => {
        let interval = setTimeout(() => {
            let i = 0; 
            let currentValues = currentFill;
            let changed = false;
            for(i; i < currentFill.length; i++)
            {
                if(currentFill[i] === GetPercentages()[i])
                {
                    continue;
                }
                else{
                    let val = currentFill[i] + 0.035;
                    if(val > GetPercentages()[i])
                    {
                        val = GetPercentages()[i]
                    }
                    console.log(val)
                    currentValues[i] = val;
                    setCurrentFill(currentValues);
                    setSlices (GetPieSlices(currentFill));
                    changed = true;
                    break;
                }
            }

            if(!changed)
            {
                console.log('Clearing timeout')
                clearTimeout(interval)
            }
        }, 2.5)

        return(()=> {
            clearTimeout(interval)
        })
    }, [currentFill, slices])


    return(<div className="pie-chart">
        {slices}
    </div>)
}