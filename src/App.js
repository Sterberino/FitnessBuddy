import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Assets/Styles/bodyStyles.css'
import './Assets/Components/NutritionOverviewPage.js'


import './Assets/Styles/footerStyles.css'
import NutritionOverviewPage from './Assets/Components/NutritionOverviewPage.js';
import Footer from './Assets/Components/Footer.js';
import Dashboard from './Assets/Components/Dashboard.js';
import DiaryPage from './Assets/Components/DiaryPage.js';

export const DateContext = React.createContext(null)

function App() {
  const [footerTabState, setFooterTabState] = React.useState(0);
  const [currentDate, setCurrentDate] = React.useState(new Date())

  function OnClickFooterTab(index)
  {
    window.scrollTo(0, 0);
    setFooterTabState(index)
  }

  window.scrollTo(0, 0);

  return (
  <div>
    <DateContext.Provider value = {{currentDate : currentDate, setCurrentDate : setCurrentDate}}>
    {footerTabState === 0 && <Dashboard />}
    {footerTabState === 1 && <DiaryPage/>}
    {footerTabState === 2 && <NutritionOverviewPage />}
    
    <Footer OnClickEvent={(index) => {OnClickFooterTab(index)}}/>
    </DateContext.Provider>
  </div>
  );
}

export default App;
