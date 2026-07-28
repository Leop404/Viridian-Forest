import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { ItemList } from '../ItemList';
import './index.css';

export const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    const titleText = categoryId 
      ? `${categoryId.toUpperCase()} | Viridian Forest`
      : 'Viridian Forest | Tienda de Plantas';
    
    document.title = titleText;

    const favicon = document.querySelector("link[rel*='icon']");
    if (favicon) {
      favicon.href = '/src/assets/favicon.png'; 
    }
  }, [categoryId]);

  useEffect(() => {
    setLoading(true);

    const productsRef = collection(db, 'products');

    const q = categoryId 
      ? query(productsRef, where('category', '==', categoryId))
      : productsRef;

    getDocs(q)
      .then((resp) => {
        const items = resp.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setProducts(items);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));

  }, [categoryId]);

  if (loading) {
    return <h2 className="loader">🌿 Cargando catálogo...</h2>;
  }

  return (
    <section className="item-list-container">
      <h2 className="greeting-title">
        {categoryId ? `${categoryId.toUpperCase()}` : greeting}
      </h2>
      <ItemList products={products} />
    </section>
  );
};