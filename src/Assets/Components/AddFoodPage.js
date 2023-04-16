import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";
import DonutChart from "./donutChart";

import { DateContext, DiaryContext } from "../../App.js";
import ChangeFoodInfoPopup from "./ChangeFoodInfoPopup.js";
import '../Styles/footerStyles.css'

export default function AddFoodPage()
{
    //Route info and initial state info (current Food and editMode)
    const location = useLocation();
    const initialMealCategory = (location.state ? location.state.mealCategory : null);

    const [mealCategory, setMealCategory] = React.useState(initialMealCategory ? initialMealCategory : "Breakfast")
    const [food, setFood] = React.useState(location.state ? location.state.food : null)
  
    //Popup for changing meal category
    const [changeMealPopupOpen, setChangeMealPopupOpen] = React.useState(false);
    //Show more detailed nutrition info?
    const [nutrientsExpanded, setNutrientsExpanded] = React.useState(false)
    //Are we ready to POST to backend?
    const [post, setPost] = React.useState(false);
    //Are we editing an existing entry or making a new one?
    const [editMode, setEditMode] = React.useState(location.state && location.state.editMode ? location.state.editMode : false)
    //Do we want to delete the entry? (Set via button, then call useEffect to delete entry in backend with fetch)
    const [deleteEntry, setDeleteEntry] = React.useState(false);
    //Popup allowing us to change servings and serving size
    const [foodInfoPopupOpen, setFoodInfoPopupOpen] = React.useState(false)
    
    //App contexts
    const {currentDate, setCurrentDate} = React.useContext(DateContext); 
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext)

    //useEffect calls for posting/ patching and deleting in backend
    React.useEffect(()=>{
        if(post)
        {
            let foodData = {
                ...food, 
                Meal: mealCategory,
                DiaryDate: currentDate
            };
            let fetchMethod = editMode ? "PATCH" : "POST";
            let fetchUrl = `../api/v1/foodDiary${editMode ? `/${foodData._id}` : ''}`

            fetch(fetchUrl, {
                method: fetchMethod,
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(foodData)
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
                    else
                    {
                        navigate(
                            {
                                pathname: '/Search',
                            }, 
                            {
                                state:{
                                    name: mealCategory,
                                    recentlyAddedItem: food.name
                                }
                            }
                        )
                    }
                })
        }


    }, [post])
    React.useEffect(()=>{
        if(deleteEntry)
        {
            let foodID = food._id;
            let fetchMethod = "DELETE";
            let fetchUrl = `../api/v1/foodDiary/${foodID}`;

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
        setChangeMealPopupOpen(prev => !prev)
    }




    //Gets all of the more detailed nutrition information available for the food.
    function GetFullNutritionInfo()
    {
        const calorieGoal = GetCalorieGoal();
        const NutritionInfo = [
            {
                "Name" : "Carbohydrates",
                "currentAmount" : food.carbohydrates_total_g,
                "desiredAmount" : 240,
                "unit" : "G"
            },
            {
                "Name" : "Fat",
                "currentAmount" : food.fat_total_g,
                "desiredAmount" : 80,
                "unit" : "G"
            },
            {
                "Name" : "Protein",
                "currentAmount" : food.protein_g,
                "desiredAmount" : 140,
                "unit" : "G"
            },
            {
                "Name" : "Fiber",
                "currentAmount" : food.fiber_g,
                "desiredAmount" : 38,
                "unit" : "G"
            },
            {
                "Name" : "Sugar",
                "currentAmount" : food.sugar_g,
                "desiredAmount" : 63,
                "unit" : "G"
            },
            {
                "Name" : "Saturated Fat",
                "currentAmount" : food.fat_saturated_g,
                "desiredAmount" : 0,
                "unit" : "G"
            },
            {
                "Name" : "Cholesterol",
                "currentAmount" : food.cholesterol_mg,
                "desiredAmount" : 0,
                "unit" : "mg"
            },
            {
                "Name" : "Sodium",
                "currentAmount" : food.sodium_mg,
                "desiredAmount" : 2300,
                "unit" : "mg"
            },
            {
                "Name" : "Potassium",
                "currentAmount" : food.potassium_mg,
                "desiredAmount" : 3500,
                "unit" : "mg"
            },
        ]

        return NutritionInfo;
    }

    //Takes the information from the from GetFullNutritionInfo() function and converts it to a list of divs to display on the page
    function GetFullNutritionInfoDivs()
    {
        const nutrientinfo = GetFullNutritionInfo();

        const divs = nutrientinfo.map((item, index) => {
            return(
                <div
                    key = {index}
                    style = {{
                        width: "100%"
                    }}    
                >
                    <div className="nutrient-keys-divider"></div>
                    <div 
                        className="row-flex"
                        style =  {{
                            marginTop: "5px",
                            padding: "2px" ,
                        }}
                    >
                        <div className="title">{item.Name}</div>
                        <div className="nutrient-amount">{`${item.currentAmount} ${item.unit}`}</div>
                    </div>
                </div>
            )
        })

        return divs;
    }

    function SetFoodValues(servings, servingSize)
    {
        setFood(prev => {
            let servingsFactor = (servingSize/ prev.serving_size_g) * (servings / prev.Servings);
            return {
                ...prev, 
                Servings: servings, 
                serving_size_g: servingSize,
                calories: prev.calories * servingsFactor,
                fat_total_g: prev.fat_total_g * servingsFactor,
                fat_saturated_g: prev.fat_saturated_g * servingsFactor,
                protein_g: prev.protein_g * servingsFactor,
                sodium_mg: prev.sodium_mg * servingsFactor,
                potassium_mg: prev.potassium_mg * servingsFactor,
                cholesterol_mg: prev.cholesterol_mg * servingsFactor,
                carbohydrates_total_g: prev.carbohydrates_total_g * servingsFactor,
                fiber_g: prev.fiber_g * servingsFactor,
                sugar_g: prev.sugar_g * servingsFactor,
            }
        })
        setFoodInfoPopupOpen(false);
    }


    function GetCalorieGoal()
    {
        return 2000;
    }

    //TODO : function for getting the macro amounts
    function GetMacros()
    {
        const nutritionInformation = [
            food.carbohydrates_total_g,
            food.fat_total_g,
            food.protein_g
        ]
        return nutritionInformation;
    }

    //Get the percentages for Carbs, Fat, Protein to display on the Food page.
    function GetMacroBreakdown(nutritionInformation)
    {
        const total = nutritionInformation.reduce((accumulator, current) => accumulator+ current, 
        0)
        const percentages = nutritionInformation.map(item => item / total)
        
        return percentages;
    }

    //We're going to get the relevant information and assign it to variables to avoid multiple function calls per render. 
    const foodMacros = GetMacros();
    const percentages = GetMacroBreakdown(foodMacros);
    
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
                                navigate('/Search')    
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
                    >{`${editMode ? 'Edit' : 'Add'} Food`}</div>
                    
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
                >{food.name}</div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className="row-flex"
                    style =  {{
                        padding: "10px" ,
                        paddingBottom: "0px",
                        paddingTop: "0px"
                    }}
                >
                    <div className="title">{"Meal"}</div>
                    <div 
                        className="blue-title"
                        onClick = {()=> {setChangeMealPopupOpen(true)}}       
                    >{mealCategory}
                         
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
                    <div className="title">{"Number of Servings"}</div>
                    <div 
                        className="blue-title"
                        onClick={()=>{setFoodInfoPopupOpen(true)}}
                        >
                            {food.Servings}
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
                    <div className="title">{"Serving Size"}</div>
                    <div 
                        className="blue-title"
                        onClick={()=>{setFoodInfoPopupOpen(true)}}
                    >
                            {`${food.serving_size_g} G`}
                    </div>
                </div>
                <div className="nutrient-keys-divider"></div>
                <div 
                    className="row-flex"
                    style =  {{
                        paddingLeft: "20px" ,
                        paddingRight: "20px" ,
                        paddingBottom: "0px",
                        paddingTop: "0px"
                    }}
                >   
                    <div
                        style = {{
                            position: "relative",
                            width: "75px",
                            height: "75px"
                        }}
                    >
                        <DonutChart 
                            style = {{
                                margin: "0px",
                                top: "0"
                            }}
                            width={"75px"}
                            height = {"75px"}
                            nutritionInformation = {percentages}
                        />
                        <div
                            className="title"
                            style={{
                                position: "absolute",
                                top: "35%",
                                left: "0%",
                                textAlign: "center",
                                width: "100%",
                                margin: "0px"
                            }}
                        >{Math.trunc(food.calories)}</div>
                        <div
                            className="nutrient-amount"
                            style={{
                                position: "absolute",
                                top: "55%",
                                left: "0%",
                                textAlign: "center",
                                width: "100%",
                                margin: "0px"
                            }}
                        >{"Cal"}</div>
                    </div>
                    
                    <div className="column-flex">
                        <div 
                            className="nutrient-amount"
                            style = {{
                                color: " rgba(255,55,92,1)"
                            }}
                        >
                            {`${percentages[0].toPrecision(1) * 100}%`}
                        </div>

                        <div className="nutrient-amount">{`${foodMacros[0]} G`}</div>
                        <div className="nutrient-amount">{"Carbs"}</div>
                    </div>

                    <div className="column-flex">
                        <div 
                            className="nutrient-amount"
                            style = {{
                                color: " rgba(137,255,118,1)"
                            }}
                        >
                            {`${percentages[1].toPrecision(1) * 100}%`}
                        </div>

                        <div className="nutrient-amount">{`${foodMacros[1]} G`}</div>
                        <div className="nutrient-amount">{"Fat"}</div>
                    </div>

                    <div className="column-flex">
                        <div 
                            className="nutrient-amount"
                            style = {{
                                color: " rgba(72,222,255,1)"
                            }}
                        >
                            {`${percentages[2].toPrecision(1) * 100}%`}
                        </div>

                        <div className="nutrient-amount">{`${foodMacros[2]} G`}</div>
                        <div className="nutrient-amount">{"Protein"}</div>
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
                    </div>/*TODO HERE: IF editMode -> Delete Button*/
                }



                <img 
                src= {`${process.env.PUBLIC_URL}/Images/Down-Arrow-Icon-B.png`} 
                className = "footer-button" 
                style = {{
                    margin: "0px",
                    filter: "brightness(0.75)",
                    transform : (nutrientsExpanded ? "rotate(-180deg)" : "")
                }}
                onClick = {()=>{setNutrientsExpanded(prev=>!prev)}}
                />
                {nutrientsExpanded && GetFullNutritionInfoDivs()}
            </div>

            {changeMealPopupOpen && 
            <ChangeMealCategoryPopup 
                OnClickEvent={(category)=> {
                    setMealCategory(category)
                    TogglePopup()
                }}
                OnExitEvent = {()=>{TogglePopup()}}
            />}

            {foodInfoPopupOpen && <ChangeFoodInfoPopup 
                OnClickEvent = {
                    (servings, servingSize)=> {
                        SetFoodValues(servings, servingSize);
                    }
                } 
                OnExitEvent = {
                    (servings, servingSize)=> {
                        setFoodInfoPopupOpen(false)
                    }
                } 
                initialServings = {food.Servings} 
                initialServingSize = {food.serving_size_g}/>}
        </>
    )

}