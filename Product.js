import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Product.css';
import defaultImg from '../img/allbook.png';
import { ThemeContext } from '../Context/ThemeContext';

function Product({ product }) {
  const navigate = useNavigate();
  const { user } = useContext(ThemeContext);

  const imageSrc = product.img
    ? `/img/${product.img}`
    : `https://source.unsplash.com/400x300/?book,${encodeURIComponent(product.name)}&sig=${product.id}`;

  const handleBuyNow = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate(`/productview/${product.id}`);
    }
  };

  const showBuyNow = !product.user && user && user.role?.toUpperCase() !== 'ADMIN';

  return (
    <div className="book-card">
      <div className="book-inner">
        <div className="book-front">
          <img
            src={imageSrc}
            alt={product.name || 'Book'}
            className="card-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <div className="card-title-section">
            <h5>{product.name}</h5>
            <p className={`status ${product.user ? 'sold' : 'available'}`}>
              {product.user ? `✅ Purchased by: ${product.user}` : '🟢 Available'}
            </p>
          </div>
        </div>
        <div className="book-back">
          <div className="card-details">
            <h5>{product.name}</h5>
            <p>{product.category || 'No description'}</p>
            <p className="price">₹{product.price?.toFixed(2)}</p>
            <p className={`status ${product.user ? 'sold' : 'available'}`}>
              {product.user ? `✅ Purchased by: ${product.user}` : '🟢 Available'}
            </p>
            {showBuyNow && !product.user && (
              <button className="buy-btn" onClick={handleBuyNow}>
                🛒 Buy Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
