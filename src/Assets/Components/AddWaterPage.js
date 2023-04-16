import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";
import DonutChart from "./donutChart";
import { DateContext, DiaryContext } from "../../App.js";
import ChangeFoodInfoPopup from "./ChangeFoodInfoPopup.js";
import '../Styles/footerStyles.css'
import ChangeWaterInfoPopup from "./ChangeFieldInfoPopup.js";

export default function AddWaterPage()
{
    const location = useLocation();
    const { currentDate, setCurrentDate} = React.useContext(DateContext);
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);
  
    //Are we ready to POST to backend?
    const [post, setPost] = React.useState(false);
    //Are we editing an existing entry or making a new one?
    const [editMode, setEditMode] = React.useState(location.state && location.state.editMode ? location.state.editMode : false);
    //Do we want to delete the entry? (Set via button, then call useEffect to delete entry in backend with fetch)
    const [deleteEntry, setDeleteEntry] = React.useState(false);
    const [water, setWater] = React.useState(location.state &&  location.state.water? location.state.water : {volume: 1, DiaryDate: currentDate});
    //Popup for changing water info
    const [changeWaterPopupOpen, setChangeWaterPopupOpen] = React.useState(false);



    //useEffect calls for posting/ patching and deleting in backend
    React.useEffect(()=>{
        if(post)
        {
            let waterData = {
                ...water, 
                DiaryDate: currentDate
            };
            let fetchMethod = editMode ? "PATCH" : "POST";
            let fetchUrl = `../api/v1/waterDiary${editMode ? `/${waterData._id}` : ''}`

            fetch(fetchUrl, {
                method: fetchMethod,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(waterData)
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
                    //if(editMode)
                    //{
                        navigate('../Diary')   
                    //}
                    
                })
        }

    }, [post]);


    React.useEffect(()=>{
        if(deleteEntry)
        {
            let foodID = water._id;
            let fetchMethod = "DELETE";
            let fetchUrl = `../api/v1/waterDiary/${foodID}`;

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
        setChangeWaterPopupOpen(prev => !prev);
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
                            
                                navigate('../Diary')   
                            
                            
                        }}
                    />
                    <div 
                        className="title"
                        style = {{
                            textAlign: "center",
                            marginLeft : "-20px"
                        }}
                        onClick = {()=> {TogglePopup()}}
                    >{`${editMode ? 'Edit' : 'Add'} Water Entry`}</div>
                    
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
                        paddingBottom: "10px"
                    }}
                >
                    <div 
                        className="title"
                        style= {{
                            alignSelf: "left",
                            justifySelf: "left",
                            width: "100%",
                            padding: "10px",
                            fontSize: "1.1em"
                        }}
                >{"Water"}</div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className="row-flex"
                    style =  {{
                        paddingLeft: "15px" ,
                        paddingRight: "15px",
                        paddingBottom: "0px",
                        paddingTop: "0px",
                        marginBottom: "10px"
                    }}
                >
                    <div className="title">{"Volume"}</div>
                    <div 
                        className="blue-title"
                        onClick = {()=> {setChangeWaterPopupOpen(true)}}       
                    >{`${water.volume} L`}
                         
                    </div>
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
                            setDeleteEntry(true);
                        }}
                    >{"Delete Entry"}
                    </div>
                }
            </div>


            {changeWaterPopupOpen && <ChangeWaterInfoPopup 
                OnClickEvent = {
                    (volume)=> {
                        setWater(prev => ({...prev, volume: volume}));
                        TogglePopup();
                    }
                } 
                OnExitEvent = {
                    ()=> {
                        TogglePopup();
                    }
                } 
                initialVolume = {water.volume} 
                fieldName = {"liter(s)"}
                />}
        </>
    )


}