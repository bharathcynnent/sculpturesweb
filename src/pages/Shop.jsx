// import '../csscomponents/Shop.css';
// import ProductCard from '../components/ProductCard';
// import { useState } from 'react';

// const allProducts  = [
//   { title: 'Sculpture', image: '/public/assets/aboutusimage1.jpg', price: 2000000 },
//   { title: 'Little Krishna', image: '/public/assets/aboutusimage2.jpg', price: 2500000 },
//   { title: 'Block', image: '/public/assets/aboutusimage3.jpg', price: 7000000 },
//   { title: 'Stone', image: '/public/assets/aboutusimage4.jpg', price: 95000, badge: { text: 'New', type: 'new' } },
//   ];

// const Shop = () => {
//   const [sortOption, setSortOption] = useState('');
//   const [perPage, setPerPage] = useState(6);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Sorting logic
//   const sortedProducts = [...allProducts].sort((a, b) => {
//     if (sortOption === 'priceLowHigh') return a.price - b.price;
//     if (sortOption === 'priceHighLow') return b.price - a.price;
//     return 0;
//   });

//   // Pagination logic
//   const totalPages = Math.ceil(sortedProducts.length / perPage);
//   const paginatedProducts = sortedProducts.slice((currentPage - 1) * perPage, currentPage * perPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };

//   return (
//     <div className="shop-container">
//       <div className="shop-header">
//         <div className='shop-main'>
//         <div>Showing {paginatedProducts.length} of {allProducts.length} results</div>
//         <div className="filters">
//           <select onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}>
//             <option value="6">Show 6</option>
//             <option value="9">Show 9</option>
//             <option value="12">Show 12</option>
//           </select>
//           <select onChange={(e) => setSortOption(e.target.value)}>
//             <option value="">Sort by</option>
//             <option value="priceLowHigh">Price: Low to High</option>
//             <option value="priceHighLow">Price: High to Low</option>
//           </select>
//         </div>
//         </div>
//       </div>

//       <div className="product-grid">
//         {paginatedProducts.map((prod, idx) => (
//           <ProductCard key={idx} product={prod} />
//         ))}
//       </div>

//       <div className="pagination">
//         <button onClick={() => handlePageChange(currentPage - 1)}>Prev</button>
//         {[...Array(totalPages)].map((_, i) => (
//           <button
//             key={i}
//             className={currentPage === i + 1 ? 'active' : ''}
//             onClick={() => handlePageChange(i + 1)}
//           >
//             {i + 1}
//           </button>
//         ))}
//         <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
//       </div>
//     </div>
//   );
// };

// export default Shop;


import '../csscomponents/Shop.css';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';
import { useState } from 'react';

const allProducts = [
  { title: 'Sculpture', image: '/assets/aboutusimage1.jpg', price: 2000000 },
  { title: 'Little Krishna', image: '/assets/aboutusimage2.jpg', price: 2500000 },
  { title: 'Block', image: '/assets/aboutusimage3.jpg', price: 7000000 },
  { title: 'Stone', image: '/assets/aboutusimage4.jpg', price: 95000, badge: { text: 'New', type: 'new' } },
];

const Shop = () => {
  const [sortOption, setSortOption] = useState('');
  const [perPage, setPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const newItem = {
      ...product,
      id: Date.now(), // Unique ID
      quantity: 1,
    };
    setCart((prev) => [...prev, newItem]);
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
        {paginatedProducts.map((prod, idx) => (
          <ProductCard key={idx} product={prod} onLike={handleAddToCart} />
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

