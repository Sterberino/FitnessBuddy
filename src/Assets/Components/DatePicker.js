import React from "react";

import '../Styles/datepickerStyles.css'

export const monthNames = [
    "January", "February", "March", 
    "April","May","June",
    "July","August","September",
    "October","November","December",
]

export const dayNames = [
    "Sun", "Mon", "Tue", 
    "Wed",  "Thu", "Fri",
    "Sat"
]

export default function DatePicker()
{
    const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear())
    const [currentDay, setCurrentDay] = React.useState(new Date().getDay())

    const GetRange = (start, end) =>
    {
        const length = Math.abs((end - start) / 1);
        const { result } = Array.from({ length }).reduce(
            ({result, current}) => ({
                result : [...result, current],
                current : current + 1,
            }), 
            {result : [], current: 0}
        );
        return result;
    }

    function GetSortedDays(year, month)
    {
        const dayIndex = new Date(year, month, 1).getDay();
        const firstHalf = dayNames.slice(dayIndex);

        return [...firstHalf, ...dayNames.slice(0, dayIndex)]
    }

    function GetDaysInMonth(year, month)
    {
        return new Date(year, month + 1, 0).getDate();
    }
    
    function NextMonth()
    {
        if(currentMonth < 11)
        {
            setCurrentMonth(prev => prev + 1);
        }
        else{
            setCurrentMonth(0);
            setCurrentYear(prev => prev + 1)
        }
    }

    function PreviousMonth()
    {
        if(currentMonth > 0)
        {
            setCurrentMonth(prev => prev -1);
        }
        else{
            setCurrentMonth(11);
            setCurrentYear(prev => prev -1)
        }
    }

    function SelectDay(index)
    {
        console.log(index)
        setCurrentDay(index);
    }


    return (
        <div className= "displayCard">
            <div className="row-flex">
                <img 
                    src= {`${process.env.PUBLIC_URL}/Images/Left-Arrow-Icon.png`} 
                    className = "footer-button" 
                    onClick={()=> {PreviousMonth()}}
                />
                <div className="title">{monthNames[currentMonth]} {currentYear}</div>
                <img 
                    src= {`${process.env.PUBLIC_URL}/Images/Right-Arrow-Icon.png`} 
                    className = "footer-button" 
                    onClick={()=> {NextMonth()}}
                />
            </div>
            
            <div className="seven-column-grid">
                {GetSortedDays(currentYear, currentMonth).map((day,index) => <div className="nutrient-amount" key = {index}>{day}</div>)}
                </div>
            <div className="seven-column-grid">
                {GetRange(1, GetDaysInMonth(currentYear, currentMonth) + 1).map(day => {
                    return <div 
                        className= {`day-button ${currentDay === day ? 'selected-day-button' : ''}`} 
                        key = {day}
                        onClick = {() => {SelectDay(day)}}
                        style = {{
                            cursor : "pointer"
                        }}
                    >
                        {day + 1}
                    </div>
                })}
            </div>
        </div>

    )

    
}