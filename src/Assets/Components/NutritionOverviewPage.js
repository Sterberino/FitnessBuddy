import React from "react";

import DonutChart from './donutChart.js'
import MacroKeys from './MacroKeys.js'
import NutritionKeys from './NutritionKeys';
import TabMenu from './TabMenu.js';
import PieChart from './PieChart.js';
import CalorieBreakdown from './CalorieBreakdown';
import FoodsHighestIn from "./FoodsHighestIn.js";

import { DiaryContext } from "../../App.js";

export default function NutritionOverviewPage()
{
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);

    const [selectedIndex, setSelectedIndex] = React.useState(0)
    function SelectTab(index)
    {
        window.scrollTo(0, 0);   
        setSelectedIndex(index)
    }

    window.scrollTo(0, 0);

    function GetMealPercentages(mealArray, totalDailyCals)
    {
        //Total daily cals can only be 0 if all entries in the mealArray are 0. Simply return mealArray 
        if(totalDailyCals === 0)
        {
            return mealArray;
        }
        else
        {
            return mealArray.map(item => item / totalDailyCals);
        }
        
    }

    //Take as input an array of calories broekn down by meal: Breakfast, Lunch, Dinner, Snacks
    function GetDailyCalories(mealTotalCals)
    {
       return mealTotalCals.reduce((accumulator, current) => accumulator+current, 0)
    }

    function GetMealTotalCals(mealCategory)
    {
        let cals = diaryInfo.foodEntries.reduce((accumulator, current) => 
        {   
            if(current.Meal === mealCategory)
            {
                return accumulator+ Math.trunc(current.calories)
            }
            else{
                return accumulator;
            }
            
        },
        0)

        return cals;
    }

    //Get an array of all meal category calories
    function GetMealArray()
    {
        return [
            GetMealTotalCals('Breakfast'),
            GetMealTotalCals('Lunch'),
            GetMealTotalCals('Dinner'),
            GetMealTotalCals('Snacks'),
        ]
    }

    function GetNetCalories(totalCalories)
    {
        return totalCalories - diaryInfo.exerciseEntries.reduce(
            (accumulator, current) => accumulator + current.caloriesBurned,
            0
        )
    }

    function GetCalorieGoal()
    {
        return 2000;
    }

    //Get the total for one field
    function GetTotalFieldValue(field)
    {
        const total = diaryInfo.foodEntries.reduce((accumulator, current) => {
            return accumulator + current[field]
        }, 0)

        return total;
    }

    const mealCals = GetMealArray();
    const totalDailyCals = GetDailyCalories(mealCals);
    const netCalories = GetNetCalories(totalDailyCals);
    const percents = GetMealPercentages(mealCals, totalDailyCals);
    const calorieGoal = GetCalorieGoal();
    const totalMacros = [
        GetTotalFieldValue('carbohydrates_total_g'),
        GetTotalFieldValue('fat_total_g'),
        GetTotalFieldValue('protein_g')
    ]
    const macroTotal = totalMacros[0] + totalMacros[1] + totalMacros[2];
    const macroPercentages = macroTotal === 0 ? 0 : totalMacros.map(item => item / macroTotal);

    return (
        <>
        <div className='displayCard header-card'>
            <TabMenu OnClickEvent= {(index) =>{SelectTab(index)}}/>
        </div>
        {selectedIndex === 0 && 
        //The following fragment section is the daily calorie intake overiew tab
        <>
            <div className='displayCard'
                style = {{
                    'marginTop' : '80px'
                }}>
                <PieChart percentages={percents}/>
                <CalorieBreakdown 
                    mealCalories = {mealCals}
                    totalCalories={totalDailyCals}
                    netCalories={netCalories}
                    goalCalories = {calorieGoal}
                />
            </div>

            <FoodsHighestIn 
                Parameter={"Calories"}
                style = {{
                    marginBottom : "80px"
                }}
            />
            
           
        </>
        }
        { selectedIndex === 2 &&
        <>
            <div className='displayCard'
                style = {{
                    'marginTop' : '80px'
                }}>
                <DonutChart 
                    nutritionInformation={macroPercentages}
                />
                <MacroKeys 
                    percentages={macroPercentages} 
                    gramValues={totalMacros}
                />
            </div>
            
            <FoodsHighestIn 
                Parameter={"Protein"}
            />

            <FoodsHighestIn 
                Parameter={"Fat"}
            />

            <FoodsHighestIn 
                Parameter={"Carbohydrates"}
                style = {{
                    marginBottom : "80px"
                }}
            />

        </>
        }
        { selectedIndex === 1 && <div className='displayCard'
            style = {{
                'marginBottom' : '80px',
                'marginTop' : '80px'
            }}>
            <NutritionKeys />  
        </div>}
    </>
  );
}