import React, { useState, useEffect } from 'react';
import '../style/AlbumCard.css';
import defaultCover from '../assets/default-cover.jpg';
import SoundList from './SoundList';
import useFetch from '../hooks/useFetch';
import { useAuth } from '../context/AuthContext';

const AlbumCard = ({ album, onUpdate, onDelete }) => {
  const { id, title, cover, artist: artistId, year } = album;
  const [showSongs, setShowSongs] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedAlbum, setEditedAlbum] = useState({ title, cover, artist: artistId, year });
  const [artistName, setArtistName] = useState('');
  const [artists, setArtists] = useState([]);

  const { token } = useAuth();

  useEffect(() => {
    const fetchArtistName = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists/${artistId}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const result = await response.json();
        setArtistName(result.name);
      } catch (error) {
        console.error('Error fetching artist name:', error);
      }
    };

    fetchArtistName();
  }, [artistId, token]);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/artists`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const result = await response.json();
        const sortedArtists = result.results.sort((a, b) => a.name.localeCompare(b.name));
        setArtists(sortedArtists);
      } catch (error) {
        console.error('Error fetching artists:', error);
      }
    };

    fetchArtists();
  }, [token]);

  const [{ isLoading: isUpdating }, doUpdate] = useFetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });

  const [{ isLoading: isDeleting }, doDelete] = useFetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const handleToggleSongs = () => {
    setShowSongs(prevState => !prevState);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAlbum((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    await doUpdate({ body: JSON.stringify(editedAlbum) });
    setIsEditing(false);
    if (onUpdate) onUpdate();
  };

  const handleDelete = async () => {
    await doDelete();
    if (onDelete) onDelete(id);
  };

  return (
    <div className="album-card">
      <div className="album-cont">
        {isEditing ? (
          <div className="edit-form">
            <label>
              Título:
              <input type="text" name="title" value={editedAlbum.title} onChange={handleInputChange} />
            </label>
            <label>
              Portada:
              <input type="text" name="cover" value={editedAlbum.cover} onChange={handleInputChange} />
            </label>
            <label>
              Artista:
              <select
                name="artist"
                value={editedAlbum.artist}
                onChange={(e) => setEditedAlbum(prev => ({ ...prev, artist: e.target.value }))}
              >
                {artists.map(artist => (
                  <option key={artist.id} value={artist.id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Año:
              <input type="number" name="year" value={editedAlbum.year} onChange={handleInputChange} />
            </label>
            <button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Actualizando...' : 'Confirmar'}
            </button>
            <button onClick={() => setIsEditing(false)}>Volver atrás</button>
          </div>
        ) : (
          <>
            <h3>{title}</h3>
            <div className="image-box">
              <img src={cover ? cover : defaultCover} alt={title} />
            </div>
            <p>{artistName}</p>
            <p>{year}</p>
            <button onClick={handleEditClick}>Modificar</button>
          </>
        )}
      </div>
      <div>
        <button onClick={handleToggleSongs}>
          {showSongs ? 'Ocultar Canciones' : 'Mostrar Canciones'}
        </button>
        {showSongs && (
          <div className="song-list">
            <SoundList albumId={id} />
          </div>
        )}
      </div>
      <button onClick={handleDelete} disabled={isDeleting} className="delete-button">
        {isDeleting ? 'Eliminando...' : 'Eliminar'}
      </button>
    </div>
  );
};

export default AlbumCard;
