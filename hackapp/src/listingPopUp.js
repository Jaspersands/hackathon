// ApartmentPopup.js
// Import the MessagePopUp component
import MessagePopUp from './MessagePopUp';
import React, { useState } from 'react';
import './listingPopUp.css';
import houseImage from './Assets/houseimg.png';
import supabase from './supabase';
import { useNavigate } from 'react-router-dom';

function ApartmentPopup({ apartment }) {
  const navigate = useNavigate();
  const [showMessagePopup, setShowMessagePopup] = useState(false);

  if (!apartment) {
    return null;
  }

  const bucketName = 'dbbucket';
  const objectName = apartment.image_path;

  const { data, error } = supabase.storage.from(bucketName).getPublicUrl(objectName);

  console.log(data.publicUrl);

  const openMessagePopup = () => {
    setShowMessagePopup(true);
  };

  const closeMessagePopup = () => {
    setShowMessagePopup(false);
  };

  return (
    <div className="popup">
      <div className="popup-content">
      
        <img className="pop-up-image" src={data.publicUrl} alt="square-image"  />
        <div className="wrap">
          <p className="address">{apartment.address}</p>
          <p className="desc">Description: {`${apartment.description}`}</p>
          <p className="rent">Price: {`$${apartment.price}`}</p>
          <p className="availability">Availability: {apartment.semester}</p>
          <div className="message">Please message lister, if you are interested in subletting this apartment!</div>
          <button className="message-lister-button">Message Lister!</button>

        </div>

        <div className="message">
          Please message the lister if you are interested in subletting this apartment!
        </div>
        <button className="message-lister-button" onClick={openMessagePopup}>
          Message Lister!
        </button>

        {/* Conditionally render the MessagePopUp based on the state */}
        {showMessagePopup && (
          <MessagePopUp
            apartment={apartment}
            message="Prompt to send a message to the lister:"
            onClose={closeMessagePopup}
          />
        )}
      </div>
    </div>
  );
}

export default ApartmentPopup;
