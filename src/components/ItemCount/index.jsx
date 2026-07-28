import { useState } from 'react';
import './index.css';

export const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className="item-count-container">
      <div className="count-controls">
        <button className="count-btn" onClick={handleDecrement} disabled={count <= 1}>
          -
        </button>
        <span className="count-number">{count}</span>
        <button className="count-btn" onClick={handleIncrement} disabled={count >= stock}>
          +
        </button>
      </div>

      <button 
        className="add-to-cart-btn" 
        onClick={() => onAdd(count)}
        disabled={stock <= 0}
      >
        {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
      </button>
    </div>
  );
};