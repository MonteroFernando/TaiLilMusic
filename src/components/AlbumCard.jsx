import React, { useState } from 'react';
import '../style/AlbumCard.css';
import defaultCover from '../assets/default-cover.jpg';
import SoundList from './SoundList';

const AlbumCard = ({ album }) => {
  const { id, title, cover, artist, year } = album;
  const [showSongs, setShowSongs] = useState(false);

  const handleToggleSongs = () => {
    setShowSongs(prevState => !prevState);
  };

  return (
    <div className="album-card">
      <div className="album-cont">
      <h3>{title}</h3>
      <div className="image-box">
        <img src={cover ? cover : defaultCover} alt={title} />
      </div>
      <p>{artist}</p>
      <p>{year}</p>
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
    </div>
  );
};

export default AlbumCard;
