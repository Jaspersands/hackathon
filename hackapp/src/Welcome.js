// Login.js
import React, { useState } from 'react';
import './Welcome.css';
import '../src/components/apartmentcard.css'
import logo from './Assets/apartment_logo_white.svg'

const Welcome = () => {
  //const [username, setUsername] = useState('');
  //const [password, setPassword] = useState('');


  
    // Implement your login logic here
    function toRegister() {
        const currentUrl = window.location.href;
        const loginUrl = currentUrl + 'createaccount';
        window.location.href = loginUrl;
    }

    function toLogin() {
        const currentUrl = window.location.href;
        const loginUrl = currentUrl + 'login';
        window.location.href = loginUrl;
    }

    function toListings() {
        const currentUrl = window.location.href;
        const loginUrl = currentUrl + 'listings';
        window.location.href = loginUrl;
    }
    // You can add more sophisticated login logic here, like API calls, etc.
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
    
      const handleLogin = () => {
        // Implement your login logic here
        console.log('Logging in with:', username, password);
        // You can add more sophisticated login logic here, like API calls, etc.
      };
    
      const newAccount = () => {
        // Implement your login logic here
        const currentUrl = window.location.href;
        const newUrl = currentUrl.replace('/login', '/createaccount');
        window.location.href = newUrl;
      };

    return (
      <div>
      <div className="welcome-message">
        <h1>Welcome to Subletify:</h1> {/* Large welcome message */}
        <h1>The best way to sublet your apartment</h1> {/* Large welcome message */}
      
      </div>
      <div className ="logocard" >
      <img className="logoimage" src={logo} alt="square-image"  />
    </div>
      <div className ="card" >
      <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={toRegister}>
          Create new account
        </button>
    </div>
    </div>
      );
};


export default Welcome;
