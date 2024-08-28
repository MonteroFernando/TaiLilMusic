import React, { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard';
import { useAuth } from '../context/AuthContext';
import '../style/AlbumList.css';

const AlbumList = () => {
  const { token } = useAuth();
  const [albums, setAlbums] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAlbums = async (page = 1, query = '', accumulatedAlbums = []) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/?page=${page}&search=${query}`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });
      const result = await response.json();
      const newAlbums = [...accumulatedAlbums, ...result.results];
      setTotalPages(Math.ceil(result.count / 10));

      if (result.next) {
        fetchAlbums(page + 1, query, newAlbums);
      } else {
        setAlbums(newAlbums);
      }
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  useEffect(() => {
    fetchAlbums(1, searchQuery); 
  }, [token, searchQuery]);

  const handleUpdate = () => {
    fetchAlbums(1, searchQuery);
  };

  const handleDelete = (id) => {
    setAlbums(albums.filter(album => album.id !== id));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    fetchAlbums(page, searchQuery);
  };

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='AlbumList'>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Buscar por título..."
      />
      <div className="pagination-controls">
        <button onClick={() => goToPage(1)} disabled={currentPage === 1}>Primera</button>
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Siguiente</button>
        <button onClick={() => goToPage(totalPages)} disabled={currentPage === totalPages}>Última</button>
      </div>
      {filteredAlbums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default AlbumList;
