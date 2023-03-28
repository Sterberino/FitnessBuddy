import React from "react";
import '../Styles/spinnerStyles.css'

export default function Spinner()
{
    return (
        <div 
            className="lds-spinner"
            style= {{
                transform: "scale(0.3)"
            }}
        >
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}