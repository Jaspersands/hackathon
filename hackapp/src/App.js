import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import TableData from './TableData';
import FileUploader from './FileUploader';
import Login from './Login';
import CreateAccount from './CreateAccount';

function App() {
  const myApartment = {
    addressabrev: "123 Main St",
    semester: "Fall",
    rent: 1200,
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginWithoutHeader><Login /></LoginWithoutHeader>} />
        <Route path="/createaccount" element={<LoginWithoutHeader><CreateAccount /></LoginWithoutHeader>} />
        <Route path="/" element={<DefaultLayout />} />
      </Routes>
    </Router>
  );
}

// Define the default layout with the header
const DefaultLayout = () => (
  <div>
    <Header />
    {/* <ApartmentCard apartment={myApartment} /> */}
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

export default App;
