import React, { useEffect, useState } from 'react';
import './Header.css';
import logo from './Assets/apartment_logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import supabase from './supabase';
import { useSemester } from './SemesterContext';
// import fetchTableData from './TableData.js'

function Header() {
  const [data, setData] = useState('');
  const [semesters, setSemesters] = useState(['Spring 2024', 'Summer 2024', 'Fall 2024']);
  const navigate = useNavigate();
  const { logout,loggedIn } = useAuth();
  const universities = {
    'wustl.edu': 'WashU',
    'uchicago.edu': 'UChicago',
    'ucla.edu': 'UCLA',
    'usc.edu': 'USC',
    'slu.edu': 'SLU',
    '': 'Empty!'
  };
  const { semester, setSemester } = useSemester();
  const [school, setSchool] = useState('');
  
  useEffect(() => {
    async function fetchDataAndSetSchool() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', loggedIn)
          .single();

        if (data) {
          const parts = data.email.split('@');
          if (parts.length === 2) {
            setData(parts[1]);
            setSchool(universities[parts[1]]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchDataAndSetSchool();
  }, [loggedIn]);

  function toNewListings() {
    navigate('/newlisting');
  }

  function toMessages() {
    navigate('/message');
  }

  function logoutHandler() {
    logout();
  }

 
  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;

    setSemester(selectedSemester);
    console.log("working at selected semester");
    console.log(selectedSemester);

   
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Subletify" />
        <button className ="subletifybutton"><strong>Subletify </strong>{school}</button>
      </div>

      <div className="header__container">
        <div className="header__buttons">
          

          
          <select
            className="dropdownbutton3"
            id="input-padding-only"
            required
            value={semester}
            onChange={handleSemesterChange}
            >
            <option value="">Select Semester</option>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
         </select>
        
      
      <button className="dropdownbutton3" onClick={toNewListings}>
        Create New Listing
      </button>
      <button className="dropdownbutton3" onClick={toMessages}>
        Messages
      </button>
      <button className="dropdownbutton3" onClick={logoutHandler}>
        Logout
      </button>
      </div>
      </div>
    </header>
  );
}

export default Header;
