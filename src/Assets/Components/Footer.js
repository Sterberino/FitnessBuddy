import React from "react";
import '../Styles/footerStyles.css'

export default function Footer({OnClickEvent, initialIndex})
{   
    function ClickTab(clickIndex)
    {
        setIndex(clickIndex)
        OnClickEvent(clickIndex);
    }

    const [index, setIndex] = React.useState(initialIndex ? initialIndex : 0);


    return(
        <div className='footer-card'>
            <div className= {`footer-button ${index === 0 ? 'footer-button-selected' : ''}`} onClick={ () => {ClickTab(0)}}>
                <img className='footer-icon' src={`${process.env.PUBLIC_URL}/Images/dashboard-icon.png`}/>
                <div className='footer-button-text'>{"Dashboard"}</div>
            </div>

            <div className= {`footer-button ${index === 1 ? 'footer-button-selected' : ''}`} onClick={() => {ClickTab(1)}}>
                <img className='footer-icon' src={`${process.env.PUBLIC_URL}/Images/read-book-icon.png`}/>
                <div className='footer-button-text'>{"Diary"}</div>
            </div>
    
            <div className= {`footer-button ${index === 2 ? 'footer-button-selected' : ''}`} onClick={ () => {ClickTab(2)}}>
                <img className='footer-icon' src={`${process.env.PUBLIC_URL}/Images/pie-chart-icon.png`}/>  
                <div className='footer-button-text'>{"Nutrition"}</div>
            </div>
        </div>
    )
    
}