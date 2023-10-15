// TableData.js
import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import ApartmentCard from './components/apartmentcard';
import ApartmentPopup from './listingPopUp';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import "./index.css"

function TableData() {
    const { login, loggedIn } = useAuth();
    console.log(loggedIn)
    const navigate = useNavigate();
    const auth = useAuth(); // Assuming useAuth provides a method to check if the user is logged in

    useEffect(() => {
      
      // Check if the user is already logged in
      if (loggedIn == -1) {
      // Redirect or handle as needed
      // Example: Redirect to the home page
      navigate('/');
      }
    }, [auth]);

    const [data, setData] = useState([]);
    const [selectedApartment, setSelectedApartment] = useState(null);
    const [isPopUp, setIsPopUp] = useState(false);


    useEffect(() => {
        async function fetchData() {
            const { data, error } = await supabase
                .from('listings')
                .select('*');

            if (error) {
                console.error('Error fetching data:', error);
            } else {
                setData(data);
            }
        }

        fetchData();
    }, []);

    

      const togglePopUp = () => {
        setIsPopUp(!isPopUp);
      }

    return (
        <div>
        <h1 >Available Listings</h1>
        <div className="grid-container">
            <div className="card-grid">
            {data.map((apartment) => (
                <li key={apartment.id} onClick={() => { togglePopUp(); setSelectedApartment(apartment); }}>
                    <ApartmentCard
                        apartment={{
                            addressabrev: apartment.address,
                            semester: apartment.semester,
                            rent: apartment.price,
                        }}
                    />
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
                <ApartmentPopup apartment={selectedApartment}  />
                <p>This is the popup content</p>
                </div>
               
            </div>
        )}  
        </div>
    );
}

export default TableData;