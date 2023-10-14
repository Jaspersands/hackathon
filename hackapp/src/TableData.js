// TableData.js
import React, { useEffect, useState } from 'react';
import supabase from './supabase';

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
      <ul>
        {data.map((item) => (
          <li key={item.id}>{ item.id+ ' ' +item.price + ' ' +  item.square_footage }</li>
        //   <li key={item.id}>{item.square_footage}</li>
        //   <li key={item.id}>{item.price}</li>
        //   <li key={item.id}>{item.price}</li>
        //   <li key={item.id}>{item.price}</li>
          // Replace 'column_name' with the actual column name you want to display
        ))}
      </ul>
    </div>
  );
}

export default TableData;
