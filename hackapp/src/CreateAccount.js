// CreateAccount.js
import React, { useState } from 'react';
import supabase from './supabase';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolYear, setSchoolYear] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Your logic for handling the form submission
    const formData = {
      firstName,
      lastName,
      schoolEmail,
      schoolYear,
      phoneNumber,
      password,
    };

    try {
      // Insert a new record into the 'users' table with the form data
      const { data: insertData, error: insertError } = await supabase
        .from('users')
        .insert([
          {
            firstname: formData.firstName,
            lastname: formData.lastName,
            email: formData.schoolEmail,
            grade: formData.schoolYear,
            phonenumber: formData.phoneNumber,
            password:formData.password,
          },
        ]);

      if (insertError) {
        console.error('Error inserting data into the table:', insertError.message);
      } else {
        console.log('Data inserted successfully');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          School Email:
          <input type="email" value={schoolEmail} onChange={(e) => setSchoolEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          School Year:
          <select value={schoolYear} onChange={(e) => setSchoolYear(e.target.value)} required>
            <option value="">Select School Year</option>
            <option value="freshman">Freshman</option>
            <option value="sophomore">Sophomore</option>
            <option value="junior">Junior</option>
            <option value="senior">Senior</option>
            <option value="grad student">Grad Student</option>
          </select>
        </label>
        <br />
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;
