import React from 'react';
import './listingPopUp.css'
import houseImage from './Assets/houseimg.png';
import supabase from './supabase';


function ApartmentPopup({apartment}) {
    if (!apartment) {
        return null; 
      }
      
      const bucketName = 'dbbucket'; 
      const objectName = apartment.image_path; 

      const {data,error} = supabase.storage.from(bucketName).getPublicUrl(objectName);

      console.log(data.publicUrl)

  return (
    <div className="popup">
      <div className="popup-content">
      
        <img className="pop-up-image" src={data.publicUrl} alt="square-image"  />
        <div >
          <p className="address">{apartment.address}</p>
          <p className="desc">Description: {`${apartment.description}`}</p>
          <p className="rent">Price: {`$${apartment.price}`}</p>
          <p className="availability">Availability: {apartment.semester}</p>
        </div>

        <div className="message">Please message lister, if you are interested in subletting this apartment!</div>
        <button className="message-lister-button">Message Lister!</button>
      </div>
    </div>
  );
}

export default ApartmentPopup;