import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Assets/Styles/bodyStyles.css'
import DonutChart from './Assets/Components/donutChart.js'
import MacroKeys from './Assets/Components/MacroKeys.js'
import NutritionKeys from './Assets/Components/NutritionKeys';
import TabMenu from './Assets/Components/TabMenu.js';
import PieChart from './Assets/Components/PieChart.js';
import CalorieBreakdown from './Assets/Components/CalorieBreakdown';

import './Assets/Styles/pieChartStyles.css'

function App() {

const [selectedIndex, setSelectedIndex] = React.useState(0)
  function SelectTab(index)
  {
    setSelectedIndex(index)
  }

  const showMacros = true;

  return (
    <>
    <div className='displayCard'>
      <TabMenu OnClickEvent= {(index) =>{SelectTab(index)}}/>
    </div>
    {selectedIndex === 0 && <div className='displayCard'>
      <PieChart />
      <CalorieBreakdown />
      </div>}
    { selectedIndex === 2 &&<div className='displayCard'>
      <DonutChart />
      <MacroKeys />
    </div>}
    { selectedIndex === 1 && <div className='displayCard'>
      <NutritionKeys />  
    </div>}
    </>
  );
}

export default App;
