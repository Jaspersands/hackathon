import './App.css';
import Header from "./Header";

import supabase from './supabase';
import TableData from './TableData';
import FileUploader from './FileUploader';


import Header from "./Header";

import supabase from './supabase';
import TableData from './TableData';
import FileUploader from './FileUploader';


function App() {
  return (
    <div className="App">
      <Header/>
      <header className="App-header">
      <h4>Supabase db Uploader</h4>
        <FileUploader />

      </header>
        <TableData />
    </div>
  );
}

export default App;


