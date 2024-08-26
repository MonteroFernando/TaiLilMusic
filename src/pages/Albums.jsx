import React from 'react';
import { useAuth } from '../context/AuthContext';
import AlbumList from '../components/AlbumList';
import Navbar from '../components/Navbar';
import AlbumCard from '../components/AlbumCard';

function Main() {
  
  return (
    <div>
      <Navbar />
      <h1>Albums</h1>
      <AlbumList/>
    </div>
  );
}

export default Main;