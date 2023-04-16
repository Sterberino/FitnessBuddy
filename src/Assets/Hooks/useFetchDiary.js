import React from "react";
import { DateContext, DiaryContext } from "../../App.js";

/*This hook will allow use to retrieve all diary information from the current day.
We should be able to use the dateContext in this hook since all components that call it
are within the app that provides the context.*/

export default function useFetchDiary()
{
    const [fetchingDiaryInfo, setFetchingDiaryInfo] = React.useState(true);
    const {currentDate, setCurrentDate} = React.useContext(DateContext);
    const {diaryInfo, setDiaryInfo} = React.useContext(DiaryContext);

    React.useEffect(()=>{    
        if((fetchingDiaryInfo && diaryInfo.currentDate !== currentDate) || diaryInfo.requiresUpdate)
        {
            const exerciseEntries = fetch('../api/v1/exerciseDiary?' + new URLSearchParams({
                DiaryDate: currentDate
            }), 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            const foodEntries = fetch('../api/v1/foodDiary?'+ new URLSearchParams({
                DiaryDate: currentDate
            }), 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            
            const weightEntries = fetch('../api/v1/weightDiary?', 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            const waterEntries = fetch('../api/v1/waterDiary?' + new URLSearchParams({
                DiaryDate: currentDate
            }), 
            {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    "authorization" : `Bearer ${localStorage.getItem('token')}`
                }
            });
    
            Promise.all([exerciseEntries, foodEntries, weightEntries, waterEntries])
                .then((res) => Promise.all(res.map(r => r.json())))
                .then(([exerciseEntries, foodEntries, weightEntries, waterEntries]) => {
                    const newDiaryInfo = {
                        ...diaryInfo, 
                        foodEntries: foodEntries.foods, 
                        exerciseEntries: exerciseEntries.exercises, 
                        weightEntries: weightEntries.weightEntries,
                        waterEntries: waterEntries.waterEntries,
                        currentDate: currentDate,
                        requiresUpdate: false};


                    //For each food entry, we scale the values by the entry's serving size and number of servings
                    for(let i = 0; i < foodEntries.foods.length; i++)
                    {
                        let servingsFactor = (foodEntries.foods[i].serving_size_g / 100) * foodEntries.foods[i].Servings 
                        foodEntries.foods[i] = {
                            ...foodEntries.foods[i],
                            calories: foodEntries.foods[i].calories * servingsFactor,
                            fat_total_g: foodEntries.foods[i].fat_total_g * servingsFactor,
                            fat_saturated_g: foodEntries.foods[i].fat_saturated_g * servingsFactor,
                            protein_g: foodEntries.foods[i].protein_g * servingsFactor,
                            sodium_mg: foodEntries.foods[i].sodium_mg * servingsFactor,
                            potassium_mg: foodEntries.foods[i].potassium_mg * servingsFactor,
                            cholesterol_mg: foodEntries.foods[i].cholesterol_mg * servingsFactor,
                            carbohydrates_total_g: foodEntries.foods[i].carbohydrates_total_g * servingsFactor,
                            fiber_g: foodEntries.foods[i].fiber_g * servingsFactor,
                            sugar_g: foodEntries.foods[i].sugar_g * servingsFactor,
                        }

                    }
                    setDiaryInfo(newDiaryInfo);
    
                })
                .then(res=> {
                    setFetchingDiaryInfo(false);
                })
        }  
        else{
            const newDiaryInfo = {
                ...diaryInfo, 
                currentDate: currentDate,
                requiresUpdate: false};
            setDiaryInfo(newDiaryInfo);
            setFetchingDiaryInfo(false)
        }
    }, [fetchingDiaryInfo])

    return [fetchingDiaryInfo, setFetchingDiaryInfo];
}