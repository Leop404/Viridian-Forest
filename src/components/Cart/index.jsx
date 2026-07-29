import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import { getImageUrl } from '../../utils/getImageUrl';
import './index.css';

export const Cart = () => {
  const { cart, removeItem, clear, totalPrice } = useContext(CartContext);

  useEffect(() => {
    document.title = 'Canasto | Viridian Forest';

    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = '/src/assets/favicon.png';
    }
  }, []);

  if (cart.length === 0) {
    return (
      <div className="cart-container cart-empty">
        <h2>Tu carrito está vacío 🌿</h2>
        <p>¿Aún no has elegido tus plantas favoritas?</p>
        <Link to="/" className="checkout-btn">
          Ir a ver la colección
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Tu Carrito de Compras</h2>

      {cart.map((product) => (
        <div key={product.id} className="cart-item">
          <img src={getImageUrl(product.img)} alt={product.name} className="cart-item-img" />
          <div className="cart-item-details">
            <h3 className="cart-item-title">{product.name}</h3>
            <p className="cart-item-price">
              {product.quantity} x ${product.price} = <strong>${product.quantity * product.price}</strong>
            </p>
          </div>
          <button className="remove-btn" onClick={() => removeItem(product.id)}>
            Eliminar
          </button>
        </div>
      ))}

      <div className="cart-summary">
        <p className="cart-total">Total: ${totalPrice}</p>
        <div className="cart-actions">
          <button className="clear-btn" onClick={clear}>
            Vaciar carrito
          </button>
          <Link to="/checkout" className="checkout-btn">
            Finalizar compra
          </Link>
        </div>
      </div>
    </div>
  );
};