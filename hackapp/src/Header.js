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

  function logoutHandler() {
    logout();
  }

  // Add an event handler to update the selected semester
  const handleSemesterChange = (event) => {
    const selectedSemester = event.target.value;

    setSemester(selectedSemester);
    console.log("working at selected semester");
    console.log(selectedSemester);

    // fetchTableData();
    // id love to update fetch table data here but am not sure how to do so best
  };

  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Subletify" />
        <div className="company_name">Supletify</div>
      </div>

      <div className="header__container">
        <div className="header__buttons">
          <select id="dropdownbutton2" className="input-padding" required>
            <option value={school}>{school}</option>
          </select>

          {/* <select id="dropdownbutton2" className="input-padding" required>
            <option value="">Select Semester</option>
            {semesters.map((semester, index) => (
              <option key={index} value={semester}>
                {semester}
              </option>
            ))}
          </select> */}
          <select
            id="dropdownbutton2"
            className="input-padding"
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
        </div>
      </div>
      <button className="new_listing" id="dropdownbutton2" onClick={toNewListings}>
        Create New Listing
      </button>
      <button className="logout_button" id="dropdownbutton2" onClick={logoutHandler}>
        Logout
      </button>
    </header>
  );
}

export default Header;
