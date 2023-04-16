import React from "react";

import '../Styles/bodyStyles.css'
import '../Styles/searchPageStyles.css'
import '../Styles/nutritionPageStyles.css'
import '../Styles/datepickerStyles.css'

export default function ChangeWaterInfoPopup({initialVolume, OnClickEvent, OnExitEvent, fieldName})
{
    const [volume, setVolume] = React.useState(initialVolume ? initialVolume : 1);
    
    return(
        <>
            <div 
                className="displayCard change-meal-category-popup"
                style = {{
                    width: "160px",
                    height: "160px",
                    top: "calc(50% - 80px)",
                    left: "calc(50% - 80px)"
                }}
            >
                <form 
                    className= "date-input-form"
                    onSubmit={(event)=> {
                        event.preventDefault()
                    
                        if(OnClickEvent)
                        {
                            OnClickEvent(volume);
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
                            id = "volume-text-input"
                            type="text" 
                        
                            value={volume}
                            onChange={(e)=> { 
                                e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
                                if(e.target.value.length < 5)
                                {
                                    setVolume( e.target.value)
                                }
                            }}
                        />
                        <div className="title">{fieldName}</div>
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
                        onClick={() => {OnExitEvent()}}
                    >{"Cancel"}
                    </div>
                    <div 
                        className="date-picker-footer-button"
                        style = {{
                            width: "50%",
                            textAlign: "right"
                        }}
                        onClick = {() => {OnClickEvent(volume)}}
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