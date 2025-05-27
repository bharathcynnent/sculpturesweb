import '../csscomponents/Shop.css';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import useCartStore from "../stores/cartStore";
import { useState } from 'react';

const allProducts = [
  { id:'1', title: 'Sculpture', image: '/assets/aboutusimage1.jpg', price: 2000000 },
  { id:'2', title: 'Little Krishna', image: '/assets/aboutusimage2.jpg', price: 2500000 },
  { id:'3', title: 'Block', image: '/assets/aboutusimage3.jpg', price: 7000000 },
  { id:'4', title: 'Stone', image: '/assets/aboutusimage4.jpg', price: 95000, badge: { text: 'New', type: 'new' } },
];

const Shop = ({ products }) => {
  const [sortOption, setSortOption] = useState('');
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const addToCart = useCartStore((state) => state.addToCart);

 const handleLike = (product) => {
    addToCart(product);
  };
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOption === 'priceLowHigh') return a.price - b.price;
    if (sortOption === 'priceHighLow') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / perPage);
  const paginatedProducts = sortedProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="shop-container">
      <div className="shop-header">
        <div className='shop-main'>
          <div>Showing {paginatedProducts.length} of {allProducts.length} results</div>
          <div className="filters">
            <select onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}>
              <option value="6">Show 6</option>
              <option value="9">Show 9</option>
              <option value="12">Show 12</option>
            </select>
            <select onChange={(e) => setSortOption(e.target.value)}>
              <option value="">Sort by</option>
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="product-grid">
        {paginatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} onLike={handleLike} />
      ))}
      </div>

      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>

      {/* Display Cart at the bottom */}
      <Cart cartItems={cart} setCartItems={setCart} />
    </div>
  );
};

export default Shop;

