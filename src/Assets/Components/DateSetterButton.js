import React, { useContext } from "react";
import Dashboard from "./Dashboard.js";
import {dayNames, monthNames} from "./DatePicker";
import DatePicker from "./DatePicker"
import { DateContext } from "../../App.js";

export default function DateSetterButton()
{
    const [datepickerOpen, setDatepickerOpen] = React.useState(false);
    const {currentDate, setCurrentDate} = useContext(DateContext);

    const ToggleDatePicker = () => {
        if(datepickerOpen)
        {
            document.body.style.overflow = "scroll"
            setDatepickerOpen(prev => !prev)
        }
        else{
            document.body.style.overflow = "hidden"
            setDatepickerOpen(prev => !prev)
        }
    }

    const GetButtonText = ()=> {
        const date = new Date();
        if(currentDate.getMonth() === date.getMonth() && currentDate.getFullYear() === date.getFullYear())
        {
            if(currentDate.getDate() === date.getDate())
            {
                return "Today"
            }
            else if(currentDate.getDate() - 1 === date.getDate())
            {
                return "Tomorrow"
            }
            else if(currentDate.getDate() + 1 === date.getDate())
            {
                return "Yesterday"
            }
            else{
                return `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
            }
        }
        else{
            return `${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
        }
    }

    return(
        <div>
            <div 
                className="title"
                onClick={()=> {ToggleDatePicker()}}
                style = {{
                    fontSize : "1.1em",
                    cursor: "pointer",
                    marginLeft: "0"
                }}
            >{GetButtonText()}</div>
            {datepickerOpen && <div
                style = {{
                    position: "fixed",
                    left : "50%",
                    top : "50%",
                    marginTop: "-230px",
                    marginLeft : "-185px",
                    zIndex :  "10"
                }}
            >
                <div
                    className="background-blur"
                    onClick={()=> {ToggleDatePicker()}}
                >    
                </div>
                <DatePicker
                    style = {{
                        zIndex : "11",
                        position: "fixed",
                        width : "360px",
                        height : "min-content",
                        maxHeight : "450px",
                        justifyContent : "flex-start"
                    }}
                    currentDate = {currentDate}
                    SubmitDateChange = {
                        (date) => {
                            ToggleDatePicker();
                            setCurrentDate(date);
                        }
                    }
                    CancelDateChange = {() => {ToggleDatePicker()}}  
                />
            </div>}
        </div>
    )
}