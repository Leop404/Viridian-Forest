import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ItemDetail } from '../ItemDetail';
import './index.css';

export const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    const docRef = doc(db, 'products', itemId);

    getDoc(docRef)
      .then((resp) => {
        if (resp.exists()) {
          setProduct({ id: resp.id, ...resp.data() });
        } else {
          setProduct(null);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

  }, [itemId]);

  if (loading) {
    return <h2 className="loader">🌿 Cargando detalle de la planta...</h2>;
  }

  if (!product) {
    return <h2 className="loader">La planta solicitada no existe 🍃</h2>;
  }

  return (
    <section className="item-detail-container">
      <ItemDetail {...product} />
    </section>
  );
};