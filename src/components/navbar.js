import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import '../cssfile/navbar.css';

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const addToCart = item => {
    setCartItems([...cartItems, item]);
  };
  const handleClick = () => {
    navigate('/basket');
}

  return (
    <nav className="navbar">
      <title>Online Book Shop</title>
      <div className="navbar">
        <div className="brand" ><a href='/'>Online Book Shop</a></div>
        <ul>
          <li><Link to="/Wishlist">Wishlist</Link></li>
          <li><Link to="/profile">My profile</Link></li>
          <li><Link to="/">Home</Link></li>
        </ul>
                      <button className="cart-button" onClick={(handleClick)}>
                          Cart ({cartItems.length})
                      </button>



      </div>
    </nav>
  );
};

export default Navbar;
