import React from "react";

import DonutChart from './donutChart.js'
import MacroKeys from './MacroKeys.js'
import NutritionKeys from './NutritionKeys';
import TabMenu from './TabMenu.js';
import PieChart from './PieChart.js';
import CalorieBreakdown from './CalorieBreakdown';

export default function NutritionOverviewPage()
{
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    function SelectTab(index)
    {
        setSelectedIndex(index)
    }

    const showMacros = true;

    return (
        <>
        <div className='displayCard header-card'>
            <TabMenu OnClickEvent= {(index) =>{SelectTab(index)}}/>
        </div>
        {selectedIndex === 0 && <div className='displayCard'
        style = {{
            'marginBottom' : '80px',
            'marginTop' : '80px'
        }}>
      
        
        <PieChart />
        <CalorieBreakdown />
         </div>}
        { selectedIndex === 2 &&<div className='displayCard'
            style = {{
                'marginBottom' : '80px',
                'marginTop' : '80px'
            }}>
        <DonutChart 
            nutritionInformation={[0.4, 0.35, 0.25]}
        />
        <MacroKeys />
        </div>}
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