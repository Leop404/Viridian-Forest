import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ItemList } from '../ItemList';

export const SearchContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';

  useEffect(() => {
    setLoading(true);
    document.title = `Búsqueda: ${queryParam} | Viridian Forest 🌿`;

    const productsRef = collection(db, 'products');

    getDocs(productsRef)
      .then((resp) => {
        const items = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        const filtered = items.filter((prod) =>
          prod.name.toLowerCase().includes(queryParam.toLowerCase())
        );

        setProducts(filtered);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

  }, [queryParam]);

  if (loading) {
    return <h2 className="loader" style={{ textAlign: 'center', marginTop: '3rem' }}>🌿 Buscando plantas...</h2>;
  }

  return (
    <section className="item-list-container">
      <h2 className="greeting-title">
        Resultados para: "{queryParam}"
      </h2>

      {products.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>No encontramos ninguna planta que coincida con tu búsqueda 🍃</p>
          <Link to="/" className="checkout-btn" style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}>
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  );
};