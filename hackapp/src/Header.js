import React, { useState } from 'react';
import './Header.css'; 
import logo from './Assets/apartment_logo.svg'
import { useNavigate } from 'react-router-dom';

function redirectToLogin() {
  const currentUrl = window.location.href;
  const loginUrl = currentUrl + 'login';
  window.location.href = loginUrl;
}
//comment 
function Header() {
  const [showDropdownUni, setShowDropdownUni] = useState(false);
  const [showDropdownSem, setShowDropdownSem] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('');

  const navigate = useNavigate();


  const universities = ['UCLA', 'USC', 'Duke']; //REPLACE WITH PULL FROM DATABASE
  const semesters = ['Spring 2024', 'Winter', 'Fall 2024']; //REPLACE WITH PULL FROM DATABASE

  const selectUniversity = (university) => {
    setSelectedUniversity(university);
    setShowDropdownUni(false);
  };

  const selectSemester = (semester) => {
    setSelectedSemester(semester);
    setShowDropdownSem(false);
  };


  const toggleDropdownUni = () => {
    setShowDropdownUni(!showDropdownUni);
  };

  const toggleDropdownSem = () => {
    setShowDropdownSem(!showDropdownSem);
  };

  function toNewListings() {
    navigate("/newlisting");
    //const currentUrl = window.location.href;
    //const loginUrl = currentUrl + 'listings';
    //window.location.href = loginUrl;
}
  
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Subletify" />
        <div className = "company_name">Subletify</div>
      </div>
      
      <div className="header__container">
        <div className="header__buttons">
       
                            <select
                                id = "dropdownbutton2" class = "input-padding" 
                                required
                            >
                                <option value="">Select School</option>
                                <option value="WashU">WashU</option>
                                <option value="USC">USC</option>
                                <option value="UCLA">UCLA</option>
                                <option value="SLU">SLU</option>
                                <option value="UChicago">UChicago</option>
                            </select>
                 
                            <select
                                id = "dropdownbutton2" class = "input-padding" 
                                required
                            >
                                <option value="">Select Semester</option>
                                <option value="Winter 2024">Winter 2024</option>
                                <option value="Spring 2024">Spring 2024</option>
                                <option value="Summer 2024">Summer 2024</option>
                                <option value="Fall 2024">Fall 2024</option>
                              
                            </select>
        </div>
        
      </div>
      <div className="new_listing" onClick={toNewListings} style={{ cursor: 'pointer', color: 'black' }}>
      Create New Listing
    </div>
      {/* <div className="header__user">
        <button className='login_button' onClick={redirectToLogin}>
          login
        </button>
      </div> */}
    </header>
  );
}

export default Header;