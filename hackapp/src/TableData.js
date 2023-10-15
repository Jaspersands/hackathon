// import React, { useEffect, useState } from 'react';
// import supabase from './supabase';
// import ApartmentCard from './components/apartmentcard';
// import ApartmentPopup from './listingPopUp';
// import { useNavigate } from 'react-router-dom';
// import { useSemester } from './SemesterContext';
// import "./index.css";
// import { useAuth } from './AuthContext';

// function TableData() {
//   const [data, setData] = useState([]);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [isPopUp, setIsPopUp] = useState(false);
//   const auth = useAuth();
//   const { semester } = useSemester();

//   const navigate = useNavigate();
 

//   useEffect(() => {
//     async function fetchTableData() {
//         console.log("async function");
//         console.log(semester);
//         if (semester){
//             const { data, error } = await supabase
//                 .from('listings')
//                 .select('*')
//                 .eq('semester',semester);

//             if (error) {
//                 console.error('Error fetching data:', error);
//             } else {
//                 setData(data);
//             }
//         } else {
//             const { data, error } = await supabase
//                 .from('listings')
//                 .select('*');

//             if (error) {
//                 console.error('Error fetching data:', error);
//             } else {
//                 setData(data);
//             }
//         }
      
//     }

//     fetchTableData();
//   }, []);

//   const togglePopUp = () => {
//     setIsPopUp(!isPopUp);
//   }

//   return (
//     <div>
//       <p className="title">Available Listings</p>
//       <div className="grid-container">
//         <div className="card-grid">
//           {data.map((apartment) => (
//             <li key={apartment.id} onClick={() => { togglePopUp(); setSelectedApartment(apartment); }}>
//               <ApartmentCard
//                 apartment={{
//                   addressabrev: apartment.address,
//                   semester: apartment.semester,
//                   rent: apartment.price,
//                   image: apartment.image_path
//                 }}
//               />
//             </li>
//           ))}
//         </div>
//       </div>
//       {isPopUp && (
//         <div className="popup-container">
//           <div className="popUp-box">
//             <div className="popUp-header">
//               <button className="close-button" onClick={() => setIsPopUp(false)}>X</button>
//             </div>
//             <ApartmentPopup apartment={selectedApartment} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default TableData;


import React, { useEffect, useState } from 'react';
import supabase from './supabase';
import ApartmentCard from './components/apartmentcard';
import ApartmentPopup from './listingPopUp';
import { useNavigate } from 'react-router-dom';
import { useSemester } from './SemesterContext';
import "./index.css";
import { useAuth } from './AuthContext';

function TableData() {
  const [data, setData] = useState([]);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [isPopUp, setIsPopUp] = useState(false);
  const auth = useAuth();
  const { semester } = useSemester();
  const navigate = useNavigate();
  const {loggedIn } = useAuth();
  useEffect(() => {
    async function fetchTableData() {
      console.log("async function");
      console.log(semester);
      if (semester) {
        const { data, error } = await supabase
          .from('listings')
          .select('*')
          .eq('semester', semester);

        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setData(data);
        }
      } else {
        const { data, error } = await supabase
          .from('listings')
          .select('*');

        if (error) {
          console.error('Error fetching data:', error);
        } else {
                console.log(data);
          setData(data);
        }
      }
    }

    fetchTableData();
  }, [semester]); // Add "semester" as a dependency

    useEffect(() => {
            
        // Check if the user is already logged in
        if (loggedIn == -1) {
        // Redirect or handle as needed
        // Example: Redirect to the home page
        navigate('/');
        }
    }, [auth]);
  const togglePopUp = () => {
    setIsPopUp(!isPopUp);
  }

  return (
    <div>
      <p className="title">Available Listings</p>
      <div className="grid-container">
        <div className="card-grid">
          {data.map((apartment) => (
            <li key={apartment.id} onClick={() => { togglePopUp(); setSelectedApartment(apartment); }}>
              <ApartmentCard
                apartment={{
                  addressabrev: apartment.address,
                  semester: apartment.semester,
                  rent: apartment.price,
                  image: apartment.image_path
                }}
              />
            </li>
          ))}
        </div>
      </div>
      {isPopUp && (
        <div className="popup-container">
          <div className="popUp-box">
            <div className="popUp-header">
              <button className="close-button" onClick={() => setIsPopUp(false)}>X</button>
            </div>
            <ApartmentPopup apartment={selectedApartment} />
          </div>
        </div>
      )}
    </div>
  );
}

export default TableData;
