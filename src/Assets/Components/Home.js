import React from 'react';

import '../Styles/bodyStyles.css'
import './NutritionOverviewPage.js'


import '../Styles/footerStyles.css'
import NutritionOverviewPage from './NutritionOverviewPage.js';
import Footer from './Footer.js';
import Dashboard from './Dashboard.js';
import DiaryPage from './DiaryPage.js';

import { useNavigate } from 'react-router-dom';

export default function Home({initialPage})
{
    const [footerTabState, setFooterTabState] = React.useState(initialPage ? initialPage : 0);
    const navigate = useNavigate();

    function OnClickFooterTab(index)
    {
      window.scrollTo(0, 0);
      setFooterTabState(index)
      if(index === 0)
      {
        navigate('/')

      }
      else if(index === 1)
      {
        navigate('/Diary')
        
      }
      else if(index === 2)
      {
        navigate('/Nutrition')
      }
    }
  
    window.scrollTo(0, 0);

    return (
        <div>
            {footerTabState === 0 && <Dashboard />}
            {footerTabState === 1 && <DiaryPage/>}
            {footerTabState === 2 && <NutritionOverviewPage />}
            <Footer initialIndex={initialPage ?  initialPage : 0} OnClickEvent={(index) => {OnClickFooterTab(index)}}/>
        </div>
    )
}
