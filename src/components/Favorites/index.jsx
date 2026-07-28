import { useContext, useEffect } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import { ItemList } from '../ItemList';
import { Link } from 'react-router-dom';

export const Favorites = () => {
  const { favorites } = useContext(FavoritesContext);

  useEffect(() => {
    document.title = 'Favoritos | Viridian Forest';

    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = '/src/assets/favicon.png';
    }
  }, []);

  if (favorites.length === 0) {
    return (
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <h2>No tienes plantas favoritas guardadas</h2>
        <p>Explora el catálogo y marca con un corazón las que más te gusten.</p>
        <Link to="/" className="checkout-btn" style={{ display: 'inline-block', marginTop: '1rem' }}>
          Ver catálogo
        </Link>
      </div>
    );
  }

  return (
    <div className="item-list-container">
      <h2 className="greeting-title">Tus Plantas Favoritas 💚</h2>
      <ItemList products={favorites} />
    </div>
  );
};