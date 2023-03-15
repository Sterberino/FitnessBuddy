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
import WeightAreaChart from './Assets/Components/WeightAreaChart.js';

import './Assets/Styles/pieChartStyles.css'
import './Assets/Styles/footerStyles.css'

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
      
      <WeightAreaChart data = {
        [
          {
            x : "01/23", 
            y : 152
          }, 
          {
            x : "02/23",
            y : 164
          },
          {
            x : "03/23",
            y : 172
          } , 
          {
            x : "04/23",
            y : 181
          }
        ]
        }/>
      <PieChart />
      <CalorieBreakdown />
      </div>}
    { selectedIndex === 2 &&<div className='displayCard'>
      <DonutChart 
        nutritionInformation={[0.4, 0.35, 0.25]}
      />
      <MacroKeys />
    </div>}
    { selectedIndex === 1 && <div className='displayCard'>
      <NutritionKeys />  
    </div>}

    <div className='footer-card'></div>
    </>
  );
}

export default App;
