import './App.css';
import Header from "./Header";
import supabase from './supabase';
import TableData from './TableData';
import FileUploader from './FileUploader';
import ApartmentCard from './components/apartmentcard'; 



function App() {

  const myApartment = {
    addressabrev: "123 Main St",
    semester: "Fall",
    rent: 1200,
  };
 
  
  return (
    <div className="App">
      <Header/>
      {/* <ApartmentCard apartment={myApartment} /> */}
      <header className="App-header">
      <h4>Supabase db Uploader</h4>
        <FileUploader />

      </header>
        <TableData />
    </div>
  );
}

export default App;


