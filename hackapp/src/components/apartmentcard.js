import React from 'react';
import houseImage from '../Assets/houseimg.png';

import './apartmentcard.css'
//here

function ApartmentCard({ apartment }) {
  let title = apartment.addressabrev;
  let price = `$${apartment.rent}.00`;
  let semester = `${apartment.semester} 2024`;

  return (
    <div className ="card" >
      <img className="image" src={houseImage} alt="square-image"  />
      <div>
        <p>{title}</p>
        <p>{semester}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}

export default ApartmentCard;