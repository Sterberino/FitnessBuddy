import React from 'react';
import logo from './logo.svg';
import './App.css';
import './Assets/Styles/bodyStyles.css'
import './Assets/Components/NutritionOverviewPage.js'


import './Assets/Styles/footerStyles.css'
import NutritionOverviewPage from './Assets/Components/NutritionOverviewPage.js';
import Footer from './Assets/Components/Footer.js';
import Dashboard from './Assets/Components/Dashboard.js';

function App() {
  const [footerTabState, setFooterTabState] = React.useState(0);
  
  function OnClickFooterTab(index)
  {
      setFooterTabState(index)
  }


  return (
  <div>
    {footerTabState === 0 && <Dashboard />}
    {footerTabState === 2 && <NutritionOverviewPage />}
    
    <Footer OnClickEvent={(index) => {OnClickFooterTab(index)}}/>
  </div>
  );
}

export default App;
