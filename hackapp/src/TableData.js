// TableData.js
import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import ApartmentCard from './components/apartmentcard'; 

function TableData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Replace 'your_table_name' with the name of your table in Supabase
      const { data, error } = await supabase
        .from('listings')
        .select('*');
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Table Data</h1>
      {data.map((apartment) => (
          <li key={apartment.id}>
            <ApartmentCard
              apartment={{
                addressabrev: apartment.address,
                semester: apartment.semester,
                rent: apartment.price,
              }}
            />
          </li>
        ))}
    </div>
  );
}

export default TableData;