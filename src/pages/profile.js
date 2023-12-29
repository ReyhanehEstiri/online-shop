import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssfile/profile.css';
import Login from './login';
const BASE_URL = 'http://localhost:7266/api/v1/User/GetUserProfile'; // Replace with your actual backend URL

function Profile() {
  const [user, setUser] = useState(null);
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = localStorage.getItem('user_id');

    if (user_id) {
      setIsLoggedIn(true);
      getProfile(user_id);
    } else {
      setIsLoggedIn(false);
      // Redirect to the login page if not logged in
      navigate('/Login');
    }

    const cartItems = JSON.parse(localStorage.getItem('items'));
    let counter = 0;
    if (cartItems) {
      for (let i = 0; i < cartItems.length; i++) {
        counter = counter + cartItems[i].quantity;
      }
      setCartItemsNumber(counter);
    }
  }, [navigate]);

  const getProfile = (user_id) => {
    fetch(`${BASE_URL}/User/GetUserProfile`, {
      method: 'GET',
      headers: {
        'accept': '*/*',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  if (!isLoggedIn) {
    // No need to render anything here, as the user will be redirected to the login page
    return null;
  }

  return (
    <div className='banner'>
      <h1 className='main_title'>My Profile</h1>
      <div className='line'></div>

      <div className='user-card'>
        <div className='user-info'>
          <p>{user ? user.userName : 'Loading...'}</p>
        </div>
        <div className='wishlist'>
          {/* Assuming wishList is an array in the user data */}
          <p>{user ? user.wishList.join(', ') : 'Loading...'}</p>
          <div className='wishlist_style'>
            <Link to='/wishlist'>WISHLIST</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
