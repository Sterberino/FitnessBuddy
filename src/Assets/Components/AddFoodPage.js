import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";
import DonutChart from "./donutChart";

import { DateContext, DiaryContext } from "../../App.js";

import '../Styles/footerStyles.css'

export default function AddFoodPage()
{
    const location = useLocation();
    const initialMealCategory = (location.state ? location.state.mealCategory : null);

    const [mealCategory, setMealCategory] = React.useState(initialMealCategory ? initialMealCategory : "Breakfast")
    const [food, setFood] = React.useState(location.state ? location.state.food : null)
    const[servings, setServings] = React.useState(1);
    const [changeMealPopupOpen, setChangeMealPopupOpen] = React.useState(false);
    const [nutrientsExpanded, setNutrientsExpanded] = React.useState(false)
    const [post, setPost] = React.useState(false);
    const [editMode, setEditMode] = React.useState(location.state && location.state.editMode ? location.state.editMode : false)

    const {currentDate, setCurrentDate} = React.useContext(DateContext); 
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext)

    React.useEffect(()=>{
        if(post)
        {
            let foodData = {
                ...food, 
                Servings: servings,
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


    const navigate = useNavigate()

    //Opens a popup for Changing the day that you want to associate the entry with (Breakfast, Lunch, Dinner, or Snacks)
    const TogglePopup = ()=>{
        setChangeMealPopupOpen(prev => !prev)
    }

    //Get the percentages for Carbs, Fat, Protein to display on the Food page.
    function GetFoodBreakdown()
    {
        const percentages = [0.35, 0.15, 0.5]
        return percentages;
    }

    //Gets the total values for Carbs, Fat, and Protein to display on the page.
    function GetMacros()
    {
        const macros = [100, 50, 300];
        return macros;
    }

    //Gets all of the more detailed nutrition information available for the food.
    function GetFullNutritionInfo()
    {
        const NutritionInfo = [
            {
                "Name" : "Carbohydrates",
                "currentAmount" : 100,
                "desiredAmount" : 240,
                "unit" : "G"
            },
            {
                "Name" : "Fat",
                "currentAmount" : 30,
                "desiredAmount" : 80,
                "unit" : "G"
            },
            {
                "Name" : "Protein",
                "currentAmount" : 70,
                "desiredAmount" : 140,
                "unit" : "G"
            },
            {
                "Name" : "Fiber",
                "currentAmount" : 8,
                "desiredAmount" : 38,
                "unit" : "G"
            },
            {
                "Name" : "Sugar",
                "currentAmount" : 2,
                "desiredAmount" : 63,
                "unit" : "G"
            },
            {
                "Name" : "Polyunsaturated Fat",
                "currentAmount" : 1,
                "desiredAmount" : 0,
                "unit" : "G"
            },
            {
                "Name" : "Monounsaturated Fat",
                "currentAmount" : 5,
                "desiredAmount" : 0,
                "unit" : "G"
            },
            {
                "Name" : "Cholesterol",
                "currentAmount" : 0,
                "desiredAmount" : 0,
                "unit" : "mg"
            },
            {
                "Name" : "Sodium",
                "currentAmount" : 220,
                "desiredAmount" : 2300,
                "unit" : "mg"
            },
            {
                "Name" : "Potassium",
                "currentAmount" : 216,
                "desiredAmount" : 3500,
                "unit" : "mg"
            },
            {
                "Name" : "Vitamin A",
                "currentAmount" : 20,
                "desiredAmount" : 100,
                "unit" : ""
            },
            {
                "Name" : "Vitamin C",
                "currentAmount" : 85,
                "desiredAmount" : 100,
                "unit" : ""
            },
            {
                "Name" : "Calcium",
                "currentAmount" : 4,
                "desiredAmount" : 100,
                "unit" : ""
            },
            {
                "Name" : "Iron",
                "currentAmount" : 4,
                "desiredAmount" : 100,
                "unit" : ""
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

    //We're going to get the relevant information and assign it to variables to avoid multiple function calls per render. 
    const percentages = GetFoodBreakdown();
    const foodMacros = GetMacros();

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
                    <div className="blue-title">{servings}</div>
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
                    <div className="blue-title">{food.servingSize ? food.servingSize : "1.0 cups"}</div>
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
                        >{"130"}</div>
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
                            {`${Math.trunc( percentages[0] * 100)}%`}
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
                            {`${Math.trunc( percentages[1] * 100)}%`}
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
                            {`${Math.trunc( percentages[2] * 100)}%`}
                        </div>

                        <div className="nutrient-amount">{`${foodMacros[2]} G`}</div>
                        <div className="nutrient-amount">{"Protein"}</div>
                    </div>

                </div>
                
                {/*------------------------------TODO HERE: IF editMode -> Delete Button---------------------------------------*/}

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
        </>
    )

}