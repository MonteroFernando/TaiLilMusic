import React, { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard';
import { useAuth } from '../context/AuthContext';
import '../style/AlbumList.css'

const AlbumList = () => {
  const { token } = useAuth();
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setAlbums(result.results);
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    fetchAlbums();
  }, [token]);

  return (
    <div className='AlbumList'>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumList;
