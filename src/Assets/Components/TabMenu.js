import React from "react";
import '../Styles/tabStyles.css'

export default function TabMenu({OnClickEvent})
{
    const[selectedIndex, setSelectedIndex] = React.useState(0)

    function OnClickTab(index)
    {
        setSelectedIndex(index);
        OnClickEvent(index);
    }

    return(
        <div className="tab-menu">
            <div className="tab-button" onClick={() => OnClickTab(0)}>{"Calories"}</div>
            <div className="tab-button" onClick={ () => OnClickTab(1)}>{"Nutrients"}</div>
            <div className="tab-button" onClick={() => OnClickTab(2)}>{"Macros"}</div>
            <div className="tab-underscore" 
                style = {{
                    "marginLeft" : `calc(${selectedIndex*33}%)`
                }}
            >
                <div className="tab-underscore-image"></div>
            </div>
        </div>
    )
}