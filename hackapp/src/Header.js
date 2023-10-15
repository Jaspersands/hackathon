// import React, { useState, useEffect } from 'react';
// import './Header.css';
// import logo from './Assets/apartment_logo.svg';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import supabase from './supabase';
// // import Welcome from './Welcome2';

// function Header() {
//   const [data, setData] = useState('');
//   const [semesters, setSemesters] = useState(['Spring 2024', 'Summer 2024', 'Fall 2024']);
//   const auth = useAuth();
//   const navigate = useNavigate();
//   const universities = {
//     'wustl.edu': 'WashU',
//     'uchicago.edu': 'UChicago',
//     'ucla.edu': 'UCLA',
//     'usc.edu': 'USC',
//     'slu.edu': 'SLU',
//     '': 'Empty!'
//   };
//   const [school, setSchool] = useState('')

//   // console.log(data);
//   // const email = data;

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const { data, error } = await supabase
//           .from('users')
//           .select('*')
//           .eq('id', auth.loggedIn)
//           .single();

//         if (data) {
//           const parts = data.email.split('@');
//           if (parts.length === 2) {
//             setData(parts[1]);
            
//           }
//         } 
//       } catch (error) {
//         // console.error('Error fetching data:', error);
//       }
//     }
    
    
//     fetchData();
//     console.log(data) 

//     // async function fetchSchools() {
//     //   try {
//     //     console.log("testing");
//     //     const { data, error } = await supabase
//     //       .from('schools')
//     //       .select('*');

        
//     //     //console.log(data);
//     //     console.log("working in fetchSchools");
//     //     setUniversities(data);
//     //     console.log(universities)
         
//     //   } catch (error) {
//     //     // console.error('Error fetching data:', error);
//     //   }
//     // }
//     // console.log(data)

    
//       //console.log("delay is done");
//       //fetchSchools();
      
//         // console.log(universities[item].email);
//         //console.log('working');
//         //console.log(data);
        
//           setSchool(universities[data])
        
//           //comment
//           //console.log("here")


        
      
//     // }, 1000); // 2000 milliseconds (2 seconds) delay

    

//   }, [auth.loggedIn]); // Run the effect whenever auth.loggedIn changes


//   //new

//   function toNewListings() {
//     navigate('/newlisting');
//   }

//   function logoutHandler() {
//     auth.logout();
//   }

//   return (
//     <header className="header">
//       <div className="header__logo">
//         <img src={logo} alt="Subletify" />
//         <div className="company_name">Supletify</div>
//       </div>

//       <div className="header__container">
//         <div className="header__buttons">
//           <select id="dropdownbutton2" className="input-padding" required>
//             <option value="Winter 2024">{school}</option>
//           </select>

//           <select id="dropdownbutton2" className="input-padding" required>
//             <option value="">Select Semester</option>
//             {semesters.map((semester, index) => (
//               <option key={index} value={semester}>
//                 {semester}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <button className="new_listing" id="dropdownbutton2" onClick={toNewListings}>
//         Create New Listing
//       </button>
//       <button className="logout_button" id="dropdownbutton2" onClick={logoutHandler}>
//         Logout
//       </button>
//     </header>
//   );
// }


// export default Header;

import React, { useState, useEffect } from 'react';
import './Header.css';
import logo from './Assets/apartment_logo.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import supabase from './supabase';

function Header() {
  const [data, setData] = useState('');
  const [semesters, setSemesters] = useState(['Spring 2024', 'Summer 2024', 'Fall 2024']);
  const auth = useAuth();
  const navigate = useNavigate();
  const universities = {
    'wustl.edu': 'WashU',
    'uchicago.edu': 'UChicago',
    'ucla.edu': 'UCLA',
    'usc.edu': 'USC',
    'slu.edu': 'SLU',
    '': 'Empty!'
  };
  const [school, setSchool] = useState('');

  useEffect(() => {
    async function fetchDataAndSetSchool() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', auth.loggedIn)
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
  }, [auth.loggedIn]);

  function toNewListings() {
    navigate('/newlisting');
  }

  function logoutHandler() {
    auth.logout();
  }

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

          <select id="dropdownbutton2" className="input-padding" required>
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

