import React, { useState } from 'react';
import axios from 'axios';
import './Product'; // Custom CSS for styling
import bookiconlogo from "../img/bookicon.jpg";

const BookAdd = () => {
    const [book, setBook] = useState({
        name: '',
        category: '',
        price: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8080/product/save", book)
            .then(res => {
                alert("✅ Book saved successfully!");
                setBook({ name: '', category: '', price: '' });
            })
            .catch(err => {
                console.error("Error saving book:", err);
                alert("❌ Failed to save book.");
            });
    };

    return (
        <div className="bookadd-background d-flex align-items-center justify-content-center min-vh-100">
            <div className="bookadd-card card shadow-lg p-4 animate-zoom" style={{ maxWidth: 500, width: '100%' }}>
                <div className="text-center mb-4">
                    <img src={bookiconlogo} className="book-logo mb-3" alt="Book Logo" style={{ width: 120, borderRadius: 10 }} />
                    <h3 className="form-title text-primary">📘 Add a New Book</h3>
                </div>

                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="mb-3">
                        <label className="form-label">📖 Book Name</label>
                        <input
                            type="text"
                            name="name"
                            value={book.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter book name"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">🏷️ Category</label>
                        <input
                            type="text"
                            name="category"
                            value={book.category}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter category"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">💲 Price</label>
                        <input
                            type="number"
                            name="price"
                            value={book.price}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Enter price"
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-success shadow">
                            💾 Save Book
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookAdd;
