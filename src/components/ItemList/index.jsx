import './index.css';
import { Item } from '../Item';

export const ItemList = ({ products }) => {
  return (
    <div className="item-list-grid">
      {products.map((product) => (
        <Item key={product.id} {...product} />
      ))}
    </div>
  );
};