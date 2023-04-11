import React from "react";
import '../Styles/nutritionPageStyles.css'
import '../Styles/bodyStyles.css'
import '../Styles/footerStyles.css'
import '../Styles/searchPageStyles.css'

import { useNavigate, useLocation } from "react-router-dom";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";
import Spinner from "./Spinner";
import { DiaryContext } from "../../App";

export default function SearchPage()
{
    const location = useLocation();
    const initialMealCategory = (location.state ? location.state.name : null);

    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);

    const [mealCategory, setMealCategory] = React.useState(initialMealCategory ? initialMealCategory : "Breakfast")
    const [searchInput, setSearchInput] = React.useState('');
    const [activeSearch, setActiveSearch] = React.useState('');
    const [searchResponseData, setSearchResponseData] = React.useState({foods : [], exercises: []});
    const [recentlyAddedItem, setRecentlyAddedItem] = React.useState('');
    const [changeMealPopupOpen, setChangeMealPopupOpen] = React.useState(false);
    const [SpinnerActive, setSpinnerActive] = React.useState(false)

    const SearchItems = ()=>{
        setSpinnerActive(true);
        setSearchResponseData({foods : [], exercises: []})
        if(mealCategory === 'Exercise')
        {
            fetch('../api/v1/search/exercise?' + new URLSearchParams({
                exerciseName : activeSearch,
                weight: diaryInfo.weightEntries[diaryInfo.weightEntries.length - 1] ? diaryInfo.weightEntries[diaryInfo.weightEntries.length - 1] : 160 
            }))
                .then(res => res.json())
                .then(res => {
                    if(res.error)
                    {
                        console.log(`Unable to perform API Request: ${res.error}`)
                    }
                    else{
                        console.log(res.payload)
                        setSearchResponseData(prev=> ({...prev, exercises : res.payload}) )
                    }
                    setSpinnerActive(false)
                })
        }
        else{
            fetch('../api/v1/search/food?' + new URLSearchParams({
                foodName : activeSearch,
            }))
                .then(res => res.json())
                .then(res => {
                    if(res.error)
                    {
                        console.log(`Unable to perform API Request: ${res.error}`)
                    }
                    else{
                        //console.log(res.payload)
                        setSearchResponseData(prev=> ({...prev, foods : res.payload}) )
                    }
                    setSpinnerActive(false)
                })
        }
        
    }

    React.useEffect(()=> {
        if(activeSearch !== '')
        {
            SearchItems();
        }
    },[activeSearch])

    //TODO : Add react useEffect that looks up user history

    React.useEffect(()=> {
        let timeout = null;
        if(recentlyAddedItem !== '')
        {
            let timeout = setTimeout(() => {
                setRecentlyAddedItem('') 
            }, 3000);
        }
        else{
            let timeout = setTimeout(() => {}, 1);
        }
        

        return(
            clearTimeout(timeout)
        )
    }, [recentlyAddedItem])

    const navigate = useNavigate();

    const TogglePopup = ()=> {
        setChangeMealPopupOpen(prev => !prev);
    } 

    const ChangeMealCategory = (category)=> {
        setMealCategory(category);
    }

    const PerformSearch = (query)=>{
        if(query !== '')
        {
            setActiveSearch(query);
        }
    }

    const GetSearchBarForm = ()=> {
        return(
           
                <form 
                    onSubmit={(event)=> {
                        event.preventDefault()
                        PerformSearch(searchInput)
                    }}
                    className = "search-input-form"
                >
                
                <input
                    autoComplete="off"
                    autoFocus = {true}
                    id = "search-input"
                    type="text" 
                    value={searchInput}
                    placeholder = {`Search for ${mealCategory === 'Exercise' ? 'an exercise' : 'a food'}`}
                    onChange={(e)=> { 
                        setSearchInput(e.target.value)
                    }}
                />
                
               
            </form>
           
            
        )
    }

    const AddItemToDiary = (item)=> {
        console.log(`Clicked Add One Button with item: ${item.name} ${item.info}`);
        setRecentlyAddedItem(item)
    }

    const GetSearchResults = ()=> {
        return mealCategory === 'Exercise' ? GetExerciseSearchResults() : GetFoodSearchResults();
    }

    function GetExerciseSearchResults()
    {
        const SearchResults = searchResponseData.exercises.map(item => {
            return ({
                name : item.exerciseName ? item.exerciseName.charAt(0).toUpperCase() + item.exerciseName.slice(1) : "Unknown Name",
                caloriesBurned : item.caloriesBurned ? item.caloriesBurned : 0,
                duration: item.duration ? item.duration : 60,
                met: item.met ? item.met : 0,
                weight: item.weightDuringExercise ? item.weightDuringExercise : 160, 
                info: `${Math.trunc(item.caloriesBurned)} cal, ${(item.duration ? item.duration : 60)} minutes`
            })
        })

        return SearchResults;
    }

    const GetFoodSearchResults = ()=> {
        const SearchResults = searchResponseData.foods.map(item => {
            return ({
                name : item.name ? item.name.charAt(0).toUpperCase() + item.name.slice(1) : "Unknown Name",
                calories : item.calories ? item.calories : 0,
                serving_size_g : item.serving_size_g ? item.serving_size_g : "100",
                fat_total_g: item.fat_total_g ? item.fat_total_g : 0,
                fat_saturated_g: item.fat_saturated_g ? item.fat_saturated_g: 0,
                protein_g: item.protein_g ? item.protein_g : 0,
                sodium_mg: item.sodium_mg ? item.sodium_mg : 0,
                potassium_mg: item.potassium_mg ? item.potassium_mg : 0,
                cholesterol_mg: item.cholesterol_mg ? item.cholesterol_mg : 0,
                carbohydrates_total_g: item.carbohydrates_total_g ? item.carbohydrates_total_g : 0,
                fiber_g: item.fiber_g ? item.fiber_g : 0,
                sugar_g: item.sugar_g ? item.sugar_g:  0,
                info: `${Math.trunc(item.calories)} cal, ${(item.serving_size_g ? item.serving_size_g / 100 * 3.5274 : 3.5274).toFixed(2)}oz Serving`
            })
        })

        return SearchResults;
    }

    const GetHistory = ()=> {
        const SearchResults = [
            {
                name : "Steak",
                info : "190 cal, Round Steak, 4.0 oz"
            },
            {
                name : "100% Whey Protein - Vanilla",
                info : "130 cal, Muscle Milk, 1.0 Scoop"
            }
        ]

        return SearchResults;
    }

    const OpenAddFoodPage = (food)=>{
        navigate(
            {
                pathname: 'Result',
                search: `id=${food.name}`,
                
            }, 
            {
                state:{
                    mealCategory: mealCategory,
                    food: food
                }
            })
    }

    function GetSearchCards(input)
    {
        const divs = input.map((item, index) => {
            return (
                <div 
                    className="displayCard"
                    key = {index}
                    style = {{
                        padding: "5px",
                        cursor : "pointer",
                    }}
                    onClick = {()=> { OpenAddFoodPage(item)}}
                >
                    <div className="row-flex">
                        <div 
                            className="column-flex"
                            style={{
                                alignItems: "left",
                                justifyContent: "left"
                            }}
                        >
                            <div 
                                className="title" 
                                style = {{
                                    textAlign: "left", 
                                    marginLeft: 0, 
                                    width: "100%", 
                                    marginTop: "-5px",
                                    marginBottom: "5px", 
                                    maxWidth: "240px"
                                }}>{item.name}</div>
                            <div className="nutrient-amount" style = {{textAlign: "left", marginLeft: 0, width: "100%"}}>{item.info}</div>
                        </div>

                        <div className="search-item-add-button">
                            <img 
                                className="cancel-search-icon" 
                                alt=""
                                src={`${process.env.PUBLIC_URL}/Images/Plus-Sign.png`}
                                style = {{
                                    left: "5px"
                                }}
                                onClick = {
                                    (event) => {
                                        event.stopPropagation();    
                                        AddItemToDiary(item)
                                    }
                                }
                            />
                        </div>
                    </div>
                </div>
            )
        })

        return divs;
    }

    return (
        <div
            style={{
                width: "100%"
            }}
        >
            <div 
                className="displayCard headercard"
                style ={{
                    marginTop: "-5px",
                    paddingBottom : "15px"
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
                        alt=""
                        style = {{
                            margin: "0"
                        }}    
                        onClick = {()=>{navigate('/Diary')}}
                    />
                    <div 
                        className="blue-title"
                        style = {{
                            textAlign: "center",
                            marginLeft : "-20px",
                            ...(mealCategory === 'Exercise' ? {pointerEvents : 'none'} : '')
                        }}
                        onClick = {()=> {mealCategory != 'Exercise' && TogglePopup()}}
                    >{mealCategory}</div>
                    <div></div>
                </div>

                <div className="search-bar">    
                    <img className="search-icon" src= {`${process.env.PUBLIC_URL}/Images/search-icon.png`} />
                        {GetSearchBarForm()}
                    {activeSearch !== '' && <img 
                        className="cancel-search-icon" 
                        src = {`${process.env.PUBLIC_URL}/Images/x-icon-blue.png`} 
                        onClick = {()=>{
                            setActiveSearch('')
                            setSearchInput('')
                        }}    
                    />}
                </div>
            </div>
            <div 
                className="row-flex"
                style = {{
                    padding: "2px"
                }}
            >
                <div 
                    className="title"
                    style = {{
                        fontSize: "1.1em"
                    }}
                >{`${activeSearch !== '' ? "Search Results" : "History"}`}
                </div>
                {recentlyAddedItem !== '' && 
                <div
                    className="blue-title item-added-notification"
                    style = {{pointerEvents: "none"}}
                >{`Successfully Added ${mealCategory !== 'Exercise' ? 'Food' : 'Exercise'}!`}</div>}
            </div>
            
            {activeSearch !== '' && GetSearchCards(GetSearchResults())}
            {activeSearch === '' && GetSearchCards(GetHistory())}
            {changeMealPopupOpen && 
                <ChangeMealCategoryPopup 
                    OnClickEvent={(category)=>{
                        ChangeMealCategory(category)
                        TogglePopup();
                    }}
                    OnExitEvent = {()=>{TogglePopup()}}
                />} 

            {SpinnerActive &&  <Spinner style = {{
                alignSelf: 'center',
                //50% of container width - half of the width of the spinner
                left: 'calc(50% - 40px)'
            }}/>}
        </div>
    )


}