// CreateAccount.js
import React, { useState } from 'react';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [schoolEmail, setSchoolEmail] = useState('');
  const [schoolYear, setSchoolYear] = useState(''); // You can use a dropdown or input for this
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your logic for handling the form submission
    console.log('Form submitted with:', { firstName, lastName, schoolEmail, schoolYear, phoneNumber });
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateAccount;
