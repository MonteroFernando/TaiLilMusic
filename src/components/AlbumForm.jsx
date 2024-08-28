import React, { useState, useEffect } from 'react';
import useFetch from '../hooks/UseFetch';
import { useAuth } from '../context/AuthContext';
import '../style/AlbumForm.css';

const AlbumForm = () => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [artist, setArtist] = useState('');
  const [artists, setArtists] = useState([]);
  const { token } = useAuth();

  const fetchArtists = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/`, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      const result = await response.json();
      setArtists(result.results);
    } catch (error) {
      console.error('Error fetching artists:', error);
    }
  };

  useEffect(() => {
    fetchArtists();
  }, [token]);

  const [{ data, isLoading, isError }, doFetch] = useFetch(
    `${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
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
    <div className="album-form-container">
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
          <select
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          >
            <option value="" disabled>Selecciona un artista</option>
            {artists.map(artist => (
              <option key={artist.id} value={artist.id}>
                {artist.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isLoading}>Crear Álbum</button>
      </form>
      {isError && <p>Hubo un error al crear el álbum.</p>}
      {data && <p className="success">Álbum creado con éxito: {data.title}</p>}
    </div>
  );
};

export default AlbumForm;
