import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { NavBar } from './components/NavBar';
import { SearchContainer } from './components/SearchContainer';
import { Banner } from './components/Banner';
import { ItemListContainer } from './components/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Favorites } from './components/Favorites';
import { ScrollToTopButton } from './components/ScrollToTop';

function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <div>
          <NavBar />
          
          <Routes>
            <Route path="/" element={<><Banner /><ItemListContainer greeting="Nuestra Colección Destacada" /></>} />
            <Route path="/category/:categoryId" element={<ItemListContainer greeting="Nuestra Colección" />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="*" element={<h2 style={{ textAlign: 'center', marginTop: '3rem' }}>404 - Página no encontrada 🌿</h2>} />
            <Route path="/search" element={<SearchContainer />} />
          </Routes>

          <ScrollToTopButton />
        </div>
      </FavoritesProvider>
    </CartProvider>
  );
}

export default App;