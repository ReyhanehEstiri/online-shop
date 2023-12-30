import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssfile/profile.css';

function Profile() {
  const [user, setUser] = useState({username:"", credit:"", iamge:""});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  

  useEffect(() => {
    var usr = getProfile();
    // setUser(usr);
    // localStorage.setItem("user_model", usr);
    
  });

  const getProfile = () => {
    try {
    var user_id = localStorage.getItem('user_id');
    fetch('https://localhost:7268/api/v1/Book/GetUserProfile?userId='+user_id, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning':true,
        'accept': '*/*',
      },
    })
      .then((response) => {
        if (!response.ok) {
          navigate('/Login');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
        return data;
      });
    } catch (error) {

    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='profile-container'>
        <div className='profile-text-container'>
          <div className='profile-text-container-text'>
            <p className='profile-text'>My Profile</p>
          </div>
        </div>
        {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className='profile-cart-container2'>
          <div className='profile-cart-container'>
            <div className='profile-user-wishlist'>
              <div className='profile-user'>
                <div><img src={user.image} className='user-profile'></img></div>
                <div className='user-details'>
                  <div className='user-name'>
                    <p>{user.username}</p>
                  </div>
                  <div className='user-credit'>
                    <p>${user.credit}</p>
                  </div>
                </div>
              </div>
              <div className='profile-wish'></div>
            </div>
            <div className='profile-user-books'>
            <div className='profile-books'></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
