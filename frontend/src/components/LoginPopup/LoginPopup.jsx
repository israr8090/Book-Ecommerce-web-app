import React, { useContext, useState } from 'react';
import axios from 'axios';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

function LoginPopup({ setShowLogin }) {

    const { url, setToken } = useContext(StoreContext);  //--getting from store

    const [currentState, setCurrentState] = useState("Login");  //--hook
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    //--onChangeHandler for input data
    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    };

    //--login button click function
    const onLogin = async (event) => {
        event.preventDefault();

        //--storing url in variable
        let newUrl = url;

        //--checking condition
        if (currentState === 'Login') {
            newUrl += "/api/user/login"
        }
        else {
            newUrl += "/api/user/register"
        }

        //--sending data to server
        const response = await axios.post(newUrl, data);

        //--checking response
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    };

    return (
        <>
            <div className="login-popup">
                <form className="login-popup-container" onSubmit={onLogin}>
                    <div className="login-popup-title">
                        <h2>{currentState}</h2>
                        <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <div className="login-popup-inputs">
                        {currentState === "Login" ? <></> : <input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required />}

                        <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required />
                        <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
                    </div>
                    <button type='submit'>{currentState === 'Sign Up' ? "Create account" : "Login"}</button>
                    <div className="login-popup-condition">
                        <input type="checkbox" required />
                        <p>By continuing, i agree to the terms of use & privacy policy.</p>
                    </div>
                    {currentState === "Login" ? <>
                        <p>Create a new account? <span onClick={() => setCurrentState("Sign Up")}>Click here</span></p>
                        <p className='or-google-login'>----or-----</p>
                        <img className='google-login' src={assets.glogin} alt="" />
                    </>
                        : <p>Already have an accout? <span onClick={() => setCurrentState("Login")}>Login here</span></p>}
                </form>

            </div>
        </>
    )
}

export default LoginPopup;