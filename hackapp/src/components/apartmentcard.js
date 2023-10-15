import React, { useState } from 'react';
import houseImage from '../Assets/houseimg.png';

import './apartmentcard.css'

function ApartmentCard({ apartment }) {
  let title = apartment.addressabrev;
  let price = `$${apartment.rent}.00`;
  let semester = `${apartment.semester} 2024`;


  return (
<div>
    <div className ="card" >
      <img className="image" src={houseImage} alt="square-image"/>
      <div className="description">
        <p className="text">{title}</p>
        <p className="semester">{semester}</p>
        <p className="price">{price}</p>
      </div>
    </div>
    
    </div>
  );
}

export default ApartmentCard;