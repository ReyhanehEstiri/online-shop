import React, { useState, useEffect } from 'react';
import '../cssfile/wishlist.css';

function Wishlist() {
  const [wishlistData, setWishlistData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistData = async () => {
      try {
        const response = await fetch(' https://25ed-5-202-181-171.ngrok-free.app/api/v1/Book/GetUserWishList', {
          method: 'GET',
          headers: {
            'accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch wishlist data');
        }

        const data = await response.json();
        setWishlistData(data);
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlistData();
  }, []);

  const removeFromWishlist = async (itemId, userId) => {
    try {
      const response = await fetch(' https://25ed-5-202-181-171.ngrok-free.app/api/v1/Book/RemoveBookFromWishList', {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          bookId: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove item from wishlist');
      }

      // Update the wishlist data after successful removal
      setWishlistData((prevData) => prevData.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  return (
    <div className='wishlist-container'>
      <div className='banner'>
        <h1 className='main_title'>Wishlist</h1>
        <div className='line'></div>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='wishlist-items'>
          {wishlistData.map((item) => (
            <div key={item.id} className='wishlist-item'>
              <p>{item.title}</p>
              <button onClick={() => removeFromWishlist(item.id, item.userId)}>Remove</button>
            </div>
          ))}
          <button type="button">Remove All</button>
        </div>
      )}
    </div>
  );
}

export default Wishlist;
