import React from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/loginStyles.css'
import '../Styles/videoWrapper.css'

export default function Login()
{
    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('')

    const [inputErrorMessage, setInputErrorMessage] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [register, setRegister] = React.useState(false);

    const backgroundVideos = [
        {
            url: `${process.env.PUBLIC_URL}/Videos/pexels-man-running.mp4`,
            overlayAlpha: 0.8
        },
        {
            url: `${process.env.PUBLIC_URL}/Videos/pexels-Woman-lifting-1.mp4`,
            overlayAlpha: 0.8
        },
        {
            url: `${process.env.PUBLIC_URL}/Videos/pexels-Woman-lifting-2.mp4`,
            overlayAlpha: 0.8
        },
        {
            url: `${process.env.PUBLIC_URL}/Videos/pexels-Man-lifting-1.mp4`,
            overlayAlpha: 0.8
        }
    ]

    const [backgroundVideo, setBackgroundVideo] = React.useState(backgroundVideos[Math.floor(Math.random() *backgroundVideos.length)])
    
    function LoginForm()
    {
        function GetErrorDivs()
        {
            let errorLines = inputErrorMessage.split('\n')
            return errorLines.map((item, index) => <div className="error-text" key = {index} style = {{marginBottom : index === errorLines.length - 1 ? '20px' : '1px'}}>{item}</div>)
        }

        return (
            <div>
                <div 
                    className="title"
                    style = {{
                        marginTop: "20px",
                        marginLeft: "0",
                        fontSize: "1.5em"
                    }}
                >{"Login"}</div>
                <form 
                    onSubmit={(event)=> {event.preventDefault()}}
                    className = "login-input-form"
                >
                <div className="field">
                <input 
                    className= {usernameInput === '' ? 'empty': 'not-empty'}
                    style = {{
                            backgroundImage : `${inputErrorMessage !== '' ? `url(${process.env.PUBLIC_URL}/Images/exclamation-icon.png)` : ''}`,
                            backgroundRepeat : "no-repeat",
                            backgroundSize : "30px 30px",

                        }}
                        autoComplete="off"
                        autoFocus = {false}
                        id = "username-text-input"
                        type="text" 
                    
                        value={usernameInput}
                        onChange={(e)=> { 
                            setUsernameInput( e.target.value)
                        }}
                    />
                    <label 
                        htmlFor = "username-text-input"
                        className= {usernameInput === '' ? 'empty' : 'not-empty'}
                    >{"Username"}</label>
                    </div>
                    <div className="field">
                    {passwordInput !== '' && 
                    <div 
                        className="login-show-password-button"
                        onClick={() => {setShowPassword(prev => !prev)}  }  
                    >{showPassword ? "Hide" : "Show"}</div>}
                    <input 
                        className= {passwordInput === '' ? 'empty': 'not-empty'}
                        style = {{
                            backgroundImage : `${inputErrorMessage !== '' ? `url(${process.env.PUBLIC_URL}/Images/exclamation-icon.png)` : ''}`,
                            backgroundRepeat : "no-repeat",
                            backgroundSize : "30px 30px",
                            marginBottom : inputErrorMessage === '' ? '20px' : ''
                        }}
                        autoComplete="off"
                        autoFocus = {false}
                        id = "password-text-input"
                        type= {showPassword ? "text" : "password"} 
                       
                        value={passwordInput}
                        onChange={(e)=> { 
                            setPasswordInput( e.target.value)
                        }}
                    />
                     <label 
                        htmlFor = "password-text-input"
                        className= {passwordInput === '' ? 'empty' : 'not-empty'}    
                    >{"Password"}</label>
                     </div>
                     {inputErrorMessage !== '' && GetErrorDivs()} 
                
                     <div 
                    className="row-flex"
                    style={{
                        width: "100%",
                        padding: "0",
                        marginTop: "-5px",
                        marginBottom: "50px",
                        flexDirection: "row-reverse"
                    }}
                >
                    <input 
                        type = "submit"
                        value={"Login"}
                    ></input>
                    </div>
                </form>
                
                <div 
                    className="row-flex"
                    style={{
                        padding: "0",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div className="title">{"Don't have an account?"}</div>
                    <div 
                        className="blue-title-simple"
                        onClick={()=>{
                            setRegister(true);
                            setEmailInput('');
                            setUsernameInput('');
                            setPasswordInput('');
                        }}
                    >{"Register"}
                    </div>
                </div>

            </div>
        )
    }

    function RegisterForm()
    {
        function GetErrorDivs()
        {
            let errorLines = inputErrorMessage.split('\n')
            return errorLines.map((item, index) => <div className="error-text" key = {index} style = {{marginBottom : index === errorLines.length - 1 ? '20px' : '1px'}}>{item}</div>)
        }

        return (
            <div>
                <div 
                    className="title"
                    style = {{
                        marginTop: "20px",
                        marginLeft: "0",
                        fontSize: "1.5em"
                    }}
                >{"Register"}</div>
                <form 
                    onSubmit={(event)=> {event.preventDefault()}}
                    className = "login-input-form"
                >
                    <div className="field">
                        <input 
                            className= {emailInput === '' ? 'empty': 'not-empty'}
                            style = {{
                                    backgroundImage : `${inputErrorMessage !== '' ? `url(${process.env.PUBLIC_URL}/Images/exclamation-icon.png)` : ''}`,
                                    backgroundRepeat : "no-repeat",
                                    backgroundSize : "30px 30px",

                                }}
                            autoComplete="off"
                            autoFocus = {false}
                            id = "email-text-input"
                            type="text" 
                            
                            value={emailInput}
                            onChange={(e)=> { 
                                setEmailInput( e.target.value)
                            }}
                        />
                        <label 
                            htmlFor = "email-text-input"
                            className= {emailInput === '' ? 'empty' : 'not-empty'}
                        >{"Email"}</label>
                    </div>
                    <div className="field">
                        <input 
                            className= {usernameInput === '' ? 'empty': 'not-empty'}
                            style = {{
                                backgroundImage : `${inputErrorMessage !== '' ? `url(${process.env.PUBLIC_URL}/Images/exclamation-icon.png)` : ''}`,
                                backgroundRepeat : "no-repeat",
                                backgroundSize : "30px 30px",

                            }}
                            autoComplete="off"
                            autoFocus = {false}
                            id = "username-text-input"
                            type="text" 
                        
                            value={usernameInput}
                            onChange={(e)=> { 
                                setUsernameInput( e.target.value)
                            }}
                        />
                        <label 
                            htmlFor = "username-text-input"
                            className= {usernameInput === '' ? 'empty' : 'not-empty'}
                        >{"Username"}</label>
                        </div>
                    <div className="field">
                    {passwordInput !== '' && 
                    <div 
                        className="login-show-password-button"
                        onClick={() => {setShowPassword(prev => !prev)}  }  
                    >{showPassword ? "Hide" : "Show"}</div>}
                    <input 
                        className= {passwordInput === '' ? 'empty': 'not-empty'}
                        style = {{
                            backgroundImage : `${inputErrorMessage !== '' ? `url(${process.env.PUBLIC_URL}/Images/exclamation-icon.png)` : ''}`,
                            backgroundRepeat : "no-repeat",
                            backgroundSize : "30px 30px",
                            marginBottom : inputErrorMessage === '' ? '20px' : ''
                        }}
                        autoComplete="off"
                        autoFocus = {false}
                        id = "password-text-input"
                        type= {showPassword ? "text" : "password"} 
                       
                        value={passwordInput}
                        onChange={(e)=> { 
                            setPasswordInput( e.target.value)
                        }}
                    />
                     <label 
                        htmlFor = "password-text-input"
                        className= {passwordInput === '' ? 'empty' : 'not-empty'}    
                    >{"Password"}</label>
                     </div>
                     {inputErrorMessage !== '' && GetErrorDivs()} 
                
                     <div 
                    className="row-flex"
                    style={{
                        width: "100%",
                        padding: "0",
                        marginTop: "-5px",
                        marginBottom: "50px",
                        flexDirection: "row-reverse"
                    }}
                >
                    <input 
                        style = {{
                            width: "35%"
                        }}
                        type = "submit"
                        value={"Register"}
                    ></input>
                    </div>
                </form>
                
                <div 
                    className="row-flex"
                    style={{
                        padding: "0",
                        marginTop: "10px",
                        marginBottom: "10px",
                    }}
                >
                    <div className="title">{"Already have an account?"}</div>
                    <div 
                        className="blue-title-simple"
                        onClick={()=>{
                            setRegister(false);
                            setEmailInput('');
                            setUsernameInput('');
                            setPasswordInput('');
                        }}
                    >{"Sign In"}
                    </div>
                </div>

            </div>
        )
    }



    return (
        <>
            <div className="displayCard"
                style = {{
                    zIndex : "11",
                    position: "fixed",
                    width : "360px",
                    height : "min-content",
                    maxHeight : "450px",
                    justifyContent : "flex-start",
                    left: "calc(50% - 180px)",
                    top: "calc(50% - 200px)"
                }}
            >
                 <div 
                    className="blue-title-simple"
                    style = {{
                        marginTop: "20px",
                        marginLeft: "0",
                        fontSize: "1.8em",
                        textAlign: "center",
                        pointerEvents: "none",
                        cursor: "text"
                    }}
                >{"Fitness Buddy"}</div>
                {/*Dont ask me how I screwed this up, but I wrapped
                the form in a title div. I styled it while is was wrapped in
                the div and keeping it doesn't ruin anything so I am leaving it.*/}
                {!register && <div className="title">
                    {LoginForm()}
                </div>}
                {register && <div className="title">
                    {RegisterForm()}
                </div>}

            </div>

            <div
                className="background-blur"
                style ={{
                    backdropFilter : "blur(1px)",
                    backgroundColor: `rgba(0,0,0,${backgroundVideo.overlayAlpha})`
                }}
            >    
            </div>

            <video
                loop
                muted
                autoPlay
                src={backgroundVideo.url}
                preload={'auto'}
                type={'video/mp4'}
                className= "fullscreen-video"
            >
            </video>
        </>
    )
}