import React from "react";

import '../Styles/bodyStyles.css'
import '../Styles/searchPageStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/datepickerStyles.css'

//A small popup component that allows you to change the meal associated with an entry.
export default function ChangeExerciseInfoPopup({OnClickEvent, OnExitEvent, initialDuration, initialWeight})
{
    const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"]
    const [duration, setDuration] = React.useState(initialDuration);
    const [weightDuringExercise, setWeightDuringExercise] = React.useState(initialWeight)


    
    return(
        <>
            <div className="displayCard change-meal-category-popup">
                <form 
                    className= "date-input-form"
                    onSubmit={(event)=> {
                        event.preventDefault()
                        console.log('SUBMIT')
                        if(OnClickEvent)
                        {
                            OnClickEvent(duration, weightDuringExercise);
                        }
                    }}
                >
                    <div 
                        className="row-flex"
                        style = {{
                            height: "25px",
                            padding: "0px",
                            width: "90%"
                        }}
                    >
                        <input 
                            style = {{
                                height: "25px",
                                width: "50%"
                            }}
                            autoComplete = "new-password"
                            autoFocus = {false}
                            id = "duration-text-input"
                            type="text" 
                        
                            value={duration}
                            onChange={(e)=> { 
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                                if(e.target.value.length < 5)
                                {
                                    setDuration( e.target.value)
                                }
                            }}
                        />
                        <div className="title">{"minutes"}</div>
                    </div>

                    <div 
                        className="row-flex"
                        style = {{
                            height: "25px",
                            padding: "0px",
                            width: "90%"
                        }}
                    >
                        <input 
                            style = {{
                                height: "25px",
                                width: "50%"
                            }}
                            autoComplete = "new-password"
                            autoFocus = {false}
                            id = "weight-text-input"
                            type="text" 
                        
                            value={weightDuringExercise}
                            onChange={(e)=> { 
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                                if(e.target.value.length < 5)
                                {
                                    setWeightDuringExercise( e.target.value)    
                                }
                            }} 
                        />
                        <div className="title">{"pounds"}</div>
                    </div>
                </form>
                
                <div 
                    className="date-picker-footer"
                    style = {{

                        justifyContent: "space-around"
                    }}
                >
                    <div 
                        className="date-picker-footer-button"
                        style = {{
                            width: "50%",
                            textAlign: "left"
                        }}
                        onClick={() => {OnExitEvent(duration, weightDuringExercise)}}
                    >{"Cancel"}
                    </div>
                    <div 
                        className="date-picker-footer-button"
                        style = {{
                            width: "50%",
                            textAlign: "right"
                        }}
                        onClick = {() => {OnClickEvent(duration, weightDuringExercise)}}
                    >{"Ok"}</div>
                </div>

                </div>

            <div 
                className="background-blur"
                onClick={()=>{OnExitEvent()}}
            ></div>
        </>

    ) 
}