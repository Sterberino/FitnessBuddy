import React from "react"
import { useNavigate } from "react-router-dom";
import { DiaryContext, DateContext } from "../../App";

export default function DiaryItemCard({ItemTitle, style})
{
    const navigate = useNavigate();
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);
    const {currentDate, setCurrentDate} = React.useContext(DateContext);

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
                        width : "100%",
                        cursor: 'pointer'
                    }}
                    onClick={()=> {
                        navigate(
                            {
                                pathname: '../Search/FoodResult',
                                search: `id=${item.name.split(', ').join('+').split(' ').join('+').split('/').join('+')}`,
                                
                            }, 
                            {
                                state:{
                                    food: item,
                                    mealCategory: item.Meal,
                                    editMode: true
                                }
                            })
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
                                marginBottom : "10px",
                                maxWidth: "240px"
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
                        width : "100%",
                        cursor: 'pointer'
                    }}
                    onClick={()=> {
                        navigate(
                            {
                                pathname: '../Search/ExerciseResult',
                                search: `id=${item.exerciseName.split(', ').join('+').split(' ').join('+').split('/').join('+')}`,
                                
                            }, 
                            {
                                state:{
                                    exercise: item,
                                    editMode: true
                                }
                            })
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
                                marginBottom : "10px",
                                maxWidth: "240px"
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
                        width : "100%",
                        cursor: 'pointer'
                    }}
                >
                    <div 
                        className="row-flex"
                        onClick={() => {
                            navigate(
                            {
                                pathname: '../AddWater',
                                search: `id=${item._id}`,
                                
                            }, 
                            {
                                state:{
                                    water: item,
                                    editMode: true
                                }
                            })
                        }
                        }
                    >
                        <div 
                            className="title"
                            style = {{
                                width: "100%",
                                marginLeft: "-5px",
                                marginTop: "5px",
                                marginBottom : "10px",
                                maxWidth: "240px"
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

    function GetWeightEntryDiv()
    {
        let items = diaryInfo.weightEntries.filter(item => { 
            let entryDate = new Date(item.DiaryDate);
            let thisDate = new Date(currentDate);
            return entryDate.getYear() === thisDate.getYear() 
            && entryDate.getMonth() === thisDate.getMonth()
            && entryDate.getDate() === thisDate.getDate();
        });
        
        const itemDivs = items.map((item, index) => {
            return (
                <div 
                    key = {index}
                    style = {{
                        width : "100%",
                        cursor: 'pointer'
                    }}
                >
                    <div 
                        className="row-flex"
                        onClick={() => {
                            navigate(
                            {
                                pathname: '../AddWeight',
                                search: `id=${item._id}`,
                            }, 
                            {
                                state:{
                                    weight: item,
                                    editMode: true
                                }
                            })
                        }
                        }
                    >
                        <div 
                            className="title"
                            style = {{
                                width: "100%",
                                marginLeft: "-5px",
                                marginTop: "5px",
                                marginBottom : "0px",
                                maxWidth: "240px"
                            }}  
                        >{"Weight (lb)"}</div>    
                        <div className="nutrient-amount">{item.userWeight}</div>
                    </div> 
                </div>
            )
        })

        return itemDivs
    }

    function WeightEntryToday()
    {
        return diaryInfo.weightEntries.reduce((accumuator, item) => { 
            if(accumuator === 1)
            {
                return 1;
            }
            let entryDate = new Date(item.DiaryDate);
            let thisDate = new Date(currentDate);
            let entryExists = entryDate.getYear() === thisDate.getYear() 
            && entryDate.getMonth() === thisDate.getMonth()
            && entryDate.getDate() === thisDate.getDate();
        
            if(entryExists)
            {
                return 1;
            }
            else{
                return 0;
            }
        }, 0);
    }

    function GetItems()
    {
        switch(ItemTitle)
        {
            case 'Exercise':
                return GetExerciseEntryDivs();
            case 'Water' :
                return GetWaterEntryDivs();
            case 'Weight' :
                return GetWeightEntryDiv();
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

            { !(ItemTitle === 'Weight' && WeightEntryToday() === 1) &&
            <div className="row-flex">
                <div 
                    className="blue-title"
                    style = {{
                        marginTop: "5px"
                    }}
                    onClick = {()=>{
                        if(ItemTitle === 'Water')
                        {
                            navigate("../AddWater", {state:{name: ItemTitle}})    
                            return;
                        }
                        if(ItemTitle === 'Weight')
                        {
                            navigate("../AddWeight", {state:{name: ItemTitle}})    
                            return;
                        }
                        navigate("../Search", {state:{name: ItemTitle}})
                        
                    }}  
                >{`Add ${ItemTitle}`}</div>    
                <div className="title">{" "}</div>
            </div> 
        }
        </div>

    )
}