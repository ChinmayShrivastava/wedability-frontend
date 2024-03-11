import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Sidenav from './components/Navbar/sidenav';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Authentication from './components/Wrappers/authentication';

function App() {
  return (
    <div className='flex flex-col md:flex-row h-screen bg-[#FFEFF2]'>
      <Sidenav />
      <div className='h-full w-full overflow-scroll'>
        <Authentication>
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/about" element={<About />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Authentication>
      </div>
    </div>
  );
}

export default App;