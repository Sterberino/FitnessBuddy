import React from "react";

import DateSetterButton from "./DateSetterButton.js";
import DiaryItemCard from "./DiaryItemCard.js"

import '../Styles/bodyStyles.css'
import '../Styles/footerStyles.css'
import '../Styles/datepickerStyles.css'

import { DiaryContext, DateContext } from "../../App.js";

import { useNavigate } from "react-router-dom";

export default function DiaryPage()
{
    const { currentDate, setCurrentDate} = React.useContext(DateContext);
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);
  
    const navigate = useNavigate();
 
    function NextDay()
    {
        
        setCurrentDate((prev) => {
            return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + 1);
        })    
    
    }

    function PreviousDay()
    {
        setCurrentDate((prev) => {
            return new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() -1);
        })    

    }

    function GetDailyCalories()
    {
        const vals = {
            goal : 2000,
            food : Math.trunc(diaryInfo.foodEntries.reduce(
                (accumulator, currentVal) => {
                    return accumulator+currentVal.calories
                },
                0
            )),
            exercise : Math.trunc(diaryInfo.exerciseEntries.reduce(
                (accumulator, currentVal) => {
                    return accumulator+currentVal.caloriesBurned
                },
                0
            ))
        }

        return vals;
    }

    const dailyCals = GetDailyCalories();

    return(
        <>
            <div 
                className="displayCard"
                style = {{
                    padding: "10px",
                    position: "fixed",
                    height : "80px",
                    width: "360px",
                    top: "-20px",
                    zIndex: "2"
                }}
            >
                <div 
                    className="row-flex"
                    style = {{
                        marginTop: "20px",
                        marginLeft: "0px"
                    }}
                >
                    <img 
                        src= {`${process.env.PUBLIC_URL}/Images/Left-Arrow-Icon.png`} 
                        alt=""
                        className = "footer-button" 
                        onClick={()=> { PreviousDay()}}
                    />
                    <DateSetterButton />
                    <img 
                        src= {`${process.env.PUBLIC_URL}/Images/Right-Arrow-Icon.png`} 
                        alt=""
                        className = "footer-button" 
                        onClick={()=> {NextDay()}}
                    />
                </div>
            </div>

            {/*--------------------------------------------------------------------------*/}
        
            <div 
                className="displayCard"
                style = {{
                    marginTop : "70px"   
                }}
            >
                <div 
                    className="title"
                    style = {{
                        width: "100%",
                        marginLeft: "50px",
                        marginTop: "5px"
                    }}
                >{"Calories Remaining"}</div>
                <div 
                    className="seven-column-grid"
                    style = {{
                        marginBottom : "-15px"
                    }}
                >
                    <div className="title">{dailyCals.goal}</div>
                    <div className="title">{"-"}</div>
                    <div className="title">{dailyCals.food}</div>
                    <div className="title">{"+"}</div>
                    <div className="title">{dailyCals.exercise}</div>
                    <div className="title">{"="}</div>
                    <div className="title">{dailyCals.goal - dailyCals.food + dailyCals.exercise}</div>


                    <div className="nutrient-amount">{"Goal"}</div>
                    <div className="title">{" "}</div>
                    <div className="nutrient-amount">{"Food"}</div>
                    <div className="title">{" "}</div>
                    <div className="nutrient-amount">{"Exercise"}</div>
                    <div className="title">{" "}</div>
                    <div
                        style = {{
                            position: "relative",
                            width: "100%",
                            height : "100%"
                        }}
                    >
                        <div 
                            className="nutrient-amount"
                            style = {{
                                position: "absolute",
                                left: 0,
                                right: 0,
                                bottom: 0,
                                top : "25%"
                            }}
                        >{"Remaining"}</div>

                    </div>
                    
                </div>
            </div>

            <DiaryItemCard ItemTitle={"Breakfast"}/>
            <DiaryItemCard ItemTitle={"Lunch"}/>
            <DiaryItemCard ItemTitle={"Dinner"}/>
            <DiaryItemCard ItemTitle={"Snacks"}/>

            <DiaryItemCard ItemTitle={"Exercise"}/>
            
            <div 
                className="row-flex"
                style = {{
                    width : "360px",
                    maxWidth : "360px",
                    minWidth : "360px", 
                    paddingLeft: "0px",
                    paddingRight: "0px",
                    marginLeft: '0px',
                    marginRight: '0px',
                    marginTop: '-5px',
                    marginBottom: '75px',
                    alignItems: 'flex-start',
                }} 
            >
                <DiaryItemCard 
                    style = {{
                        width : "177.5px",
                        maxWidth : "177.5px",
                        minWidth : "177.5px",
                        marginRight: "2.5px",
                    }} 
                    ItemTitle={"Water"}
                />
                <DiaryItemCard 
                    style = {{
                      
                        width : "177.5px",
                        maxWidth : "177.5px",
                        minWidth : "177.5px",
                        marginLeft: "2.5px",
                    }} 
                    ItemTitle={"Weight"}
                />
            </div>
            
        
        </>
    )
}