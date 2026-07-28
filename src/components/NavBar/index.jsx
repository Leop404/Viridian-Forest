import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CartWidget } from '../CartWidget';
import favicon from '../../assets/favicon.png';
import heartIcon from '../../assets/fav-icon.png';
import './index.css';

export const NavBar = () => {
  const { favorites } = useContext(FavoritesContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <header className="navbar-container">
      {/* PRIMERA LÍNEA */}
      <div className="navbar-top">
        <Link to="/" className="navbar-brand-link">
          <img src={favicon} alt="Logo" className="navbar-logo-img" />
          <h2 className="navbar-logo">Viridian Forest</h2>
        </Link>

        <form onSubmit={handleSearch} className="navbar-search">
          <input 
            type="text" 
            placeholder="Buscar tu planta favorita..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>

        <div className="navbar-top-right">
          <Link to="/favorites" className="icon-btn" title="Favoritos" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img src={heartIcon} alt="Favoritos" className="fav-icon" />
          </Link>
          <CartWidget />
        </div>
      </div>

      {/* SEGUNDA LÍNEA */}
      <nav className="navbar-bottom">
        <ul className="navbar-categories">
          <li><NavLink to="/category/large">Large</NavLink></li>
          <li><NavLink to="/category/indoor">Indoor</NavLink></li>
          <li><NavLink to="/category/outdoor">Outdoor</NavLink></li>
          <li><NavLink to="/category/bonsai">Bonsai</NavLink></li>
          <li><NavLink to="/category/suculentas">Suculentas</NavLink></li>
        </ul>
      </nav>
    </header>
  );
};