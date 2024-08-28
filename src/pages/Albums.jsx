import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AlbumList from '../components/AlbumList';
import Navbar from '../components/Navbar';
import AlbumForm from '../components/AlbumForm';

function Main() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(prevShowForm => !prevShowForm);
  };

  return (
    <div>
      <Navbar />
      <h1>Albums</h1>
      <button onClick={toggleForm}>
        {showForm ? 'Cerrar formulario' : 'Agregar nuevo álbum'}
      </button>
      {showForm && <AlbumForm />}
      <AlbumList />
    </div>
  );
}

export default Main;
