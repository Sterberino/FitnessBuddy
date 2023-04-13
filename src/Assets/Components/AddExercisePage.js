import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";
import DonutChart from "./donutChart";

import { DateContext , DiaryContext} from "../../App.js";

import '../Styles/footerStyles.css'

export default function AddExercisePage()
{
    const location = useLocation();

    const [editMode, setEditMode] = React.useState(location.state && location.state.editMode ? location.state.editMode : false)
    const [exercise, setExercise] = React.useState(location.state && location.state.exercise ? location.state.exercise : null)
    const [post, setPost] = React.useState(false);
    const [deleteEntry, setDeleteEntry] = React.useState(false);
    const {currentDate, setCurrentDate} = React.useContext(DateContext); 
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext)

    React.useEffect(()=>{
        if(post)
        {
            let exerciseData = exercise;
            exerciseData.DiaryDate = currentDate;

            let fetchMethod = editMode ? "PATCH" : "POST";
            let fetchUrl = `../api/v1/exerciseDiary${editMode ? `/${exerciseData._id}` : ''}`

            fetch(fetchUrl, {
                method: fetchMethod,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(exerciseData)
            })
                .then(res => res.json())
                .then(res => {
                    setDiaryInfo(prev => {
                        let info = {
                            ...prev, 
                            requiresUpdate: true
                        };
                        
                        return info;
                    })
                    setPost(false);
                })
                .then(res=> {
                    if(editMode)
                    {
                        navigate('/Diary')
                    }
                    else{
                        navigate(
                            {
                                pathname: '/Search',
                            }, 
                            {
                                state:{
                                    name: 'Exercise',
                                    recentlyAddedItem: exercise.exerciseName
                                }
                            })
                    }
                    
                })

        }
    }, [post])

    React.useEffect(()=>{
        if(deleteEntry)
        {
            let exerciseID = exercise._id;
            let fetchMethod = "DELETE";
            let fetchUrl = `../api/v1/exerciseDiary/${exerciseID}`;

            fetch(fetchUrl, {
                method: fetchMethod,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res =>{
                    setDiaryInfo(prev => {
                        let info = {
                            ...prev, 
                            requiresUpdate: true
                        };
                        
                        return info;
                    })
                    setDeleteEntry(false);
                })
                .then(()=> {     
                    navigate('/Diary') 
                })

        }
    }, [deleteEntry])


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
                            if(editMode)
                            {
                                navigate('/Diary')   
                            }
                            else
                            {
                                navigate(
                                    {
                                        pathname: '/Search',
                                    }, 
                                    {
                                        state:{
                                            name: 'Exercise',
                                        }
                                    }
                                ) 
                            }    
                        }}
                    />
                    <div 
                        className="title"
                        style = {{
                            textAlign: "center",
                            marginLeft : "-20px"
                        }}
                        onClick = {()=> {TogglePopup()}}
                    >{`${editMode ? 'Edit' : 'Add'} Exercise`}</div>
                    
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
                >{exercise.exerciseName}</div>
               
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
                {editMode &&
                    <div className="nutrient-keys-divider"></div>
                }

                {editMode && 
                    <div 
                        className= "error-text-fancy"
                        style = {{
                            position: 'relative',
                            right: 'auto',
                            left: '37%',
                            marginTop: '5px',
                            marginBottom: '5px',
                            marginRight: '5px'
                        }}
                        onClick={()=>{
                            console.log('DELETE')
                            setDeleteEntry(true);
                        }}
                    >{"Delete Entry"}
                    </div>/*TODO HERE: IF editMode -> Delete Button*/
                }
            </div>  
        </>
    )

}