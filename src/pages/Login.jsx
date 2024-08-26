import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import '../style/Login.css'

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [{ data, isLoading, isError }, doFetch] = useFetch(`${import.meta.env.VITE_API_BASE_URL}api-auth/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  const handleLogin = async () => {
    console.log('Handling cargando...');
    await doFetch();
    
    if (data && data.token) {
      login(data);
    }
  };

  return (
    <div className='LoadingBox'>
      <h2>Ingresar</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nombre de Usuario"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
      />
      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? 'Verificando Datos...' : 'Ingreso Correcto'}
      </button>
      {isError && <p>Error: Unable to login</p>}
    </div>
  );
};

export default Login;
