import React from "react"
import { useNavigate } from "react-router-dom";


export default function DiaryItemCard({ItemTitle, style})
{
    const navigate = useNavigate();

    function GetDailyTotal()
    {
        return 0;
    }

    function GetItems()
    {
        const items = [
            {
                name : "Item 1",
                value : 0
            },
            {
                name : "Item 1",
                value : 1
            }
        ]

        const itemDivs = items.map((item, index) => {
            return (
                <div 
                    key = {index}
                    style = {{
                        width : "100%"
                    }}
                >
                    <div 
                        className="row-flex"
                    >
                        <div 
                            className="title"
                            style = {{
                                width: "100%",
                                marginLeft: "-5px",
                                marginTop: "5px",
                                marginBottom : "10px"
                            }}  
                        >{item.name}</div>    
                        <div className="nutrient-amount">{item.value}</div>
                    </div> 
                    <div className="nutrient-keys-divider"></div>
                </div>
            )
        })
        
        return itemDivs
    }


    return(
        <div 
            className="displayCard"
            style = {style? style : null}
        >
            <div className="row-flex">
                <div 
                    className="title"
                    style = {{
                        width: "100%",
                        marginLeft: "-5px",
                        marginTop: "5px"
                    }}  
                >{ItemTitle}</div>    
                <div className="title">{GetDailyTotal()}</div>
            </div> 
            
            <div className="nutrient-keys-divider"></div>
            {GetItems()}
            <div className="row-flex">
                <div 
                    className="blue-title"
                    style = {{
                        marginTop: "5px"
                    }}
                    onClick = {()=>{navigate("../Search", {state:{name: ItemTitle}})}}  
                >{`Add ${ItemTitle}`}</div>    
                <div className="title">{" "}</div>
            </div> 
        </div>

    )
}