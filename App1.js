// src/Component/App1.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductList from './ProductList';
import PaymentPage from './PaymentPage';
import BookSlider from './BookSlider';
import 'bootstrap/dist/css/bootstrap.min.css';
import backImg from '../img/back.jpg';

function App1() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/product/allprod')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-4 text-white">Loading products...</div>;
  if (error) return <div className="text-center p-4 text-danger">Error: {error}</div>;

  return (
    <div
      className="text-center p-4"
      style={{
        backgroundImage: `url(${backImg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      <ProductList productdata={products} />
    </div>
  );
      

}

export default App1;
