// src/Component/BookSlider.jsx
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookSlider() {
    const images = [
        'https://picsum.photos/id/1005/1200/400',
        'https://picsum.photos/id/1011/1200/400',
        'https://picsum.photos/id/1002/1200/400'
    ];

    return (
        <Carousel className="mb-4">
            {images.map((img, idx) => (
                <Carousel.Item key={idx}>
                    <img className="d-block w-100" src={img} alt={`Slide ${idx + 1}`} />
                    <Carousel.Caption>
                        <h3>Book Title {idx + 1}</h3>
                        <p>Explore our collection of amazing books</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default BookSlider;
