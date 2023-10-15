import React, { useEffect, useState } from "react";
//import login_cartoon from './Assets/login_cartoon_purple.svg';
//import AsyncStorage from "@react-native-async-storage/async-storage";
import logo from './Assets/apartment_logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you've created AuthContext.js
import supabase from './supabase';




function Welcome() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginScreen, setIsLoginScreen] = useState(false);

    const { login, loggedIn } = useAuth();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [schoolEmail, setSchoolEmail] = useState('');
    const [schoolYear, setSchoolYear] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [passwordReg, setPasswordReg] = useState('');

    const [error, setError] = useState(null);

    const auth = useAuth(); // Assuming useAuth provides a method to check if the user is logged in

    useEffect(() => {
        
        // Check if the user is already logged in
        if (loggedIn !== -1) {
        // Redirect or handle as needed
        // Example: Redirect to the home page
        const currentUrl = window.location.href;
        const listingUrl = currentUrl+  'listings';
        window.location.href = listingUrl;
        }
    }, [auth]);


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

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
      
        // Your logic for handling the form submission
        const formData = {
          firstName,
          lastName,
          schoolEmail,
          schoolYear,
          phoneNumber,
          passwordReg,
        };
      
        try {
          setError(null);
          const { data: user, error: emailError } = await supabase
            .from('users')
            .select('*')
            .eq('email', schoolEmail)
            .single();
      
          if (!user) {
            console.log("hi2");
            const { data: insertData, error: insertError } = await supabase
              .from('users')
              .insert([
                {
                  firstname: formData.firstName,
                  lastname: formData.lastName,
                  email: formData.schoolEmail,
                  grade: formData.schoolYear,
                  phonenumber: formData.phoneNumber,
                  password: formData.passwordReg,
                },
              ]);
      
            if (insertError) {
              console.error('Error inserting data into the table:', insertError.message);
              setError('Error submitting the form. Please try again.');
            } else {
              console.log('Data inserted successfully');
              const { data: user, error: emailError } = await supabase
                .from('users')
                .select('*')
                .eq('email', schoolEmail)
                .single();

              login(user.id);
            }
          } else {
            setError('That email is already linked to an account');
            console.log("hi3");
          }
        } catch (error) {
          console.error('Error:', error.message);
          setError('An unexpected error occurred. Please try again.');
        }
      };


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
          setError(null);
    
          // Check if the email exists in the users database
          const { data: user, error: emailError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
    
          if (!user) {
            console.log("hi");
            setError('Account does not exist.');
            return;
            console.log("Byte");
          }
    
          // Email exists, now check the password
          const isValidPassword = user.password === password;
    
          if (!isValidPassword) {
            // Incorrect password
            setError('Incorrect password.');
            return;
          }
    
          // Login successful
          login(user.id); // Assuming your login function accepts the user ID as an argument
        } catch (error) {
          //console.error('Login error:', error.message);
          setError(error.message);
        }
      };
    
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
                        

                        <form className="login_form">
                            <div className="input_box_login">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input_box_login">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="button" onClick={handleLogin}>
                                Login
                            </button>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}


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
                    
                        <form className="login_form" onSubmit={handleRegisterSubmit}>
                            <div className="input_box_login">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input_box_login">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input_box_login">
                                <label htmlFor="schoolEmail">School Email</label>
                                <input
                                    type="email"
                                    id="schoolEmail"
                                    value={schoolEmail}
                                    onChange={(e) => setSchoolEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input_box_login">
                                <label htmlFor="schoolYear">School Year</label>
                                <select
                                    value={schoolYear}
                                    onChange={(e) => setSchoolYear(e.target.value)}
                                    required
                                >
                                    <option value="">Select School Year</option>
                                    <option value="freshman">Freshman</option>
                                    <option value="sophomore">Sophomore</option>
                                    <option value="junior">Junior</option>
                                    <option value="senior">Senior</option>
                                    <option value="grad student">Grad Student</option>
                                </select>
                            </div>
                            <div className="input_box_login">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input_box_login">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={passwordReg}
                                    onChange={(e) => setPasswordReg(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    


                </div>
            }
            {loggedIn}
        </div>
    );

};

export default Welcome;