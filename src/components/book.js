// Book.js
import React from 'react';
import PropTypes from 'prop-types';
import '../cssfile/book.css';

const Books = ({ title, author, genre, description, imageUrl, onAddToWishlist, onAddToCart }) => {
  return (
    <div className="book-details">
      {imageUrl && <img src={imageUrl} alt={`Cover of ${title}`} className="book-image" />}

      <h2>{title}</h2>
      <p><strong>Author:</strong> {author}</p>
      <p><strong>Genre:</strong> {genre}</p>
      <p><strong>Description:</strong> {description}</p>
      {onAddToWishlist && (
        <button onClick={onAddToWishlist}>Add to Wishlist</button>
      )}
      {onAddToCart && (
        <button onClick={onAddToCart}>Add to Cart</button>
      )}
    </div>
  );
};

Books.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string, // Add imageUrl prop type
  onAddToWishlist: PropTypes.func,
  onAddToCart: PropTypes.func,
};

export default Books;
