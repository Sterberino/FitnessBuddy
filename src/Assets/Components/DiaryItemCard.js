import React from "react"
import { useNavigate } from "react-router-dom";

import { DiaryContext } from "../../App";

export default function DiaryItemCard({ItemTitle, style})
{
    const navigate = useNavigate();
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);

    function GetDailyTotal()
    {
        switch(ItemTitle)
        {
            case 'Exercise' : 
                return (
                    diaryInfo.exerciseEntries.reduce(
                        (accumulator, current)=>{
                            return accumulator + Math.floor(current.caloriesBurned)
                        },
                        0
                    )
                )
            case 'Water' :
                return (
                    diaryInfo.waterEntries.reduce(
                        (accumulator, current)=>{
                            return accumulator + current.volume
                        },
                        0
                    )
                )

            default : 
                return(
                    diaryInfo.foodEntries.reduce(
                        (accumulator, current)=>{
                            if(current.Meal === ItemTitle)
                            {
                                return accumulator + Math.floor(current.calories)
                            }
                            return accumulator
                        },
                        0
                    )
                )
        }
    }

    function GetFoodEntryDivs()
    {
        const items = diaryInfo.foodEntries.filter((item)=>{return item.Meal === ItemTitle});
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
                        <div className="nutrient-amount">{Math.floor(item.calories)}</div>
                    </div> 
                    <div className="nutrient-keys-divider"></div>
                </div>
            )
        })

        return itemDivs
    }

    function GetExerciseEntryDivs()
    {
        const items = diaryInfo.exerciseEntries;
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
                        >{item.exerciseName}</div>    
                        <div className="nutrient-amount">{Math.floor(item.caloriesBurned)}</div>
                    </div> 
                    <div className="nutrient-keys-divider"></div>
                </div>
            )
        })

        return itemDivs
    }

    function GetWaterEntryDivs()
    {
        const items = diaryInfo.waterEntries;
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
                        >{"Water (Liters)"}</div>    
                        <div className="nutrient-amount">{item.volume}</div>
                    </div> 
                    <div className="nutrient-keys-divider"></div>
                </div>
            )
        })

        return itemDivs
    }

    function GetItems()
    {
        switch(ItemTitle)
        {
            case 'Exercise':
                return GetExerciseEntryDivs();
            case 'Water' :
                return GetWaterEntryDivs();
            default: 
                return GetFoodEntryDivs(); 
        }
    }

    const dailyTotal = GetDailyTotal();

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
                <div 
                    className="title"
                    style = {{width : '75px', textAlign: 'right'}}
                >{`${dailyTotal}${ItemTitle === 'Water' ? ' L' : ' Cal'}`}</div>
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