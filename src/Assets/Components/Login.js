import React from "react";
import { useNavigate, Navigate } from "react-router-dom";
import '../Styles/loginStyles.css'
import '../Styles/videoWrapper.css'

export default function Login()
{
    const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = React.useState('');
    const [passwordInput, setPasswordInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('')

    const [inputErrorMessage, setInputErrorMessage] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [register, setRegister] = React.useState(false);

    const [registrationRequest, setRegistrationRequest] = React.useState({
        userName: '',
        email: '',
        password: '',
        initialized: false
    })
    const [loginRequest, setLoginRequest] = React.useState({
        email: '',
        password: '',
        initialized: false
    })

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
        },
        {
            url: `${process.env.PUBLIC_URL}/Videos/pexels-Man-lifting-2.mp4`,
            overlayAlpha: 0.8
        },
        {
            url: `${process.env.PUBLIC_URL}/Videos/pexels-Woman-rock-climbing.mp4`,
            overlayAlpha: 0.8
        }
    ]

    const [backgroundVideo, setBackgroundVideo] = React.useState(backgroundVideos[Math.floor(Math.random() *backgroundVideos.length)])
    
    React.useEffect(()=>{
        if(registrationRequest.initialized === true && registrationRequest.password !== '' && registrationRequest.userName !== '' && registrationRequest.email !== '')
        {
            fetch('../api/v1/auth/register', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registrationRequest)
            })
                .then(res => res.json())
                .then(res => {
                    const token = res.token;
                    if(token)
                    {
                        localStorage.setItem('token', res.token)     
                    }               
                })
                .then(res=> navigate('../'))


            setRegistrationRequest({
                userName: '',
                email: '',
                password: '',
                initialized: false
            })
        }
        
    }, [registrationRequest])

    React.useEffect(()=>{
        if(loginRequest.initialized === true && loginRequest.password !== '' && loginRequest.email !== '')
        {
            fetch('../api/v1/auth/login', {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: loginRequest.email,
                    password: loginRequest.password
                })
            })
            .then(res => res.json())
            .then(res => {
                const token = res.token;
                if(token)
                {
                    localStorage.setItem('token', res.token)
                    navigate('../')
                }               
            })
            .then(res=> navigate('/'))

            setLoginRequest({
                email: '',
                password: '',
                initialized: false
            })
        }

    }, [loginRequest])


    function GetErrorDivs()
    {
        let errorLines = inputErrorMessage.split('\n')
        let errorDivs = errorLines.map((item, index) => <div className="error-text" key = {index} style = {{marginBottom : index === errorLines.length - 1 ? '10px' : '5px'}}>{item}</div>)
        
        return(
            <div
                style = {{
                  width: "100%",
                  height: "40px",
                  marginTop: "-20px",
                  marginBottom: "10px"
                }}
            >
                {errorDivs}
            </div>
        )
    }

    function LoginForm()
    {
        
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
                    onSubmit={(event)=> {
                        event.preventDefault()
                        setInputErrorMessage('');
                        
                        let canSend = true;
                        if(emailInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid email.')
                            canSend = false;
                        }
                        if(passwordInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid password.')
                            canSend = false;
                        }

                        if(canSend)
                        {
                            setLoginRequest({
                                email: emailInput,
                                password: passwordInput,
                                initialized: true
                            })
                        }
                    }}
                    className = "login-input-form"
                >
                <div className="field">
                <input 
                    className= {emailInput === '' ? 'empty': 'not-empty'}
                    
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
                    {passwordInput !== '' && 
                    <div 
                        className="login-show-password-button"
                        onClick={() => {setShowPassword(prev => !prev)}  }  
                    >{showPassword ? "Hide" : "Show"}</div>}
                    <input 
                        className= {passwordInput === '' ? 'empty': 'not-empty'}
                        style = {{
                            marginBottom : inputErrorMessage === '' ? '20px' : '0'
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
                            setInputErrorMessage('');
                        }}
                    >{"Register"}
                    </div>
                </div>

            </div>
        )
    }

    function RegisterForm()
    {

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
                    onSubmit={(event)=> {
                        event.preventDefault()
                        setInputErrorMessage('');
                        
                        let canSend = true;
                        if(emailInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid email.')
                            canSend = false;
                        }
                        if(usernameInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid username.')
                            canSend = false;
                        }
                        if(passwordInput === '')
                        {
                            setInputErrorMessage(prev=> prev+'\nPlease provide a valid password.')
                            canSend = false;
                        }

                        if(canSend)
                        {
                            setRegistrationRequest({
                                userName: usernameInput,
                                email: emailInput,
                                password: passwordInput,
                                initialized: true
                            })
                        }
                    }}
                    className = "login-input-form"
                >
                    <div className="field">
                        <input 
                            className= {emailInput === '' ? 'empty': 'not-empty'}
                 
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
                            marginBottom : (inputErrorMessage === '' ? '20px' : '0px')
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
                                width: "35%",
                                marginBottom: inputErrorMessage === '' ? '0' : '-25px'
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
                            setInputErrorMessage('');
                        }}
                    >{"Sign In"}
                    </div>
                </div>

            </div>
        )
    }

    if(localStorage.getItem('token'))
    {
        navigate(0)
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
                    top: "calc(50% - 200px)",
                    overflow: "hidden"
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
                {!register && <div className="title" style = {{background: "rgba(0,0,0,0)", color: "rgba(0,0,0,0)", textShadow: "0px 0px 0px rgba(0,0,0,0)"}}>
                    {LoginForm()}
                </div>}
                {register && <div className="title" style = {{background: "rgba(0,0,0,0)", color: "rgba(0,0,0,0)", textShadow: "0px 0px 0px rgba(0,0,0,0)"}}>
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