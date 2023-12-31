import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import '../cssfile/navbar.css';

const Navbar = () => {
  const [userCart, setUserCart] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const getUserBooks = ()=>{
      try {
        var user_id = localStorage.getItem('user_id');
        fetch('https://localhost:7268/api/v1/Book/GetUserCart?userId='+user_id, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning':true,
            'accept': '*/*', 
          },
        })
          .then((response) => {
            if (!response.ok) {
              return "";
            }
            return response.json();
          })
          .then((data) => {
            setUserCart(data);
          });
        } catch (error) {
          return "";
        } finally {
          setLoading(false);
        }

      if(userCart)
        return "("+userCart.length+")";
      return "";
    };

    if(isLoading)
      getUserBooks();
  });

  const handleClick = () => {
    navigate('/basket');
}

function navigateToHome(){
  navigate('/');
}

  return (
    <nav className="navbar">
      <title>Online Book Shop</title>
      <div className="navbar">
        <div className="brand"
        //  onClick={navigateToHome()}
         >Online Book Shop</div>
        <ul>
          {/* <li><Link to="/profile#1">Wishlist</Link></li>   */}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">My profile</Link></li>
          <li><Link to="/Login">Login</Link></li>
          <li><Link to="/SignUp">SignUp</Link></li>
          {/* <li><Link to="/"></Link></li> */}
        </ul>
          <button className="cart-button" onClick={(handleClick)}>
              Cart {userCart.length}
          </button>
      </div>
    </nav>
  );
};

export default Navbar;
