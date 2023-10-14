import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import TableData from './TableData';
import FileUploader from './FileUploader';
import Login from './Login';
import CreateAccount from './CreateAccount';
import Welcome from './Welcome';

function App() {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<WelcomeWithoutHeader><Welcome /></WelcomeWithoutHeader>} />
        <Route path="/login" element={<LoginWithoutHeader><Login /></LoginWithoutHeader>} />
        <Route path="/createaccount" element={<LoginWithoutHeader><CreateAccount /></LoginWithoutHeader>} />
        <Route path="/listings" element={<DefaultLayout><FileUploader/></DefaultLayout>} />
      </Routes>
    </Router>
  );
}

// Define the default layout with the header
const DefaultLayout = () => (
  <div>
    <Header />
    <div className="App">
      <header className="App-header">
        <h4>Supabase db Uploader</h4>
        <FileUploader />
      </header>
      <TableData />
    </div>
  </div>
);



// Define a layout without the header for the login page
const LoginWithoutHeader = ({ children }) => (
  <div>
    <Routes>
      <Route path="/" element={children} />
    </Routes>
  </div>
);

const WelcomeWithoutHeader = ({ children }) => (
  <div>
    <Routes>
      <Route path="/" element={children} />
    </Routes>
  </div>
);

export default App;
