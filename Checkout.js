import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentPage.css';
import { ThemeContext } from '../Context/ThemeContext';

function CheckoutPage() {
  const { user } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  const { productName, price, productId } = location.state || {};

  if (!user || !productName || !price || !productId) {
    return <div className="text-danger text-center mt-5">❌ Invalid checkout data.</div>;
  }

  const handlePlaceOrder = () => {
    alert(`✅ Order placed successfully for "${productName}" by ${user.username}`);
    navigate('/product');
  };

  return (
    <div className="checkout-container d-flex justify-content-center align-items-center mt-5">
      <div className="checkout-card shadow-lg p-4 bg-white rounded">
        <h2 className="text-center mb-4 text-primary">🧾 Checkout</h2>

        <p><strong>👤 Customer:</strong> {user.username}</p>
        <p><strong>📘 Book:</strong> {productName} (ID: {productId})</p>
        <p className="text-success"><strong>💰 Total:</strong> ₹{price}</p>

        <hr />

        <h5 className="mb-3">📦 Delivery Address</h5>
        <textarea className="form-control mb-3" rows="3" placeholder="Enter your address"></textarea>

        <button className="btn btn-primary w-100" onClick={handlePlaceOrder}>
          🛒 Place Order
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
