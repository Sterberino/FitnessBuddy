import React from "react";
import '../Styles/nutritionPageStyles.css'
import '../Styles/bodyStyles.css'
import '../Styles/footerStyles.css'
import '../Styles/searchPageStyles.css'

import { useNavigate, useLocation } from "react-router-dom";
import { act } from "react-dom/test-utils";

export default function SearchPage()
{
    const location = useLocation();
    const initialMealCategory = (location.state ? location.state.name : null);

    const [mealCategory, setMealCategory] = React.useState(initialMealCategory ? initialMealCategory : "Breakfast")
    const [searchInput, setSearchInput] = React.useState('')
    const [activeSearch, setActiveSearch] = React.useState('');

    const navigate = useNavigate();

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
                            marginLeft : "-10px"
                        }}
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
                className="title"
                style = {{
                    fontSize: "1.1em"
                }}
            >{`${activeSearch !== '' ? "Search Results" : "History"}`}</div>

            
        </div>
    )


}