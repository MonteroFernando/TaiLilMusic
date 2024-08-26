import React from 'react';
import { Link } from 'react-router-dom';
import '../style/NavBar.css'

function Navbar() {
  return (
    <nav className='navbar'>
      <a href="/">Salir</a>
      <a href="/main">Pagina Principal</a>
    </nav>
  );
}

export default Navbar;