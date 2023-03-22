import React from "react";


export default function FoodsHighestIn({Parameter, style})
{
    function GetFoods()
    {
        const Foods = [
            {
                "name" : "Rice Bowl",
                "amount" : "485"
            },
            {
                "name" : "Tomato Soup",
                "amount" : "185"
            }
        ]

        const FoodDivs = Foods.map((item, index)=> {
            return (
                <div className="row-flex" key ={index}>
                    <div className="title">{item.name}</div>
                    <div className="nutrient-amount">{item.amount}</div>
                </div>
            )
        })

        return FoodDivs;
    }


    return(
        <div className='displayCard'
            style = {style ? style : null}>
            <div 
                className="title"
                style = {{
                    textAlign : "left",
                    width : "90%",
                    marginTop: "10px",
                    fontSize : "1.2em"
                }}
            >
            {`Foods Highest in ${Parameter}`}
            </div>
            <div className="nutrient-keys-divider"></div>
          
            {GetFoods()}
    </div>
    
    )
}