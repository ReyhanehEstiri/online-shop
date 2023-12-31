import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../cssfile/profile.css';
import ProductM from '../components/productM';

function Profile() {
  const [user, setUser] = useState({username:"", credit:"", iamge:""});
  const [userBooks, setUserBooks] = useState([]);
  const [userWishList, setUserWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    if(isLoading){
      getProfile();
      getWishList();
      getUserBooks();
    }
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
      navigate('/Login');
    } finally {
      // setIsLoading(false);
    }
  };
  const getWishList = () => {
    try {
    var user_id = localStorage.getItem('user_id');
    fetch('https://localhost:7268/api/v1/Book/GetUserWishList?userId='+user_id, {
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
        setUserWishList(data);
        return data;
      });
    } catch (error) {
      navigate('/Login');
    } finally {
      // setIsLoading(false);
    }
  };

  const getUserBooks= ()=>{
    try {
      var user_id = localStorage.getItem('user_id');
      fetch('https://localhost:7268/api/v1/Book/GetUserBooks?userId='+user_id, {
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
          setUserBooks(data);
          return data;
        });
      } catch (error) {
        navigate('/Login');
      } finally {
        setIsLoading(false);
      }
  };

  const handleLogOut= ()=>{
    localStorage.removeItem('user_id');
    navigate('/login');
    window.location.reload(); 
  }

  return (
    <div className='profile-container'>
        <div className='profile-text-container'>
          <div className='profile-text-container-text'>
            <p className='profile-text'>My Profile</p>
            <button className='logout-button'onClick={handleLogOut}>Logout</button>
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
              <div id='1' className='profile-wish'>
              {/* <div className='profile-books-wish'> */}
                  <div className='profile-books-title'>
                    Wish List
                  </div>
                  <div className='user-books-wish'>
                    {userWishList.map((product) => (
                      <ProductM key={product.id} product={product} />
                    ))}
                  </div>
                {/* </div> */}
              </div>
            </div>
            <div className='profile-user-books'>
              <div className='profile-user-books-total'>
                <div className='profile-books'>
                  <div className='profile-books-title'>
                    My Books
                  </div>
                  <div className='user-books-images'>
                    {userBooks.map((product) => (
                      <ProductM key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
