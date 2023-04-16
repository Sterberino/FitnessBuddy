import React from "react";
import '../Styles/nutritionPageStyles.css'
import { DiaryContext } from "../../App";


export default function NutritionKeys()
{
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);

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

    //Return an object with accumulated values from all daily food entries
    function GetTotalValues()
    {
        const total = {
                carbohydrates_total_g: GetTotalFieldValue('carbohydrates_total_g'),
                fat_total_g: GetTotalFieldValue('fat_total_g'),
                protein_g: GetTotalFieldValue('protein_g'),
                fiber_g: GetTotalFieldValue('fiber_g'),
                sugar_g: GetTotalFieldValue('sugar_g'),
                fat_saturated_g: GetTotalFieldValue('fat_saturated_g'),
                cholesterol_mg: GetTotalFieldValue('cholesterol_mg'),
                sodium_mg: GetTotalFieldValue('sodium_mg'),
                potassium_mg: GetTotalFieldValue('potassium_mg'),
            }
        return total;
    }

    //Get the total for one field
    function GetTotalFieldValue(field)
    {
        if(!diaryInfo.foodEntries)
        {
            return 0;
        }

        const total = diaryInfo.foodEntries.length === 1 ? 0 : diaryInfo.foodEntries.reduce((accumulator, current) => {
            return accumulator + current[field]
        }, 0)

        return total;
    }

    function GetCalorieGoal()
    {
        return 2000;
    }

    function GetNutritionInfo()
    {
        const calorieGoal = GetCalorieGoal();
        const total = GetTotalValues();
        const NutritionInfo = [
            {
                "Name" : "Carbohydrates",
                "currentAmount" : total.carbohydrates_total_g,
                "desiredAmount" : 240,
                "unit" : "g"
            },
            {
                "Name" : "Fat",
                "currentAmount" : total.fat_total_g,
                "desiredAmount" : 80,
                "unit" : "g"
            },
            {
                "Name" : "Protein",
                "currentAmount" : total.protein_g,
                "desiredAmount" : 140,
                "unit" : "g"
            },
            {
                "Name" : "Fiber",
                "currentAmount" : total.fiber_g,
                "desiredAmount" : 38,
                "unit" : "g"
            },
            {
                "Name" : "Sugar",
                "currentAmount" : total.sugar_g,
                "desiredAmount" : 63,
                "unit" : "g"
            },
            {
                "Name" : "Saturated Fat",
                "currentAmount" : total.fat_saturated_g,
                "desiredAmount" : 0,
                "unit" : "g"
            },
            {
                "Name" : "Cholesterol",
                "currentAmount" : total.cholesterol_mg,
                "desiredAmount" : 0,
                "unit" : "mg"
            },
            {
                "Name" : "Sodium",
                "currentAmount" : total.sodium_mg,
                "desiredAmount" : 2300,
                "unit" : "mg"
            },
            {
                "Name" : "Potassium",
                "currentAmount" : total.potassium_mg,
                "desiredAmount" : 3500,
                "unit" : "mg"
            },
        ]

        return NutritionInfo;
    }

    function GetFillPercentages()
    {
        return GetNutritionInfo().map(item => {
            if(item.currentAmount === 0 && item.desiredAmount === 0)
            {
                return 0;
            }
            else if(item.currentAmount > 0 && item.desiredAmount === 0)
            {
                return 1;
            }
            else{
                return item.currentAmount / item.desiredAmount;
            }
        })
    }

    const [body, setBody] = React.useState(<></>)
    const [currentFill, setCurrentFill] = React.useState(new Array( GetNutritionInfo().length).fill(0))

    React.useEffect(() => {
        let interval = setInterval(()=> {
            let currentValues = currentFill;
            let fillPercentages = GetFillPercentages(); 
            
            if(currentFill.length !== fillPercentages.length)
            {
                console.log(`currentValues undefined, length ${currentValues.length}`)
                let length = fillPercentages.length
                let index = 0;
                let newArr = []
                for(index; index < length; index++)
                {
                    newArr.push(0);
                }

                setCurrentFill(newArr);        
            }

            let i = 0; 
            let changed = false;
            let nonzeroValueFound = false;
            for(i; i < currentValues.length; i++)
            {
                if(fillPercentages[i] > 0)
                {
                    nonzeroValueFound = true
                }
                if(currentValues[i] === fillPercentages[i])
                {
                    continue;
                }
                else{
                    let val = currentValues[i] + 0.03;
                    if(val > fillPercentages[i])
                    {
                        val = fillPercentages[i]
                    }
                    currentValues[i] = val;
                    changed = true;
                }
            }
            if(!nonzeroValueFound && React.Children.toArray(body.props.children).length < 2)
            {
                setBody(GenerateNutritionList())
                return;
            }
            if(changed === true)
            {
                setCurrentFill(currentValues);
                setBody (GenerateNutritionList());
            }
            else{
                clearTimeout(interval);
            }

        }, 3)

        return ()=> {
            clearInterval(interval)
        }
    }, [currentFill, body])

    function GenerateNutritionList()
    {
        const keys = [];
        const nutritionInfo = GetNutritionInfo();
        
        //Headers
        keys.push(<div className="title total-title" key = {"total-title"}>{"Total"}</div>)
        keys.push(<div className="title goal-title" key = {"goal-title"}>{"Goal"}</div>)
        keys.push(<div className="title left-title" key = {"eft-title"}>{"Left"}</div>)

        let i = 0;
        for(i; i < nutritionInfo.length; i++)
        {
            let fillBarStyle = {};
            if(nutritionInfo[i].Name === "Carbohydrates")
            {
                fillBarStyle = {
                    "backgroundColor" : `rgba(${barColors[0].fillColor.r}, ${barColors[0].fillColor.g}, ${barColors[0].fillColor.b}, ${barColors[0].fillColor.a})`,
                    "boxShadow" : `0px 0px 2px rgba(${barColors[0].glowColor.r}, ${barColors[0].glowColor.g}, ${barColors[0].glowColor.b}, ${barColors[0].glowColor.a})`,
                    "width" : `${currentFill[i] > 0.998 ? 99.8 : currentFill[i] * 100}%`
                }
            }
            else if(nutritionInfo[i].Name === "Fat")
            {
                fillBarStyle = {
                    "backgroundColor" : `rgba(${barColors[1].fillColor.r}, ${barColors[1].fillColor.g}, ${barColors[1].fillColor.b}, ${barColors[1].fillColor.a})`,
                    "boxShadow" : `0px 0px 2px rgba(${barColors[1].glowColor.r}, ${barColors[1].glowColor.g}, ${barColors[1].glowColor.b}, ${barColors[1].glowColor.a})`  ,
                    "width" : `${currentFill[i] > 0.998 ? 99.8 : currentFill[i] * 100}%`
                }
            }
            else if(nutritionInfo[i].Name === "Protein")
            {
                fillBarStyle = {
                    "backgroundColor" : `rgba(${barColors[2].fillColor.r}, ${barColors[2].fillColor.g}, ${barColors[2].fillColor.b}, ${barColors[2].fillColor.a})`,
                    "boxShadow" : `0px 0px 2px rgba(${barColors[2].glowColor.r}, ${barColors[2].glowColor.g}, ${barColors[2].glowColor.b}, ${barColors[2].glowColor.a})`,
                    "width" : `${currentFill[i] > 0.998 ? 99.8 : currentFill[i] * 100}%`
                }
            }
            else{
                fillBarStyle = {
                    "backgroundColor" : "rgba(150, 150, 150, 1)",
                    "boxShadow" : "0px 0px 2px rgba(170, 170, 170, 0.6)",
                    "width" : `${currentFill[i] > 0.998 ? 99.8 : currentFill[i] * 100}%`
                }
            }
            keys.push(<div className="nutrient-keys-divider" key = {`nutrient-keys-divider ${i}`}></div>)
            keys.push(<div className="title nutrient-title" key = {`nutrient-title ${i}`}>{`${nutritionInfo[i].Name} (${nutritionInfo[i].unit})`}</div>)
            keys.push(<div className="nutrient-amount" key = {`nutrientinfo-currentAmount ${i}`}>{nutritionInfo[i].currentAmount}</div>)
            keys.push(<div className="nutrient-amount" key = {`nutrientinfo-desiredAmount ${i}`}>{nutritionInfo[i].desiredAmount}</div>)
            keys.push(<div className="nutrient-amount" key = {`nutrientinfo-remainingAmount ${i}`}>{nutritionInfo[i].desiredAmount - nutritionInfo[i].currentAmount < 0 ? 0 : nutritionInfo[i].desiredAmount - nutritionInfo[i].currentAmount}</div>)
            keys.push(<div className="nutrient-bar" key = {`nutrientinfo-bar ${i}`}>
                <div className="nutrient-fill-bar" style={fillBarStyle}></div>
            </div>)
        }

        return(
            <div className="nutrient-keys">
                {keys}
            </div>
        )
    }


    return (
        <div>
            {body}
        </div>


    )
}