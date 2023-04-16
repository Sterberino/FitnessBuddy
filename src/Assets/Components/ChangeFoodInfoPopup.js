import React from "react";

import '../Styles/bodyStyles.css'
import '../Styles/searchPageStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/datepickerStyles.css'

//A small popup component that allows you to information associated with a food entry
export default function ChangeFoodInfoPopup({OnClickEvent, OnExitEvent, initialServings, initialServingSize})
{
    const [servings, setServings] = React.useState(initialServings);
    const [servingSize, setServingSize] = React.useState(initialServingSize);



    
    return(
        <>
            <div 
                className="displayCard change-meal-category-popup"
                style = {{
                    width: "180px",
                    height: "180px",
                    top: "calc(50% - 100px)",
                    left: "calc(50% - 90px)"
                }}
            >
                <form 
                    className= "date-input-form"
                    onSubmit={(event)=> {
                        event.preventDefault()
                    
                        if(OnClickEvent)
                        {
                            OnClickEvent(servings, servingSize);
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
                            id = "servings-text-input"
                            type="text" 
                        
                            value={servings}
                            onChange={(e)=> { 
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                                if(e.target.value.length < 5)
                                {
                                    setServings( e.target.value)
                                }
                            }}
                        />
                        <div className="title">{"servings of"}</div>
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
                            id = "servings-input"
                            type="text" 
                        
                            value={servingSize}
                            onChange={(e)=> { 
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                                if(e.target.value.length < 5)
                                {
                                    setServingSize( e.target.value)    
                                }
                            }} 
                        />
                        <div className="title">{"grams"}</div>
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
                        onClick={() => {OnExitEvent(servings, servingSize)}}
                    >{"Cancel"}
                    </div>
                    <div 
                        className="date-picker-footer-button"
                        style = {{
                            width: "50%",
                            textAlign: "right"
                        }}
                        onClick = {() => {OnClickEvent(servings, servingSize)}}
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