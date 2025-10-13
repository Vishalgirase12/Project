import React, { useContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { ThemeContext } from '../Context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../img/hero-animation.mp4';

const Login = () => {
  const { login } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  // Use only one state object for the form
  const [formData, setFormData] = useState({ email: '', password: '' });

  useEffect(() => {
    sessionStorage.clear();
    setFormData({ email: '', password: '' });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    debugger;
    try {
      const { email, password } = formData;

      if (email === 'admin@gmail.com' && password === '111') {
        alert("Admin logged in");
        login({ username: email, role: "ADMIN" });
        sessionStorage.setItem('username', email);
        setFormData({ email: '', password: '' }); // ✅ Clears inputs
        navigate('/product');
        return;
      } else {
        const res = await axios.post('http://localhost:8080/user/login', formData);

        if (res.data && res.data.user) {
          login({ username: res.data.user });
          sessionStorage.setItem('username', email);
          setFormData({ email: '', password: '' }); // ✅ Clears inputs
          navigate("/product");
        } else {
          alert("Login failed. Please try again.");
          setFormData({ email: '', password: '' }); // ✅ Clear on fail too (optional)
          navigate("/login");
        }
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
      setFormData({ email: '', password: '' }); // optional
    }
  };


  return (
    <>
      <video autoPlay muted loop playsInline className="hero-background-video">
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero-video-section position-relative d-flex justify-content-center align-items-center vh-100">
        <form

          autoComplete="off"
          onSubmit={handleSubmit}
          className="p-5 rounded shadow login-form"
          style={{
            width: '100%',
            maxWidth: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)', // semi-transparent white
            backdropFilter: 'blur(10px)', // adds a blur behind the form
            WebkitBackdropFilter: 'blur(10px)' // for Safari support
          }}
        >
          <h2 className="mb-4 text-center text-primary">Login Account</h2>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              autoComplete="off"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email Id"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              autoComplete="off"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              id="showPassword"
            />
            <label className="form-check-label" htmlFor="showPassword">
              Show Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <div className="text-center mt-3">
            <span>Don't have an account? </span>
            <a href="/register" className="text-decoration-none">
              Register
            </a>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
