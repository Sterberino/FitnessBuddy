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
import Home from './Assets/Components/Home';
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import SearchPage from './Assets/Components/SearchPage';
import AddFoodPage from './Assets/Components/AddFoodPage';

export const DateContext = React.createContext(null)

function App() {
  
  const [currentDate, setCurrentDate] = React.useState(new Date())

  //We want to provide the current selected date to the entire app so that we can retrieve information for that corresponding day on multiple pages.
  //We use React Router so that we can navigate from the food lookup / entry page back to the diary page.
  return (
    <DateContext.Provider value = {{currentDate : currentDate, setCurrentDate : setCurrentDate}}>
        <Router>
    
          <Routes>
            <Route exact path='/' element= {<Home initialPage={0}/>}></Route>
            <Route exact path='/Diary' element= {<Home initialPage={1}/>}></Route>
            <Route exact path='/Nutrition'  element= {<Home initialPage={2}/>}></Route>
            <Route exact path='/Search'  element= {<SearchPage />}></Route>
            <Route exact path = 'Search/Result' element = {<AddFoodPage />}></Route>
          </Routes>

        </Router>
    </DateContext.Provider>
  );
}

export default App;
