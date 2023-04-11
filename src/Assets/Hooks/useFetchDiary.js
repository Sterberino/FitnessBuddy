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
        if(fetchingDiaryInfo && diaryInfo.currentDate !== currentDate)
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