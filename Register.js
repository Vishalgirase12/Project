import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import heroVideo from '../img/hero-animation.mp4';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:8080/user/saveu', formData);
      alert('Registration successful!');
      setFormData({ username: '', email: '', password: '', cpassword: '' });
      navigate('/login');
    } catch (error) {
      alert('Registration failed. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      {/* Video Background */}
      <video autoPlay muted loop playsInline className="hero-background-video">
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Form Section */}
      <section className="hero-video-section position-relative">
        <div className="register-container">
          <div className="register-form login-form animate__animated animate__fadeInUp">
            <h2 className="text-center text-primary mb-4">Register Account</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">

                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder='Username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">

                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder='Email Id'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group mb-3">

                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder='Password'
                  minLength={4}
                  maxLength={9}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Password must be 4-9 characters')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
              </div>

              <div className="form-group mb-4">

                <input
                  type="password"
                  className="form-control"
                  id="cpassword"
                  name="cpassword"
                  placeholder='Cpassword'
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-custom w-100 pulse">Register</button>

              <div className="text-center mt-3">
                <span>Already registered? </span>
                <a href="/login" className="text-primary fw-bold text-decoration-none">Login here</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
