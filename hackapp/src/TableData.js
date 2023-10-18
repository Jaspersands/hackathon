//TableData.js
import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import ApartmentCard from './components/apartmentcard';
import ApartmentPopup from './listingPopUp';
import { useNavigate } from 'react-router-dom';
import { useSemester } from './SemesterContext';
import "./index.css";
import { useAuth } from './AuthContext';

function TableData() {
  const [data, setData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const auth = useAuth();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const {loggedIn } = useAuth();
  const [isRender, setIsRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [email, setEmail] = useState('');
  const universities = {
    'wustl.edu': 'WashU',
    'uchicago.edu': 'UChicago',
    'ucla.edu': 'UCLA',
    'usc.edu': 'USC',
    'slu.edu': 'SLU',
    '': 'Empty!'
  };
  const [school, setSchool] = useState('');


  // useEffect(() => {
  //   async function fetchDataAndSetSchool() {
  //     try {
  //       const { data, error } = await supabase
  //         .from('users')
  //         .select('*')
  //         .eq('id', loggedIn)
  //         .single();

  //       if (data) {
  //         const parts = data.email.split('@');
  //         if (parts.length === 2) {
  //           setEmail(parts[1]);
  //           setSchool(universities[parts[1]]);
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   }

  //   fetchDataAndSetSchool();
  //   console.log("email");
  //   console.log(email);
  //   async function fetchTableData() {
  //     console.log("async function");
  //     console.log(semester);
  //     if (semester && school) {
  //       const { data, error } = await supabase
  //         .from('listings')
  //         .select('*')
  //         .eq('semester', semester)
  //         .eq('school', school);

  //       if (error) {
  //         console.error('Error fetching data:', error);
  //       } else {
  //         setData(data);
  //       }
  //     } else {
  //       const { data, error } = await supabase
  //         .from('listings')
  //         .select('*')
  //         .eq('school', school);

  //       if (error) {
  //         console.error('Error fetching data:', error);
  //       } else {
  //               console.log(data);
  //         setData(data);
  //       }
  //     }
  //   }

  //   fetchTableData();
  // }, [semester]); // Add "semester" as a dependency
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
          setEmail(parts[1]);
          setSchool(universities[parts[1]]);
          setIsLoading(false);

        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  async function fetchTableData() {
    try {
      console.log("async function");
      console.log(semester);
      console.log(school);
  


      let { data, error } = {};
      
      if (semester && school) {
        // If both semester and school are provided, filter based on both
        ({ data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('semester', semester)
          .eq('school', school));
      } else if (school) {
        // If only school is provided, filter based on school only
        ({ data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('school', school));
      } else {
        // If neither school nor semester is provided, fetch all data
        ({ data, error } = await supabase.from('listings').select('*'));
      }
  
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        console.log(data);
        setData(data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      await fetchDataAndSetSchool();
      await fetchTableData();
      setIsRender(true); // Set isRender to true after both API calls are completed
    };
  
    fetchData(); // Call the fetchData function
  
    // Check if the user is already logged in
    if (loggedIn === -1) {
      // Redirect or handle as needed
      // Example: Redirect to the home page
      navigate('/');
    }
  }, [loggedIn, semester, isRender]); 
  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p className="title">Available Listings</p>
      <div className="grid-container">
        <div className="card-grid">
          {data.map((apartment) => (
            <li key={apartment.id} onClick={() => { togglePopUp(); setSelectedApartment(apartment); }}>
              {isRender &&
              <ApartmentCard
                apartment={{
                  addressabrev: apartment.address,
                  semester: apartment.semester,
                  rent: apartment.price,
                  image: apartment.image_path
                }}
            
              />
              }
            </li>

          ))}
        </div>
      </div>
      {isPopUp && (
        <div className="popup-container">
          <div className="popUp-box">
            <div className="popUp-header">
              <button className="close-button" onClick={() => setIsPopUp(false)}>X</button>
            </div>
            <ApartmentPopup apartment={selectedApartment} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TableData;
