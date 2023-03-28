import React from "react";

import DonutChart from './donutChart.js'
import MacroKeys from './MacroKeys.js'
import NutritionKeys from './NutritionKeys';
import TabMenu from './TabMenu.js';
import PieChart from './PieChart.js';
import CalorieBreakdown from './CalorieBreakdown';
import FoodsHighestIn from "./FoodsHighestIn.js";

export default function NutritionOverviewPage()
{
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    function SelectTab(index)
    {
        window.scrollTo(0, 0);   
        setSelectedIndex(index)
    }

    window.scrollTo(0, 0);

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
                <PieChart />
                <CalorieBreakdown />
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
                    nutritionInformation={[0.4, 0.35, 0.25]}
                />
                <MacroKeys />
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