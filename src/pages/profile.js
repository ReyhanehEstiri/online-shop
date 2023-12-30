import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssfile/profile.css';
import Login from './login';
import Cookies from 'js-cookie';
const BASE_URL = ' https://25ed-5-202-181-171.ngrok-free.app/api/v1/User/GetUserProfile'; 

function Profile() {
  const [user, setUser] = useState(null);
  const [cookie, setCookie] = useState('');
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  let logged_in = false;
  let user_id = localStorage.getItem("user_id");

  if (user_id) {
      logged_in = true;
  }

  useEffect(() => {
    if (user_id && logged_in) {
      getProfile();
  }

    
    const savedCookie = localStorage.getItem('cookie');
    setCookie(savedCookie);


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
      credentials: "same-origin",
      headers: {
        'Set-Cookie': '.AspNetCore.Identity.Application='+localStorage.getItem('cookie'),
        'ngrok-skip-browser-warning':true,
        'accept': '*/*'
      }
    })
      .then((response) => {
        if (!response.ok) {
          // throw new Error('Failed to fetch user data');
          navigate('/Login');
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
