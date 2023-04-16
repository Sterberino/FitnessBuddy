import React from "react";
import { DiaryContext } from "../../App";

export default function FoodsHighestIn({Parameter, style})
{
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext)

    function MapParameterToBackendField()
    {
        switch(Parameter)
        {
            case 'Calories':
                return 'calories';
            case 'Protein':
                return 'protein_g';
            case 'Fat':
                return 'fat_total_g';
            case 'Carbohydrates':
                return 'carbohydrates_total_g';
            default:
                return '';
        }
    }

    function GetUnit()
    {
        switch(Parameter)
        {
            case 'Calories':
                return 'cal';
            default:
                return 'g';
        }
    }

    function GetFoods()
    {
        let entries = diaryInfo.foodEntries;
        const field = MapParameterToBackendField();
        let unit = GetUnit();

        entries = entries.map(item => {
            return {
                name: item.name,
                [field] : item[field] * ( 100 / item.serving_size_g) / item.Servings 
            }
        })
        entries.sort((a,b) => (a[field] < b[field]) ? 1 : ((b[field] > a[field]) ? -1 : 0))
        
        let Foods = entries.map(item => ({name: item.name, amount: `${item[field]} ${unit}` }));
        Foods.length = Foods.length > 2 ? 2 : Foods.length;

        const FoodDivs = Foods.map((item, index)=> {
            return (
                <div className="row-flex" key ={index}>
                    <div className="title">{item.name}</div>
                    <div className="nutrient-amount">{item.amount}</div>
                </div>
            )
        })

        if(FoodDivs.length === 0)
        {
            return <div className="title">{"It looks like you haven't logged any foods yet."}</div>
        }        
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
                    fontSize : "0.9em"
                }}
            >
            {`Foods Highest in ${Parameter} (per serving)`}
            </div>
            <div className="nutrient-keys-divider"></div>
          
            {GetFoods()}
    </div>
    
    )
}