import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import DonutChart from "./donutChart";

export default function AddFoodPage()
{
    const location = useLocation();
    const initialMealCategory = (location.state ? location.state.mealCategory : null);

    const [mealCategory, setMealCategory] = React.useState(initialMealCategory ? initialMealCategory : "Breakfast")
    const [food, setFood] = React.useState(location.state ? location.state.food : null)
    const[servings, setServings] = React.useState(1);

    const navigate = useNavigate()
    const TogglePopup = ()=>{}

    function GetFoodBreakdown()
    {
        const percentages = [0.35, 0.15, 0.5]
        return percentages;
    }

    function GetMacros()
    {
        const macros = [100, 50, 300];
        return macros;
    }

    const percentages = GetFoodBreakdown();
    const foodMacros = GetMacros();

    return(
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
                        onClick = {()=>{navigate('/Search')}}
                    />
                    <div 
                        className="title"
                        style = {{
                            textAlign: "center",
                            marginLeft : "-20px"
                        }}
                        onClick = {()=> {TogglePopup()}}
                    >{"Add Food"}</div>
                    
                    <div></div>
                </div>
            </div>

                <div className="displayCard">
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
                    <div className="blue-title">{location.state.mealCategory}</div>
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
            </div>

        </div>
    )

}