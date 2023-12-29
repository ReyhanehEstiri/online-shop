import React, { useState, useEffect } from 'react';

const BookDetails = ({ bookId }) => {
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`http://localhost:7266/api/v1/Book/GetBookDetails?bookId=${bookId}`, {
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
      const response = await fetch(`https://your-api-endpoint/cart/add`, {
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
      const response = await fetch(`https://your-api-endpoint/wishlist/add`, {
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
    <div>
      <h2>{bookDetails.title}</h2>
      <img src={bookDetails.image} alt={bookDetails.title} style={{ maxWidth: '300px' }} />
      <p>Authors: {bookDetails.authors.join(', ')}</p>
      <p>Description: {bookDetails.description}</p>
      <p>Price: ${bookDetails.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleAddToWishlist}>Add to Wishlist</button>
    </div>
  );
};

export default BookDetails;
