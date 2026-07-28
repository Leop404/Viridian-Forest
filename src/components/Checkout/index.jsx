import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartContext';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { Link } from 'react-router-dom';
import './index.css';

export const Checkout = () => {
  const { cart, totalPrice, clear } = useContext(CartContext);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailConfirm, setEmailConfirm] = useState('');

  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = orderId 
      ? '¡Orden Exitosa! | Viridian Forest 🌿'
      : 'Finalizar Compra | Viridian Forest 🌿';

    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = '/src/assets/favicon.png';
    }
  }, [orderId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone || !email || !emailConfirm) {
      setError('Por favor, completa todos los campos.');
      return;
    }

    if (email !== emailConfirm) {
      setError('Los emails no coinciden.');
      return;
    }

    setError('');
    setLoading(true);

    const orderData = {
      buyer: { name, phone, email },
      items: cart.map((prod) => ({
        id: prod.id,
        title: prod.name,
        price: prod.price,
        quantity: prod.quantity,
      })),
      total: totalPrice,
      date: Timestamp.now(),
    };

    const ordersRef = collection(db, 'orders');

    addDoc(ordersRef, orderData)
      .then((docRef) => {
        setOrderId(docRef.id);
        clear();
      })
      .catch((err) => {
        console.error('Error al generar la orden:', err);
        setError('Ocurrió un error al procesar tu orden.');
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <h2 className="loader" style={{ textAlign: 'center', marginTop: '3rem' }}>🌿 Generando tu orden en la base de datos...</h2>;
  }

  if (orderId) {
    return (
      <div className="checkout-container order-success">
        <h2>¡Gracias por tu compra en Viridian Forest! 🌿</h2>
        <p>Tu orden ha sido registrada con éxito en nuestra base de datos.</p>
        <div className="order-id">
          Código de seguimiento (Firestore ID): {orderId}
        </div>
        <Link to="/" className="checkout-btn" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
          Volver a la tienda
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-container order-success">
        <h2>No hay productos para procesar el pago 🍃</h2>
        <Link to="/" className="checkout-btn" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2 className="checkout-title">Finalizar Compra</h2>

      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Ann Perkins"
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ej. +57 321 123 4567"
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tuemail@ejemplo.com"
          />
        </div>

        <div className="form-group">
          <label>Confirmar Email</label>
          <input
            type="email"
            value={emailConfirm}
            onChange={(e) => setEmailConfirm(e.target.value)}
            placeholder="Repite tu email"
          />
        </div>

        {error && <p className="error-msg">{error}</p>}

        <button type="submit" className="checkout-btn">
          Generar Orden de Compra
        </button>
      </form>
    </div>
  );
};