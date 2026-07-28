import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import cartIMG from '../../assets/cart.png';
import './index.css';

export const CartWidget = () => {
  const { totalQuantity } = useContext(CartContext);

  return (
    <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="cart-widget">
        <img src={cartIMG} alt="Carrito" className="cart-icon" />
        <span className="cart-badge">{totalQuantity}</span>
      </div>
    </Link>
  );
};