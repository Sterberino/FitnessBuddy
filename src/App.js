import React from 'react';

import logo from './logo.svg';
import './App.css';
import './Assets/Styles/bodyStyles.css'
import './Assets/Components/NutritionOverviewPage.js'


import './Assets/Styles/footerStyles.css'
import Home from './Assets/Components/Home';
import { Route, Routes, BrowserRouter as Router, useNavigate, Navigate } from 'react-router-dom';
import SearchPage from './Assets/Components/SearchPage';
import AddFoodPage from './Assets/Components/AddFoodPage';
import Login from './Assets/Components/Login.js';
import Spinner from './Assets/Components/Spinner';

export const DateContext = React.createContext(null)

function App() {
  
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [checkingLoginStatus, setCheckingLoginStatus] = React.useState(true);
  
  React.useEffect(()=> {
    if(checkingLoginStatus)
    {
      fetch('../api/v1/auth/verifyAuthentication', {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "authorization" : `Bearer ${localStorage.getItem('token')}`
        },
        
    })
    .then(res => res.json())
    .then(res => {
        setLoggedIn(true);
        
        const{userName, userId} = res;
        if(userName && userId)
        {
          setLoggedIn(true);
          setCheckingLoginStatus(false);
        }
        else{
          setLoggedIn(false);
          setCheckingLoginStatus(false);
        }
      })
    }
    
  }, [])

  React.useEffect(()=>{}, [checkingLoginStatus])


  function IsLoggedIn()
  {
    return loggedIn;
  }

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
        <Router>
    
          <Routes>
            <Route exact path= {'/'} element= {IsLoggedIn() ? <Home initialPage={0}/> : <Navigate to = "/login" />}></Route>
            <Route exact path='/Diary' element= {IsLoggedIn() ? <Home initialPage={1}/> : <Navigate to = "/login" replace />}></Route>
            <Route exact path='/Nutrition'  element= {IsLoggedIn() ? <Home initialPage={2}/> : <Navigate to = "/login" replace />}></Route>
            <Route exact path='/Search'  element= {IsLoggedIn() ? <SearchPage />  : <Navigate to = "/login" replace />}></Route>
            <Route exact path = 'Search/Result' element = {IsLoggedIn() ? <AddFoodPage />  : <Navigate to = "/login" replace />}></Route>
            <Route exact path = '/login' element = {IsLoggedIn() ? <Navigate to = "/" replace /> : <Login />} />
          </Routes>

        </Router>
    </DateContext.Provider>
  );
}

export default App;
