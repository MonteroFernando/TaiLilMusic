import React from 'react';

const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const SoundCard = ({ sound }) => {
  const { title, song_file, duration } = sound;

  return (
    <div className="sound-card">
      <h3>{title}</h3>
      <audio controls>
        <source src={song_file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <p>Duration: {formatDuration(duration)}</p>
    </div>
  );
};

export default SoundCard;
