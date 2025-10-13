import React, { useEffect, useState } from 'react';
import '../index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

import aboutImg from '../img/about.jpg';
import feature1 from '../img/feature1.png';
import feature2 from '../img/feature2.png';
import feature3 from '../img/feature3.png';
import slider1 from '../img/slider1.jpg';
import slider2 from '../img/slider2.jpg';
import slider3 from '../img/slider3.jpg';
import heroVideo from '../img/hero-animation.mp4';

// ZoomImage component for modal zoom
const ZoomImage = ({ src, alt, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ cursor: 'zoom-in', borderRadius: '8px' }}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div
          className="image-modal"
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              maxWidth: '90%',
              maxHeight: '90%',
              borderRadius: '12px',
              boxShadow: '0 0 20px rgba(255,255,255,0.4)',
              animation: 'zoomIn 0.3s ease',
            }}
          />
        </div>
      )}
    </>
  );
};

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="home">

      {/* Hero Section with Video Background */}
      <section className="hero-video-section position-relative">
        <video autoPlay muted loop playsInline className="hero-background-video">
          <source src={heroVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay text-white text-center">
          <div className="container" data-aos="fade-down">
            <h1 className="display-4 fw-bold">Welcome to BookVault </h1>
            <p className="lead">Explore, Learn, and Grow with our vast collection of books and resources.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section container py-5">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="fade-right">
            <img src={aboutImg} className="img-fluid rounded shadow" alt="About library" />
          </div>
          <div className="col-md-6" data-aos="fade-left">
            <h2 className="fw-bold">About Our Library</h2>
            <p>
              Our library offers a modern learning environment with thousands of digital and physical books.
              It is a place to inspire and empower students, researchers, and readers of all kinds.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold" data-aos="fade-up">Library Features</h2>
          <div className="row">
            <div className="col-md-4 mb-4" data-aos="zoom-in">
              <ZoomImage src={feature1} alt="Books" className="feature-icon" />
              <h5 className="mt-3">Thousands of Books</h5>
              <p>Wide range of books for all subjects and interests.</p>
              <button className="btn btn-outline-primary btn-sm mt-2" data-bs-toggle="collapse" data-bs-target="#feature1More">
                Show More
              </button>
              <div className="collapse mt-2" id="feature1More">
                <p className="text-muted">
                  Our library contains rare manuscripts, academic publications, fiction,
                  non-fiction, and more. Updated regularly for diverse reading needs.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="100">
              <ZoomImage src={feature2} alt="Ebooks" className="feature-icon" />
              <h5 className="mt-3">E-Book Access</h5>
              <p>Access digital books from anywhere, anytime.</p>
              <button className="btn btn-outline-primary btn-sm mt-2" data-bs-toggle="collapse" data-bs-target="#feature2More">
                Show More
              </button>
              <div className="collapse mt-2" id="feature2More">
                <p className="text-muted">
                  Access 10,000+ e-books on any device. Just log in with your ID to explore
                  subjects, highlights, and bookmarks seamlessly.
                </p>
              </div>
            </div>

            <div className="col-md-4 mb-4" data-aos="zoom-in" data-aos-delay="200">
              <ZoomImage src={feature3} alt="Support" className="feature-icon" />
              <h5 className="mt-3">Student Support</h5>
              <p>Get help from staff and connect with mentors.</p>
              <button className="btn btn-outline-primary btn-sm mt-2" data-bs-toggle="collapse" data-bs-target="#feature3More">
                Show More
              </button>
              <div className="collapse mt-2" id="feature3More">
                <p className="text-muted">
                  Whether it's research guidance, book suggestions, or academic help, our
                  expert staff and mentors are always ready to support you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section className="slider-section" data-aos="fade-up">
        <div id="libraryCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={slider1} className="d-block w-100 slider-img" alt="Library 1" />
            </div>
            <div className="carousel-item">
              <img src={slider2} className="d-block w-100 slider-img" alt="Library 2" />
            </div>
            <div className="carousel-item">
              <img src={slider3} className="d-block w-100 slider-img" alt="Library 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#libraryCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#libraryCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section bg-dark text-white py-5" data-aos="fade-in">
        <div className="container text-center">
          <h3>Get in Touch</h3>
          <p>
            Email:{" "}
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=vishalgirase555@gmail.com" target="_blank" rel="noopener noreferrer" className="text-info">
              vishalgirase555@gmail.com
            </a>{" "}
            | Phone:{" "}
            <a href="tel:+917028228235" className="text-info">
              +91 7028228235
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
