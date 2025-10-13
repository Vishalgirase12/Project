import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../Context/ThemeContext';
import axios from 'axios';
import './PaymentPage.css';

function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(ThemeContext);
    const { productName, price, productId } = location.state || {};
    const [loading, setLoading] = useState(false);

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        if (!user) return navigate('/login');

        setLoading(true);
        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load.');
            setLoading(false);
            return;
        }

        try {
            const order = await axios.post('http://localhost:8080/product/create-order', {
                amount: price * 100
            });

            const options = {
                key: 'rzp_test_6SENyDD1PJRpPu',
                amount: order.data.amount,
                currency: 'INR',
                name: 'BookStore',
                description: `Payment for ${productName}`,
                order_id: order.data.id,
                handler: async function (response) {
                    await axios.put('http://localhost:8080/product/buybook', {
                        id: productId,
                        user: user.username,
                    });
                    alert('✅ Payment successful!');
                    navigate('/product');
                },
                prefill: {
                    name: user.username,
                    email: user.email || '',
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error(error);
            alert('Payment failed.');
        } finally {
            setLoading(false);
        }
    };

    if (!productName || !price || !productId) {
        return <p className="text-center mt-5 text-danger">❌ Invalid payment data.</p>;
    }

    return (
        <div className="payment-bg d-flex justify-content-center align-items-center">
            <div className="payment-card shadow-lg p-5 animated-card">
                <h2 className="text-center text-primary mb-4 zoom-in">💳 Payment Details</h2>
                <div className="mb-3 text-center">
                    <strong>📘 Book:</strong> {productName} <br />
                    <strong>ID:</strong> {productId}
                </div>
                <div className="mb-3 text-center">
                    <strong>👤 User:</strong> {user?.username}
                </div>
                <div className="mb-4 text-center text-success fs-5">
                    💰 Amount to Pay: ₹{price}
                </div>
                <button className="btn btn-success w-100" onClick={handlePayment} disabled={loading}>
                    {loading ? 'Processing...' : '✅ Pay Now'}
                </button>
            </div>
        </div>
    );
}

export default PaymentPage;