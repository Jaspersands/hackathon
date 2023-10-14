// Login.js
import React, { useState } from 'react';
import supabase from './supabase';

const Login = () => {
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
      <h1>Login Page</h1>
      <form>
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
        <button type="button" onClick={newAccount}>
          Create new account
        </button>
      </form>
    </div>
  );
};

export default Login;
