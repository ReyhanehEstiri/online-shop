import React, { useState, useEffect } from 'react';
import "../cssfile/book.css";

const BookDetails = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch("https://d6a5-217-218-145-215.ngrok-free.app/api/v1/Book/GetBookDetails?bookId=${bookId}", {
          method: 'GET',
          headers: {
            'accept': '*/*',
          },
        });

        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  const handleAddToCart = async () => {
    try {
      const response = await fetch("https://d6a5-217-218-145-215.ngrok-free.app/api/v1/Book/AddToCart", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: bookDetails.id,
          // Add other necessary parameters for adding to the cart
        }),
      });

      // Handle the response as needed
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await fetch("https://d6a5-217-218-145-215.ngrok-free.app/api/v1/Book/AddToWishList", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: bookDetails.id,
          // Add other necessary parameters for adding to the wishlist
        }),
      });

      // Handle the response as needed
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  if (!bookDetails) {
    return <p>Loading...</p>;
  }
  return (
    <div className="book-details-container">
      <h2 className="book-title">{bookDetails.title}</h2>
      <div className="line"></div>
      <img className="book-image" src={bookDetails.image} alt={bookDetails.title} />
      <p className="book-authors">Authors: {bookDetails.authors.join(', ')}</p>
      <p className="book-description">Description: {bookDetails.description}</p>
      <p className="book-price">Price: ${bookDetails.price}</p>
      <button className="book-button" onClick={handleAddToCart}>Add to Cart</button>
      <button className="book-button wishlist" onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
};

export default BookDetails;
