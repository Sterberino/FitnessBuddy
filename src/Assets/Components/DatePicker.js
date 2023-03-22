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

export default function DatePicker(props)
{
    const [currentMonth, setCurrentMonth] = React.useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
    //This is the current selected as (Year, Month, Day)
    const [currentDay, setCurrentDay] = React.useState(props.currentDate ? props.currentDate : new Date());

    const [yearSelectionOpen, setYearSelectionOpen] = React.useState(false);

    const [inputMode, setInputMode] = React.useState(false);

    const [dateInput, setDateInput] = React.useState(`${currentDay.getMonth() < 9 ? '0' : ''}${currentDay.getMonth() + 1}/${currentDay.getDate()}/${currentDay.getFullYear()}`);
    const [inputErrorMessage, setInputErrorMessage]= React.useState('');

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

    const HandleInput = ()=> {  
        let validInput = true;
        //Check for valid format(does it match mm/dd/yyyy ?)
        let datesInput = dateInput.split('/')
        if(datesInput.length != 3 || datesInput[0].length != 2 || datesInput[1].length != 2 || datesInput[2].length != 4)
        {
            setInputErrorMessage(`Invalid Format.\nUse mm/dd/yyyy.\nExample: ${currentDay.getMonth() < 9 ? '0' : ''}${currentDay.getMonth() + 1}/${currentDay.getDate()}/${currentDay.getFullYear()}`)
            validInput = false;
            return;
        }
        
        let datesInputAsNumbers = datesInput.map(item => {
            return Number(item)
        })
        
        datesInputAsNumbers.forEach(item => {
            if(isNaN(item))
            {
                let d = new Date();
                validInput = false;
                setInputErrorMessage(`Invalid Format.\nUse mm/dd/yyyy.\nExample: ${currentDay.getMonth() < 9 ? '0' : ''}${currentDay.getMonth() + 1}/${currentDay.getDate()}/${currentDay.getFullYear()}`)
                return;
            }
        })

        //Check for numbers out of range of our selectable dates
        if(datesInputAsNumbers[0] < 1 || datesInputAsNumbers[0] > 12)
        {
            validInput = false;
            setInputErrorMessage('Date input out of range.')
            return;
        }

        let year = new Date().getFullYear();
        if(datesInputAsNumbers[2] > year + 99 || datesInputAsNumbers[2] < year - 100)
        {
            validInput = false;
            setInputErrorMessage('Date input out of range.')
            return;
        }

        let daysInMonth = GetDaysInMonth(datesInput[2], datesInputAsNumbers[0] - 1);
        if(datesInputAsNumbers[1] < 1 || datesInputAsNumbers[1] > daysInMonth)
        {
            validInput = false;
            setInputErrorMessage('Date input out of range.')
            return;
        }


        if(validInput)
        {
            setInputErrorMessage('')
            setCurrentYear(datesInputAsNumbers[2])
            setCurrentMonth(datesInputAsNumbers[0] - 1)
            setCurrentDay(new Date(datesInputAsNumbers[2] , datesInputAsNumbers[0] - 1, datesInputAsNumbers[1]))
        }
    }

    const InputIsValid = ()=> {
        //Check for valid format(does it match mm/dd/yyyy ?)
        let datesInput = dateInput.split('/')
        if(datesInput.length != 3 || datesInput[0].length != 2 || datesInput[1].length != 2 || datesInput[2].length != 4)
        {
            return false;
        }
        
        let datesInputAsNumbers = datesInput.map(item => {
            return Number(item)
        })
        
        datesInputAsNumbers.forEach(item => {
            if(isNaN(item))
            {
                let d = new Date();
                return false;
            }
        })

        //Check for numbers out of range of our selectable dates
        if(datesInputAsNumbers[0] < 1 || datesInputAsNumbers[0] > 12)
        {
            return false;
        }

        let year = new Date().getFullYear();
        if(datesInputAsNumbers[2] > year + 99 || datesInputAsNumbers[2] < year - 100)
        {
            return false;
        }

        let daysInMonth = GetDaysInMonth(datesInput[2], datesInputAsNumbers[0] - 1);
        if(datesInputAsNumbers[1] < 1 || datesInputAsNumbers[1] > daysInMonth)
        {
            return false;
        }

        return true;
    }

    React.useEffect(()=>{
        let interval = null;
        HandleInput();
        
        
        return() => clearTimeout(interval)
        
    },[dateInput])

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

    function DatepickerHeader()
    {
        return (
            <div className="date-picker-selector">
                <div className="select-date">{"SELECT DATE"}</div>
                <div className="mid-section">
                    <div className="current-date">{`${monthNames[currentDay.getMonth()]} ${currentDay.getDate()}, ${currentDay.getFullYear()}`}</div>
                    <img 
                        src = { inputMode ? `${process.env.PUBLIC_URL}/Images/Calendar-Icon.png` : `${process.env.PUBLIC_URL}/Images/edit-pen-icon.png`}
                        onClick = {()=> {
                            setInputErrorMessage('')
                            setDateInput(`${currentDay.getMonth() < 9 ? '0' : ''}${currentDay.getMonth() + 1}/${currentDay.getDate()}/${currentDay.getFullYear()}`)
                            setInputMode(prev => !prev)
                        }}
                    />
                </div>
            </div>
        )
    }

    function DateInputMode()
    {
        function GetErrorDivs()
        {
            let errorLines = inputErrorMessage.split('\n')
            return errorLines.map((item, index) => <div className="error-text" key = {index} style = {{marginBottom : index === errorLines.length - 1 ? '20px' : '1px'}}>{item}</div>)
        }

        return (
            <form 
                onSubmit={(event)=> {event.preventDefault()}}
                className = "date-input-form"
            >
              <label htmlFor = "date-text-input">{"Date"}</label>
              <input 
                  style = {{
                        backgroundImage : `${inputErrorMessage !== '' ? `url(${process.env.PUBLIC_URL}/Images/exclamation-icon.png)` : ''}`,
                        backgroundRepeat : "no-repeat",
                        backgroundSize : "30px 30px",
                        marginBottom : inputErrorMessage === '' ? '20px' : ''
                    }}
                    autoComplete="off"
                    autoFocus = {true}
                    id = "date-text-input"
                    type="text" 
                    value={dateInput}
                    onChange={(e)=> { 
                        setDateInput( e.target.value)
                    }}
                />
                {inputErrorMessage !== '' && GetErrorDivs()}
               
            </form>
          )
    }
    let SubmitDateChange = props.SubmitDateChange ? props.SubmitDateChange : true;
    let CancelDateChange = props.CancelDateChange ? props.CancelDateChange : true;

    return (
        <div className= "displayCard"
            style = {props.style ? props.style  : null}
        >
            {DatepickerHeader()}
            {!inputMode && <>
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
            </>}

            {inputMode && <>
                {DateInputMode()}
            </>}

            {SubmitDateChange && typeof SubmitDateChange === "function" && CancelDateChange && typeof CancelDateChange === "function" &&
            <div className="date-picker-footer">
                <div 
                    className="date-picker-footer-button"
                    onClick={() => {CancelDateChange()}}
                >{"Cancel"}</div>
                <div 
                    className="date-picker-footer-button"
                    style={{
                        pointerEvents: inputErrorMessage === '' ? '' : "none",
                        color : inputErrorMessage === '' ? '' : "rgba(160,160,160,1)",
                    }}
                    onClick = {inputErrorMessage === '' ? () => {SubmitDateChange(currentDay)} : ()=>{}}
                >{"Ok"}</div>
            </div>}
        </div>

    )

    
}