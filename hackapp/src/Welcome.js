// Login.js
import React, { useState } from 'react';
import './Welcome.css';

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
 

    return (
        <div className="welcome-container">
          <div className="welcome-content">
            <h1 className="welcome-heading">Welcome to Subletify!</h1>
            <form className="welcome-form">
              <button className="btn btn-primary welcome-btn" type="button" onClick={toRegister}>
                Create Account
              </button>
              <button className="btn btn-secondary welcome-btn" type="button" onClick={toLogin}>
                Login
              </button>
              <button className="btn btn-secondary welcome-btn" type="button" onClick={toListings}>
                Listings
              </button>
            </form>
          </div>
        </div>
      );
};


export default Welcome;
