import logo from './logo.svg';
import './App.css';
import supabase from './supabase';
import TableData from './TableData';
import FileUploader from './FileUploader';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h4>Supabase db Uploader</h4>
        <FileUploader />

      </header>
        <TableData />
    </div>
  );
}

export default App;


