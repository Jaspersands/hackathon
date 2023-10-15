import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Header';
import TableData from './TableData';
import FileUploader from './FileUploader';
import Welcome from './Welcome2';
import { AuthProvider, useAuth } from './AuthContext';

//psuh
function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
        <Route path="/" element={<WelcomeWithoutHeader><Welcome /></WelcomeWithoutHeader>} />
          <Route path="/listings" element={<DefaultLayout><FileUploader/></DefaultLayout>} />
          <Route path="/newlisting" element={<NewListing><FileUploader /></NewListing>} />
        
        </Routes>
      </Router>
    </AuthProvider>
  );
}


const DefaultLayout = () => (
  <div>
    <Header />
    <div className="App">
      
      <TableData />
    </div>
  </div>
);

const NewListing = () => (
  <div>
    <div className="App">
        <FileUploader />
    </div>
  </div>
);


const WelcomeWithoutHeader = ({ children }) => (
  <div>
    <Routes>
      <Route path="/" element={children} />
    </Routes>
  </div>
);


export default App;
