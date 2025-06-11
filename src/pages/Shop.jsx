import '../csscomponents/Shop.css';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import useCartStore from "../stores/cartStore";
import { useState } from 'react';

import shopimage1 from '../assets/aboutusimage1.jpg';
import shopimage2 from '../assets/aboutusimage2.jpg';
import shopimage3 from '../assets/aboutusimage3.jpg';
import shopimage4 from '../assets/aboutusimage4.jpg';

const allProducts = [
  { id:'1', title: 'Sculpture', image: shopimage1, price: 2000000, category: 'Home Decors' },
  { id:'2', title: 'Little Krishna', image: shopimage2, price: 2500000, category: 'God Sculptures' },
  { id:'3', title: 'Block', image: shopimage3, price: 7000000, category: 'Garden Decors' },
  { id:'4', title: 'Stone', image: shopimage4, price: 95000, badge: { text: 'New', type: 'new' }, category: 'Garden Decors' },
];


const Shop = () => {
  const [sortOption, setSortOption] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const addToCart = useCartStore((state) => state.addToCart);

 const handleLike = (product) => {
    addToCart(product);
  };


const filteredProducts = (selectedCategory === 'All'
  ? allProducts
  : allProducts.filter(p => p.category === selectedCategory)
).filter(p => {
  const query = searchQuery.toLowerCase();
  return (
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.price.toString().includes(query)
  );
});

const sortedProducts = [...filteredProducts].sort((a, b) => {
  if (sortOption === 'priceLowHigh') return a.price - b.price;
  if (sortOption === 'priceHighLow') return b.price - a.price;
  return 0;
});

const handleSearchChange = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);
  setCurrentPage(1);

  const matches = allProducts.filter(p =>
    p.title.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.price.toString().includes(query)
  );

  setSuggestions(query ? matches.slice(0, 5) : []);
};


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
  <div className="product-search-wrapper">
    <input
      type="text"
      placeholder="🔍Search products..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="product-search-input"
    />
    {searchQuery && suggestions.length > 0 && (
  <ul className="suggestion-list">
    {suggestions.map((item) => (
      <li
        key={item.id}
        onClick={() => {
          setSearchQuery(item.title.toLowerCase());
          setSuggestions([]); 
          setSelectedCategory("All");
          setCurrentPage(1);
        }}
      >
        {item.title}
      </li>
    ))}
  </ul>
)}
  </div>

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
  <select onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}>
    <option value="All">All Categories</option>
    <option value="Home Decors">Home Decors</option>
    <option value="Garden Decors">Garden Decors</option>
    <option value="God Sculptures">God Sculptures</option>
  </select>
</div>

        </div>
      </div>

     <div className="product-grid">
  {paginatedProducts.length > 0 ? (
    paginatedProducts.map((product) => (
      <ProductCard key={product.id} product={product} onLike={handleLike} />
    ))
  ) : (
    <div className="no-products">No products found.</div>
  )}
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
      <Cart cartItems={cart} setCartItems={setCart} />
    </div>
  );
};

export default Shop;
