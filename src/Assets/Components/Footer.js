import React from "react";
import '../Styles/footerStyles.css'

export default function Footer({OnClickEvent})
{   
    function ClickTab(index)
    {
        OnClickEvent(index);
    }



    return(
        <div className='footer-card'>
            <div className='footer-button' onClick={ () => {ClickTab(0)}}>
                <img className='footer-icon' src={`${process.env.PUBLIC_URL}/Images/dashboard-icon.png`}/>
                <div className='footer-button-text'>{"Dahsboard"}</div>
            </div>

            <div className='footer-button' onClick={() => {ClickTab(1)}}>
                <img className='footer-icon' src={`${process.env.PUBLIC_URL}/Images/read-book-icon.png`}/>
                <div className='footer-button-text'>{"Diary"}</div>
            </div>
    
            <div className='footer-button' onClick={ () => {ClickTab(2)}}>
                <img className='footer-icon' src={`${process.env.PUBLIC_URL}/Images/pie-chart-icon.png`}/>  
                <div className='footer-button-text'>{"Nutrition"}</div>
            </div>
        </div>
    )
    
}