import React from 'react';
import './listingPopUp.css'
import houseImage from './Assets/houseimg.png';


function ApartmentPopup({ apartment, onClose }) {

    if (!apartment) {
        return null; 
      }
  return (
    <div className="popup">
      <div className="popup-content">
      
        <img className="image" src={houseImage} alt="square-image" />
        <div className="description">
          <p className="text">{apartment.addressabrev}</p>
          <p className="semester">{`${apartment.semester} 2024`}</p>
          <p className="price">{`$${apartment.rent}.00`}</p>
        </div>
      </div>
    </div>
  );
}

export default ApartmentPopup;