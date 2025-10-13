import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Product from "./Product";
import { ThemeContext } from '../Context/ThemeContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useContext(ThemeContext);

  useEffect(() => {
    axios.get("http://localhost:8080/product/allprod")
      .then(response => {
        const sortedProducts = [...response.data].sort((a, b) => {
          if (!a.user && b.user) return -1;
          if (a.user && !b.user) return 1;
          if (a.user && b.user) return a.user.localeCompare(b.user);
          return 0;
        });

        setProducts(sortedProducts);
      })
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  // Filter based on role
  const filteredProducts = products.filter(product => {
    if (!user) return !product.user;
    if (user.role === 'ADMIN') return true;
    return !product.user || product.user === user.username;
  });

  // Filter based on search query
  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* Search Bar */}

      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Products */}
      {
        searchedProducts.length === 0 ? (
          <div className="text-center text-muted fs-4 mt-5">
            📚 No matching books found.
          </div>
        ) : (
          <div className="row">
            {searchedProducts.map(product => (
              <div key={product.id} className="col-md-4">
                <Product product={product} />
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
}

export default ProductList;
