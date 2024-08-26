// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Main';
import Albums from './pages/Albums'
import { AuthProvider } from './context/AuthContext';
import './style/App.css'

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/albums" element={<Albums />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
