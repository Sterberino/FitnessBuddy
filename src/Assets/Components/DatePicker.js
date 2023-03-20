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
    //This is the current selected as (Year, Month, Day)
    const [currentDay, setCurrentDay] = React.useState(new Date())

    const [yearSelectionOpen, setYearSelectionOpen] = React.useState(false);

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
        const date = new Date(currentYear, currentMonth, index)        
        setCurrentDay(date);
    }

    function SelectYear(year)
    {
        setCurrentYear(year);
    }

    //Utility function for checking for the same Year, Month, Day
    function DateIsSame(dateOne, dateTwo)
    {
        return(dateOne.getFullYear() === dateTwo.getFullYear() 
        && dateOne.getMonth() === dateTwo.getMonth() 
        && dateOne.getDate() === dateTwo.getDate())
    }

    //Maps each date to a button that can be selected.
    function GetDayButton(year, month, day)
    {
        const date = new Date(year, month, day);
        const currentDate = new Date();
        const selectedDate = currentDay      

        let classString = "";
        let fontClass = ""

        if(DateIsSame(date, selectedDate))
        { 
            classString= "day-button selected-day-button"
            fontClass = "selected"                    
        }
        else if(DateIsSame(date, currentDate) && !DateIsSame(date, selectedDate))
        {
            classString= "day-button current-day-button"        
            fontClass = "unselected"
        }
        else{
            classString = "day-button"
            fontClass = "unselected"
        }

        return <div 
            className= {classString}
            key = {day}
            onClick = {() => {SelectDay(day)}}
            style = {{
                cursor : "pointer",
                userSelect : "none"
            }}
        >
            <div className= {fontClass}>{day}</div>
        </div>

    }

    function ToggleYearSelection()
    {
        setYearSelectionOpen(prev => !prev);
    }

    function MonthlyCalendar()
    {
        return (
            <>
                <div className="seven-column-grid">
                    {GetSortedDays(currentYear, currentMonth).map((day,index) => <div className="title" key = {index}>{day}</div>)}
                </div>
                <div className="seven-column-grid">
                    {GetRange(1, GetDaysInMonth(currentYear, currentMonth) + 1).map(day => {
                        return GetDayButton(currentYear, currentMonth, day + 1)
                    })}
                </div>
            </>
        )
    }

    function GetYearButton(buttonYear)
    {
        const year = new Date().getFullYear();

        if(buttonYear === currentYear)
        {
            return <div 
                onClick={()=> {SelectYear(buttonYear)}}
                key={buttonYear}
                className = {"selected-year-button"} 
                >
                    <div className="selected">{buttonYear}</div>
                </div>  
        }
        else if(buttonYear === year)
        {
            return <div 
                onClick={()=> {SelectYear(buttonYear)}}
                key={buttonYear}
                className = {"current-year-button"} 
            >
                <div className="unselected">{buttonYear}</div>
            </div>  
        }
        else
        {
            return <div 
                onClick={()=> {SelectYear(buttonYear)}}
                key={buttonYear}
                className = {""} 
            >
                <div className="unselected">{buttonYear}</div>
            </div>  
        }
    }

    function YearSelectionMenu()
    {
        const year = new Date().getFullYear();
        let i = 0;
        let currentYearButton = null;
        const Arr = new Array(200);

        for(i; i < 200; i++)
        {
            let yearButton = GetYearButton(year - 100 + i);

            if(year - 100 + i === year)
            {
                currentYearButton = yearButton;
            }

            Arr[i] = yearButton
        }

        const YearMenu = <div className="year-menu">
            {Arr}
        </div>
        
        return (
            YearMenu
        )
    }


    return (
        <div className= "displayCard">
            <div className="date-picker-header">

                <div 
                    className="date-picker-header-section year-menu-button"
                    onClick={()=> {ToggleYearSelection()}}
                    style = {{
                        cursor : "pointer",
                        userSelect : "none"
                    }}
                >
                    <div className="title">{monthNames[currentMonth]} {currentYear}</div>
                    <img 
                        src= {`${process.env.PUBLIC_URL}/Images/Down-Arrow-Icon-B.png`} 
                        className = "footer-button" 
                        style = {{
                            pointerEvents: "none",
                            filter: "brightness(0.6)",
                            transform : (yearSelectionOpen ? "rotate(-180deg)" : "")
                        }}
                    />
                </div>
                
                {!yearSelectionOpen && <div className="date-picker-header-section">
                    <img 
                        src= {`${process.env.PUBLIC_URL}/Images/Left-Arrow-Icon.png`} 
                        className = "footer-button" 
                        onClick={()=> {PreviousMonth()}}
                    />
                    <img 
                        src= {`${process.env.PUBLIC_URL}/Images/Right-Arrow-Icon.png`} 
                        className = "footer-button" 
                        onClick={()=> {NextMonth()}}
                    />
                </div>}
            </div>
            
            {yearSelectionOpen ? YearSelectionMenu() : MonthlyCalendar()}
        </div>

    )

    
}