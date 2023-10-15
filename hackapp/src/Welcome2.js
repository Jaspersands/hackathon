import React, { useEffect, useState } from "react";
//import login_cartoon from './Assets/login_cartoon_purple.svg';
//import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from './Assets/apartment_logo.svg';
import { useNavigate } from 'react-router-dom';




function Welcome() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginScreen, setIsLoginScreen] = useState(false);


    const handleUsernameChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    function toRegister() {
        //navigate('/createaccount')
        setIsLoginScreen(!isLoginScreen);
    }

   
    
    return (
        <div className="login_screen">
            <div className="left_login">
                <div className="greeting">Welcome to Subletify!</div>
                <div className="logo_box_login">
                </div>
                <div className="cartoon_container">
                    <img id="login_cartoon" src={logo} alt="" />
                </div>
                <div className="logo_box_login">
                </div>
                <div className="greeting">The best way to sublet your apartment</div>
            </div>
            {isLoginScreen &&
                <div className="login_container">
                    <div className="both_buttons">
                        <button id="login_register_off" type="submit" onClick={toRegister}>
                            Register
                        </button>
                        <button id="login_register_on" type="submit" >
                            Login
                        </button>
                    </div>
                    <div className="login_title_box">
                        <img id="login_logo" src={logo} alt="" />
                        <div className="login_title">Login</div>
                    </div>
                    <form className="login_form" /*onSubmit={handleSubmit}*/>
                        <div className="input_box_login">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={email}
                            /*onChange={handleUsernameChange}*/
                            />
                        </div>
                        <div className="input_box_login">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                            /*onChange={handlePasswordChange}*/
                            />
                        </div>
                        <button id="login_submit" type="submit">
                            Submit

                        </button>
                        
                    </form>

                </div>
            }
            {!isLoginScreen &&
                <div className="login_container">
                    <button id="login_register_on" type="submit" >
                            Register
                        </button>
                        <button id="login_register_off" type="submit" onClick={toRegister}>
                            Login
                        </button>
                    
                    <div className="login_title_box">
                        <img id="login_logo" src={logo} alt="" />
                        <div className="login_title">Register</div>
                    </div>
                    <form className="login_form" /*onSubmit={handleSubmit}*/>
                        <div className="input_box_login">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={email}
                            /*onChange={handleUsernameChange}*/
                            />
                        </div>
                        <div className="input_box_login">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                            /*onChange={handlePasswordChange}*/
                            />
                        </div>
                        <button id="login_submit" type="submit">
                            Submit

                        </button>
                        
                    </form>

                </div>
            }

        </div>
    );

};

export default Welcome;