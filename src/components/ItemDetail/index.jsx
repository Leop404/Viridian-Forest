import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { ItemCount } from '../ItemCount';
import './index.css';

export const ItemDetail = ({ id, name, price, img, category, description, stock }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addItem } = useContext(CartContext);

  const handleOnAdd = (quantity) => {
    setQuantityAdded(quantity);

    const item = { id, name, price, img };
    addItem(item, quantity);
  };

  return (
    <article className="item-detail-card">
      <img
        src={`${import.meta.env.BASE_URL}${img}`}
        alt={name}
        className="item-detail-img"
      />
      <div className="item-detail-info">
        <span className="item-detail-category">{category}</span>
        <h2 className="item-detail-title">{name}</h2>
        <p className="item-detail-description">{description}</p>
        <p className="item-detail-price">${price}</p>
        <p className="item-detail-stock">Stock disponible: {stock} unidades</p>

        {quantityAdded > 0 ? (
          <Link to="/cart" className="detail-btn" style={{ textAlign: 'center', textDecoration: 'none' }}>
            Ir al Carrito
          </Link>
        ) : (
          <ItemCount stock={stock} initial={1} onAdd={handleOnAdd} />
        )}
      </div>
    </article>
  );
};