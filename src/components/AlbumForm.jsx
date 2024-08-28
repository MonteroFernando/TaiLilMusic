import React, { useState } from 'react';
import useFetch from '../hooks/UseFetch';
import { useAuth } from '../context/AuthContext';

const AlbumForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');
  const { token } = useAuth();

  const [{ data, isLoading, isError }, doFetch] = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const albumData = {
      title,
      year: parseInt(year, 10),
      artist: parseInt(artist, 10)
    };

    await doFetch({
      method: 'POST',
      body: JSON.stringify(albumData),
    });
  };

  return (
    <div>
      <h2>Alta de Álbum</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Año:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Artista:</label>
          <input
            type="number"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>Crear Álbum</button>
      </form>
      {isError && <p>Hubo un error al crear el álbum.</p>}
      {data && <p>Álbum creado con éxito: {data.title}</p>}
    </div>
  );
};

export default AlbumForm;
