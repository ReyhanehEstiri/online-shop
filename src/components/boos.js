// components/Book.js
import React, { useState } from 'react';

const Book = ({ id, title, author, price, imageUrl, description }) => {
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(
    localStorage.getItem(`wishlist_${id}`) === 'true'
  );

  const handleAddToWishlist = () => {
    // Update local state
    setIsAddedToWishlist((prev) => !prev);

    // Update local storage
    localStorage.setItem(`wishlist_${id}`, !isAddedToWishlist);
  };

  return (
    <div className="book">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{author}</p>
      <p>${price}</p>
      {description && <p className="description">{description}</p>}
      <button onClick={handleAddToWishlist}>
        {isAddedToWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
      </button>
      <button>Add to Cart</button>
    </div>
  );
};

export default Book;
