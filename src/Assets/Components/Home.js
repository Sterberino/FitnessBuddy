import React from 'react';

import '../Styles/bodyStyles.css'
import './NutritionOverviewPage.js'


import '../Styles/footerStyles.css'
import NutritionOverviewPage from './NutritionOverviewPage.js';
import Footer from './Footer.js';
import Dashboard from './Dashboard.js';
import DiaryPage from './DiaryPage.js';

import { useNavigate } from 'react-router-dom';

import Spinner from './Spinner';
import { DateContext, DiaryContext } from '../../App';
import useFetchDiary from '../Hooks/useFetchDiary.js';

export default function Home({initialPage})
{
    const {currentDate} = React.useContext(DateContext)
    const {diaryInfo} = React.useContext(DiaryContext)
    
    const [fetchingDiaryInfo, setFetchingDiaryInfo] = useFetchDiary();
    React.useEffect(()=> {
      if(currentDate !== diaryInfo.currentDate)
      setFetchingDiaryInfo(true)
    }, [currentDate])

    //We have 3 tabs to navigate to the 3 main pages of the webapp
    const [footerTabState, setFooterTabState] = React.useState(initialPage ? initialPage : 0);
    const navigate = useNavigate();
    
    //On clicking the footer tab, we scroll back to the top of the page (so we aren't viewing the new page halfway down).
    //Then, we set the index equal to what is passed to us from the tab button and navigate to the appropriate page.
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

    //Scroll up on load.
    window.scrollTo(0, 0);

    if(fetchingDiaryInfo)
    {
        return <Spinner />
    }

    return (
        <div>
            {footerTabState === 0 && <Dashboard />}
            {footerTabState === 1 && <DiaryPage/>}
            {footerTabState === 2 && <NutritionOverviewPage />}
            <Footer initialIndex={initialPage ?  initialPage : 0} OnClickEvent={(index) => {OnClickFooterTab(index)}}/>
        </div>
    )
}
