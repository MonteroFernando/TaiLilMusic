import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import SoundCard from './SoundCard';

const SoundList = ({ albumId }) => {
    const { token } = useAuth();
    const [sounds, setSounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSounds = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}harmonyhub/albums/${albumId}/songs`,{
            headers:{
                'Authorization':`Bearer ${token}`
            },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSounds(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSounds();
  }, [albumId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="sound-list">
      {sounds.length > 0 ? (
        sounds.map((sound) => (
          <SoundCard key={sound.id} sound={sound} />
        ))
      ) : (
        <p>No sounds found for this album.</p>
      )}
    </div>
  );
};

export default SoundList;
