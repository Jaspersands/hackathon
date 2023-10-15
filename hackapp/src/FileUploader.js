
// // export default FileUploader;
// import React, { useState } from 'react';
// import supabase from './supabase';

// const FileUploader = () => {

//   const [formData, setFormData] = useState({
//     id: '',
//     price: '',
//     square_footage: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };
  
//   const handleUpload = async (e) => {
//     console.log('File uploaded and data inserted successfully');
//     // Insert a new record into the 'listings' table with the file data and form data
//     const { data: insertData, error: insertError } = await supabase
//     .from('listings')
//     .upsert([
//         {
//         id: formData.id,
//         price: formData.price,
//         square_footage: formData.square_footage,
//         },
//     ]);

//     if (insertError) {
//     console.error('Error inserting data into the table:', insertError.message);
//     } else {
//     console.log('File uploaded and data inserted successfully');
//     }
//     formData.reset();
//   };

//   return (
//     <div>
//       <h2>Upload a new entry to db</h2>
//       <form onSubmit={handleUpload}>
//         <label>ID: </label>
//         <input type="text" name="id" value={formData.id} onChange={handleInputChange} />
//         <br />
//         <label>Price: </label>
//         <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
//         <br />
//         <label>Square Footage: </label>
//         <input type="text" name="square_footage" value={formData.square_footage} onChange={handleInputChange} />
//         <br />
//         <button type="submit" onClick={handleUpload}>Upload to DB</button>
//       </form>
//     </div>
//   );
// };

// export default FileUploader;
import React, { useState } from 'react';
import supabase from './supabase';
import './Welcome.css';
import { useNavigate } from 'react-router-dom';

const FileUploader = () => {

  const navigate = useNavigate();

  function toListings() {
    navigate("/listings");
    //const currentUrl = window.location.href;
    //const loginUrl = currentUrl + 'listings';
    //window.location.href = loginUrl;
}


  const [formData, setFormData] = useState({
    id: '',
    price: '',
    square_footage: '', 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleUpload = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log('File uploaded and data inserted successfully');
    // Insert a new record into the 'listings' table with the file data and form data
    const { data: insertData, error: insertError } = await supabase
      .from('listings')
      .upsert([
        {
          user_id: formData.id,
          price: formData.price,
          square_footage: formData.square_footage,
        },
      ]);

    if (insertError) {
      console.error('Error inserting data into the table:', insertError.message);
    } else {
      console.log('File uploaded and data inserted successfully');
    }
    setFormData({ id: '', price: '', square_footage: '' }); // Clear the form data
  };

  return (
    <div>
      <h2>Add your apartment to Subletify:</h2>
      <form onSubmit={handleUpload}>
        <label>ID: </label>
        <input type="text" name="id" value={formData.id} onChange={handleInputChange} />
        <br />
        <label>Price: </label>
        <input type="text" name="price" value={formData.price} onChange={handleInputChange} />
        <br />
        <label>Square Footage: </label>
        <input type="text" name="square_footage" value={formData.square_footage} onChange={handleInputChange} />
        <br />
        <button type="submit">Upload to DB</button>
        <button className="btn btn-primary welcome-btn" type="button" onClick={toListings}>
                Back to Listings
              </button>
      </form>
    </div>
  );
};

export default FileUploader;
