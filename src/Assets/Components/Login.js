import React from "react";
import { useNavigate } from "react-router-dom";


export default function Login()
{
    const navigate = useNavigate();
    navigate('/login');

    return (
        <div className="displayCard">
            <div className="title">{"LOGIN PAGE"}</div>

        </div>
    )
}