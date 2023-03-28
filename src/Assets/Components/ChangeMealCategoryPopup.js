import React from "react";

import '../Styles/bodyStyles.css'
import '../Styles/searchPageStyles.css'
import '../Styles/nutritionPageStyles.css'

//A small popup component that allows you to change the meal associated with an entry.
export default function ChangeMealCategoryPopup({OnClickEvent, OnExitEvent})
{
    const categories = ["Breakfast", "Lunch", "Dinner", "Snacks"]

    return(
        <>
            <div className="displayCard change-meal-category-popup">
                <div 
                    className = "title"
                    onClick={()=>{OnClickEvent(categories[0])}}
                    style = {{
                        cursor : "pointer"
                    }}
                >{categories[0]}    
                </div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className = "title"
                    onClick={()=>{OnClickEvent(categories[1])}}
                    style = {{
                        cursor : "pointer"
                    }}
                >{categories[1]}    
                </div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className = "title"
                    onClick={()=>{OnClickEvent(categories[2])}}
                    style = {{
                        cursor : "pointer"
                    }}
                >{categories[2]}    
                </div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className = "title"
                    onClick={()=>{OnClickEvent(categories[3])}}
                    style = {{
                        cursor : "pointer"
                    }}
                >{categories[3]}    
                </div>
            </div>

            <div 
                className="background-blur"
                onClick={()=>{OnExitEvent()}}
            ></div>
        </>

    ) 
}