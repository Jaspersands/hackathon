// export default FileUploader;

import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';
import logo from './Assets/apartment_logo.svg';
import { useAuth } from './AuthContext';

const FileUploader = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const {loggedIn } = useAuth();
  function toListings() {
    navigate('/listings');
  }

  useEffect(() => {
              
      // Check if the user is already logged in
      if (loggedIn == -1) {
      // Redirect or handle as needed
      // Example: Redirect to the home page
      navigate('/');
      }
  }, [auth]);

  const [formData, setFormData] = useState({
    price: '',
    square_footage: '',
    address: '',
    description: '',
    semester:'',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    console.log('Selected Image:', file.name);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const image = imageFile;

    if (!image) {
      console.error('Please select an image.');
      return;
    }

  const timestamp = new Date().getTime(); // Add a timestamp to make the object name unique
  const objectName = `/Media/${timestamp}_${image.name.replace(/\s/g, '_')}`;
  console.log(objectName)
  const { data: insertData, error: insertError } = await supabase
  .from('listings')
  .upsert([
    {
      price: formData.price,
      square_footage: formData.square_footage,
      image_path: objectName,
      address: formData.address,
      description: formData.description,
      semester: formData.semester,
      school:"WashU"
    },
  ]);

if (insertError) {
  console.error('Error inserting data into the table:', insertError.message);
} else {
  console.log('File uploaded and data inserted successfully');
  console.log(objectName)
  console.log(image)

  // Upload the image to the Supabase bucket
  const { data: uploadData, error: uploadError } = await supabase.storage.from('dbbucket').upload(objectName,imageFile)
      // .from('dbbucket')
      // .upload(objectName, imageFile, {
      //   cacheControl: '3600',
      //   upsert: false
      // // })
      // .from('dbbucket') 
      // .upload(objectName, imageFile);

  if (uploadError) {
    console.error('Error uploading the image:', uploadError.message);
  } else {
    console.log('Image uploaded to the bucket successfully');
  }
}

  };

  return (
    <div className='wrapper'>
      <img src={logo} alt='Logo' className='logo' />
      <div className='upload-container'>
        <div className='title-container'>
          <div className='title'>Add your apartment to Subletify:</div>
        </div>
        <form onSubmit={handleUpload}>
          <label>Price: </label>
          <input type='text' name='price' value={formData.price} onChange={handleInputChange} />
          <br />
          <label>Square Footage: </label>
          <input type='text' name='square_footage' value={formData.square_footage} onChange={handleInputChange} />
          <br />
          <label>Image: </label>
          <input type='file' accept='image/*' name='image' onChange={handleImageUpload} />
          <br />
          <label>Address: </label>
          <input type='text' name='address' value={formData.address} onChange={handleInputChange} />
          <br />
          <label>Description: </label>
          <input type='text' name='description' value={formData.description} onChange={handleInputChange} />
          <br />
          <label htmlFor="semester">Semester: </label>
          <select
            id="semester"
            name="semester"
            value={formData.semester}
            onChange={handleInputChange}
          >
            <option value="">Select a semester</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Summer 2024">Summer 2024</option>
            <option value="Spring 2024">Spring 2024</option>

          </select>   
          <br />
          <div className="the-btns">
            <button className="submitButton" type='submit'>Upload</button>
          <button className='back-btn' type='button' onClick={toListings}>
            Back to Listings
          </button></div>
        </form>
      </div>
    </div>
  );
};

export default FileUploader;