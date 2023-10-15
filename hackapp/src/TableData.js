// TableData.js
import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import ApartmentCard from './components/apartmentcard';
import "./index.css"
import { useAuth } from './AuthContext'; // Assuming you've created AuthContext.js


function TableData() {

    const auth = useAuth();
    console.log(auth)

    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
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
            
        <h1>Available Listings</h1>
        <div className="grid-container">
            <div className="card-grid">
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
        </div>
        </div>
    );
}

export default TableData;