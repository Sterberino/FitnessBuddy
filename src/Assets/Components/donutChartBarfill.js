import React from "react";

export default function Barfill({rotation, fillPercentage, barColor, glowColor})
{
    const fillAmount = fillPercentage * 270;
   
    return (
        <div className="bar-fill-container" style = {
            {
                "transform": `rotate(${-90 + rotation}deg)`
            }
        }
        >
        <svg xmnls = "http://www.w3.org/2000/svg" version = "1.1" width = "100%" height = "100%">
            <circle className= "bar-fill" cx = "50%" cy = "50%" r = "42.5%" viewBox = "0 0 150% 150%" strokeLinecap = "round" 
                style ={{
                    "strokeDashoffset" : `${270 - fillAmount}%`,
                    "stroke" : `rgba(${barColor.r}, ${barColor.g}, ${barColor.b}, ${barColor.a})`,
                    "filter" : `drop-shadow(0px 0px 1.5px rgba(${glowColor.r}, ${glowColor.g}, ${glowColor.b}, ${glowColor.a}))`
                }}
            />
        </svg>
    </div>
    )
}