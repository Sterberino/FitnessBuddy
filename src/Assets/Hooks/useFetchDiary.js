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
        if(fetchingDiaryInfo)
        {
            console.log(currentDate)
        
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

            Promise.all([exerciseEntries, foodEntries])
                .then((res) => Promise.all(res.map(r => r.json())))
                .then(([exerciseEntries, foodEntries]) => {
                    const newDiaryInfo = {...diaryInfo, foodEntries: foodEntries.foods, exerciseEntries: exerciseEntries.exercises, requiresUpdate: false};
                    //console.log(JSON.stringify( newDiaryInfo));
                    setDiaryInfo(newDiaryInfo);

                })
                .then(res=> {
                    setFetchingDiaryInfo(false);
                })
        }
    }, [])

    return [fetchingDiaryInfo];
}