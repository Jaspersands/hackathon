import React, { useState } from 'react';
import houseImage from '../Assets/houseimg.png';
import supabase from '../supabase';
import './apartmentcard.css'

function ApartmentCard({ apartment }) {
  let title = apartment.addressabrev;
  let price = `${apartment.rent}`;
  let semester = `${apartment.semester}`;


  const bucketName = 'dbbucket'; 

      const objectName = apartment.image; 

      const {data,error} = supabase.storage.from(bucketName).getPublicUrl(objectName);


  return (
<div>
    <div className ="card" >
      <img className="image" src={data.publicUrl} alt="square-image"/>
      <div className="description">
        <p className="text">{title}</p>
        <p className="semester">{semester}</p>
        <p className="price">{price}$/month</p>

      </div>
    </div>
    
    </div>
  );
}

export default ApartmentCard;