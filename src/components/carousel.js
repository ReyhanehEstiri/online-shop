import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Carousel = ({ items }) => {
  // Slick carousel settings
  const slickSettings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Slider {...slickSettings}>
      {items.map((item, index) => (
        <div key={index} className="carousel-item">
          <img src={item.image} alt={`Item ${index + 1}`} />
          <p>{item.title}</p>
          <p>Author: {item.author}</p>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
