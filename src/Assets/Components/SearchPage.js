import React from "react";
import '../Styles/nutritionPageStyles.css'
import '../Styles/bodyStyles.css'
import '../Styles/footerStyles.css'
import '../Styles/searchPageStyles.css'

import { useNavigate, useLocation } from "react-router-dom";
import { act } from "react-dom/test-utils";
import ChangeMealCategoryPopup from "./ChangeMealCategoryPopup.js";

export default function SearchPage()
{
    const location = useLocation();
    const initialMealCategory = (location.state ? location.state.name : null);

    const [mealCategory, setMealCategory] = React.useState(initialMealCategory ? initialMealCategory : "Breakfast")
    const [searchInput, setSearchInput] = React.useState('');
    const [activeSearch, setActiveSearch] = React.useState('');
    const [recentlyAddedItem, setRecentlyAddedItem] = React.useState('');
    const [changeMealPopupOpen, setChangeMealPopupOpen] = React.useState(false);


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
                    placeholder = {"Search For a food"}
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
        const SearchResults = [
            {
                name : "Cabbage, green, raw",
                info : "28 cal, 1.0 cup, chopped"
            },
            {
                name : "Cabbage, red, raw",
                info : "28 cal, 1.0 cup, chopped"
            }
        ]

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
        navigate('Result', 
            {state:{
                mealCategory: mealCategory,
                food: food
            }})
        console.log(food)
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
                        cursor : "pointer"
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
                            <div className="title" style = {{textAlign: "left", marginLeft: 0, width: "100%"}}>{item.name}</div>
                            <div className="nutrient-amount" style = {{textAlign: "left", marginLeft: 0, width: "100%"}}>{item.info}</div>
                        </div>

                        <div className="search-item-add-button">
                            <img 
                                className="cancel-search-icon" 
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
                        style = {{
                            margin: "0"
                        }}    
                        onClick = {()=>{navigate('/Diary')}}
                    />
                    <div 
                        className="blue-title"
                        style = {{
                            textAlign: "center",
                            marginLeft : "-20px"
                        }}
                        onClick = {()=> {TogglePopup()}}
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
                >{"Successfully Added Food!"}</div>}
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
        </div>
    )


}