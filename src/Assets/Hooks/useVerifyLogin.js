import React from "react";
import { DiaryContext } from "../../App";

export default function useVerifyLogin(OnVerifyLogin)
{
    const [checkingLoginStatus, setCheckingLoginStatus] = React.useState(true);
    const [loggedIn, setLoggedIn] = React.useState(false);
   
    React.useEffect(()=> {
      if(checkingLoginStatus)
      {
        if(localStorage.getItem('token') === null)
        {
          setLoggedIn(false)
          setCheckingLoginStatus(false)
          return;
        }

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
            if(OnVerifyLogin)
            {
                OnVerifyLogin(userName)
            }
          }
          else{
            setLoggedIn(false);
            setCheckingLoginStatus(false);
          }
        })
        .then(res => {
          setLoggedIn(true);
          setCheckingLoginStatus(false);
        })
        .catch(err => {
          console.log(err)
          setLoggedIn(false);
          setCheckingLoginStatus(false);
        })
      }
      
    }, [])


    return [checkingLoginStatus, loggedIn];
}