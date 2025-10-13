import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ThemeContext } from '../Context/ThemeContext';
import '../index.css'; // Custom styles including .booking-page

function BookingPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(ThemeContext);

    const [product, setProduct] = useState(null);
    const [address, setAddress] = useState('');
    const [mobile, setMobile] = useState('');
    const [errors, setErrors] = useState({});
    const [placeholder, setPlaceholder] = useState('Enter your address');

    // Add/remove background class for this page
    useEffect(() => {
        document.body.classList.add('booking-page');
        if (!user) navigate('/login');
        return () => document.body.classList.remove('booking-page');
    }, [user, navigate]);

    // Fetch product by ID
    useEffect(() => {
        axios.get(`http://localhost:8080/product/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error('Error fetching product:', err));
    }, [id]);

    // Set 📍 Address: as placeholder on screen click (if empty)
    useEffect(() => {
        const handleClick = () => {
            if (!address.trim()) {
                setPlaceholder('📍 Address:');
            }
        };
        document.addEventListener('click', handleClick);
        return () => document.removeEventListener('click', handleClick);
    }, [address]);

    const validateForm = () => {
        const newErrors = {};

        if (!address.trim()) {
            newErrors.address = '📍 Address is required.';
        } else if (address.trim().length < 10) {
            newErrors.address = '📍 Address must be at least 10 characters.';
        }

        if (!mobile.trim()) {
            newErrors.mobile = '📞 Mobile number is required.';
        } else if (!/^\d{10}$/.test(mobile.trim())) {
            newErrors.mobile = '📞 Must be exactly 10 digits.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirm = () => {
        if (!validateForm()) return;
        navigate('/payment', {
            state: {
                productId: product.id,
                productName: product.name,
                price: product.price,
                address,
                mobile
            }
        });
    };

    if (!product) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border text-primary" role="status" />
                <p>Loading product...</p>
            </div>
        );
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card booking-card animate__animated animate__zoomIn p-4 shadow-lg w-100" style={{ maxWidth: '600px' }}>
                <h2 className="text-center text-success mb-4">📚 Booking Confirmation</h2>

                <div className="text-center mb-3">
                    <h4 className="fw-bold">{product.name}</h4>
                    <p><strong>📘 Category:</strong> {product.category}</p>
                    <p><strong>💰 Price:</strong> ₹{product.price}</p>
                </div>

                <div className="form-group mb-3">
                    <label htmlFor="address"></label>
                    <textarea
                        id="address"
                        className={`form-control`}
                        rows="3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter Your Address"
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                </div>

                <div className="form-group mb-4">
                    <label htmlFor="mobile"></label>
                    <input
                        type="tel"
                        id="mobile"
                        className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                    />
                    {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                </div>

                <button className="btn btn-success w-100 animate__animated animate__pulse animate__infinite" onClick={handleConfirm}>
                    ✅ Confirm Booking
                </button>
            </div>
        </div>
    );
}

export default BookingPage;
