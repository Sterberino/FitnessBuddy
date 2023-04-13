import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";
import DonutChart from "./donutChart";

import { DateContext } from "../../App.js";

import '../Styles/footerStyles.css'

export default function AddExercisePage()
{
    const location = useLocation();
  
    const [exercise, setExercise] = React.useState(location.state ? location.state.exercise : null)
    const [post, setPost] = React.useState(false);
    const {currentDate, setCurrentDate} = React.useContext(DateContext); 

    React.useEffect(()=>{
        if(post)
        {
            let exerciseData = exercise;
            exerciseData.DiaryDate = currentDate;
            console.log(exerciseData)

            fetch('../api/v1/exerciseDiary', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(exerciseData)
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    setPost(false);
                })

        }


    }, [post])


    const navigate = useNavigate()

    //Opens a popup for Changing the day that you want to associate the entry with (Breakfast, Lunch, Dinner, or Snacks)
    const TogglePopup = ()=>{
        //setChangeMealPopupOpen(prev => !prev)
    }

    return(
        <>
            <div 
                className="displayCard headercard"
                style ={{
                    position: "fixed",
                    marginTop: "-5px",
                    paddingBottom : "15px",
                    width: "360px",
                    height: "70px",
                    zIndex: 4
                }}
            >
                <div 
                    className="row-flex"
                    style = {{
                        marginTop: "5px"
                    }}
                >
                    <img 
                        className="footer-button" 
                        src = {`${process.env.PUBLIC_URL}/Images/Left-Arrow-Icon.png`}
                        style = {{
                            margin: "0"
                        }}    
                        onClick = {()=>{        
                            navigate(
                            {
                                pathname: '/Search',
                            }, 
                            {
                                state:{
                                    name: 'Exercise',
                                }
                            })
                        }}
                    />
                    <div 
                        className="title"
                        style = {{
                            textAlign: "center",
                            marginLeft : "-20px"
                        }}
                        onClick = {()=> {TogglePopup()}}
                    >{"Add Exercise"}</div>
                    
                    <img 
                        className="footer-button" 
                        src = {`${process.env.PUBLIC_URL}/Images/check-icon.png`}
                        onClick={()=>{setPost(true)}}
                    />
                </div>
            </div>

                <div 
                    className="displayCard"
                    style ={{
                        marginTop: "70px",
                        position: "relative",
                        paddingBottom: "20px"
                    }}
                >
                    <div 
                        className="title"
                        style= {{
                            alignSelf: "left",
                            justifySelf: "left",
                            width: "100%",
                            padding: "10px",
                            fontSize: "1em",
                            maxWidth: "320px",
                            backgroundRepeat: ''
                        }}
                >{exercise.name}</div>
               
                <div className="nutrient-keys-divider"></div>
                <div 
                    className="row-flex"
                    style =  {{
                        padding: "10px" ,
                        paddingBottom: "0px",
                        paddingTop: "0px"
                    }}
                >
                    <div className="title">{"Calories Burned"}</div>
                    <div className="blue-title">{Math.trunc(exercise.caloriesBurned)}</div>
                </div>
                <div className="nutrient-keys-divider"></div>
                
                <div 
                    className="row-flex"
                    style =  {{
                        padding: "10px" ,
                        paddingBottom: "0px",
                        paddingTop: "0px"
                    }}
                >
                    <div className="title">{"Exercise Duration"}</div>
                    <div 
                        className="blue-title"
                        onClick = {()=> {}}       
                    >{exercise.exerciseDuration}
                         
                    </div>
                </div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className="row-flex"
                    style =  {{
                        padding: "10px" ,
                        paddingBottom: "0px",
                        paddingTop: "0px"
                    }}
                >
                    <div className="title">{"Weight during exercise"}</div>
                    <div className="blue-title">{exercise.weightDuringExercise}</div>
                </div>
            </div>

          
        </>
    )

}