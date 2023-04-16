import React from 'react';

import logo from './logo.svg';
import './App.css';
import './Assets/Styles/bodyStyles.css'
import './Assets/Components/NutritionOverviewPage.js'


import './Assets/Styles/footerStyles.css'
import Home from './Assets/Components/Home';
import { Route, Routes, BrowserRouter as Router, useNavigate, Navigate } from 'react-router-dom';
import SearchPage from './Assets/Components/SearchPage.js';
import AddFoodPage from './Assets/Components/AddFoodPage.js';
import Login from './Assets/Components/Login.js';
import Spinner from './Assets/Components/Spinner.js';

import useVerifyLogin from './Assets/Hooks/useVerifyLogin.js';
import AddExercisePage from './Assets/Components/AddExercisePage.js';
import AddWaterPage from './Assets/Components/AddWaterPage.js';
import AddWeightPage from './Assets/Components/AddWeightPage.js';


export const DateContext = React.createContext(null);
export const DiaryContext = React.createContext(null);


function App() {
  
  //This will serve as the backbone of our app.
  const [diaryInfo, setDiaryInfo] = React.useState({
    userName: '',
    foodEntries: [],
    exerciseEntries: [],
    weightEntries: [],
    waterEntries: [],
    currentDate: new Date()
  })

  function OnVerifyLogin(name)
  {
    setDiaryInfo(prev => ({...prev, userName: name}))
  }
  
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [checkingLoginStatus, loggedIn] = useVerifyLogin((name)=>{OnVerifyLogin(name)});

  if(checkingLoginStatus)
  {
    return(<>
      <Spinner />
    </>)
  }

  //We want to provide the current selected date to the entire app so that we can retrieve information for that corresponding day on multiple pages.
  //We use React Router so that we can navigate from the food lookup / entry page back to the diary page.
  return (
    <DateContext.Provider value = {{currentDate : currentDate, setCurrentDate : setCurrentDate}}>
    <DiaryContext.Provider value = {{diaryInfo: diaryInfo, setDiaryInfo: setDiaryInfo}}>    
        <Router>
    
          <Routes>
            <Route exact path= {'/'} element= {loggedIn ? <Home initialPage={0}/> : <Navigate to = "/login" />}></Route>
            <Route exact path='/Diary' element= {loggedIn ? <Home initialPage={1}/> : <Navigate to = "/login" replace />}></Route>
            <Route exact path='/Nutrition'  element= {loggedIn ? <Home initialPage={2}/> : <Navigate to = "/login" replace />}></Route>
            <Route exact path='/Search'  element= {loggedIn ? <SearchPage />  : <Navigate to = "/login" replace />}></Route>
            <Route exact path = '/Search/FoodResult' element = {loggedIn ? <AddFoodPage />  : <Navigate to = "/login" replace />}></Route>
            <Route exact path = '/Search/ExerciseResult' element = {loggedIn ? <AddExercisePage /> : <Navigate to = "/login" replace />}></Route>
            <Route path = '/AddWater' element = {loggedIn ? <AddWaterPage /> : <Navigate to = "/login" replace />}></Route>
            <Route path = '/AddWeight' element = {loggedIn ? <AddWeightPage /> : <Navigate to = "/login" replace />}></Route>
            <Route exact path = '/login' element = {loggedIn ? <Navigate to = "/" replace /> : <Login />} />
          </Routes>

        </Router>
    </DiaryContext.Provider>
    </DateContext.Provider>
  );
}

export default App;
