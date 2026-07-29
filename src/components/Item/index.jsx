import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext';
import heartFilled from '../../assets/fav-green.png';
import heartOutline from '../../assets/fav-red.png';
import './index.css';

export const Item = ({ id, name, price, img, category }) => {
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
  const favorite = isFavorite(id);

  return (
    <article className="product-card">
      <button
        onClick={() => toggleFavorite({ id, name, price, img, category })}
        className="favorite-btn"
      >
        <img
          src={favorite ? heartFilled : heartOutline}
          alt="Favorito"
          className="favorite-icon"
        />
      </button>

      <img
        src={`${import.meta.env.BASE_URL}${img}`}
        alt={name}
        className="product-img"
      />
      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        <p className="product-price">${price}</p>
        <Link to={`/item/${id}`} style={{ textDecoration: 'none' }}>
          <button className="detail-btn">Ver detalle</button>
        </Link>
      </div>
    </article>
  );
};