import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {  useNavigate } from 'react-router-dom';
import '../cssfile/basket.css';
import { func } from 'prop-types';


function Basket() {
  const [products, setProducts] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookPrice, setBookPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("resr");
    getUserBooks();

    // fetchData();
  }, []);

  const getUserBooks= ()=>{
    try {
      var user_id = localStorage.getItem('user_id');
      fetch('https://c032-86-55-39-39.ngrok-free.app/api/v1/Book/GetUserCart?userId='+user_id, {
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
          setUserCart(data);
          return data;
        });
      } catch (error) {
        navigate('/Login');
      } finally {
        setIsLoading(false);
      }
  };

  // const itemCount = products.reduce((count, product) => count + parseInt(product.quantity) || 0, 0);
  // const subTotal = products.reduce((total, product) => total + product.quantity * product.price, 0);
  // const fixedTax = 2; // Fixed $2 tax
  // const shippingCost = 4; // Shipping cost
  // const totalPrice = subTotal + fixedTax + shippingCost;

  // const updateQuantity = (index, event) => {
  //   const updatedProducts = [...products];
  //   const value = event.target.value;
  //   const valueInt = parseInt(value);

  //   if (value === "") {
  //     updatedProducts[index].quantity = value;
  //   } else if (valueInt > 0 && valueInt < 100) {
  //     updatedProducts[index].quantity = valueInt;
  //   }

  //   setProducts(updatedProducts);
  // };

  // const checkQuantity = (index, event) => {
  //   if (event.target.value === "") {
  //     const updatedProducts = [...products];
  //     updatedProducts[index].quantity = 1;
  //     setProducts(updatedProducts);
  //   }
  // };

  // const removeItem = async (bookId, userId) => {
  //   try {
  //     const response = await fetch('https://c032-86-55-39-39.ngrok-free.app/api/v1/Book/RemoveBookFromCart', {
  //       method: 'DELETE',
  //       headers: {
  //         'accept': '*/*',
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         bookId: bookId,
  //         userId: userId,
  //       }),
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       // Handle the response data as needed
  //       console.log('Remove Book API response:', responseData);
  //       // Update the products state to reflect the removal
  //       setProducts((prevProducts) => prevProducts.filter((product) => product.bookId !== bookId));
  //     } else {
  //       console.error('Failed to remove book from cart');
  //     }
  //   } catch (error) {
  //     console.error('Error during remove book API call:', error);
  //   }
  // };

  // const handlePurchase = async () => {
  //   try {
  //     const response = await fetch('https://c032-86-55-39-39.ngrok-free.app/api/v1/Book/PurchaseUserCart', {
  //       method: 'POST',
  //       headers: {
  //         'accept': '*/*',
  //       },
  //     });

  //     if (response.ok) {
  //       const responseData = await response.json();
  //       console.log('Purchase API response:', responseData);
  //     } else {
  //       console.error('Failed to purchase user cart');
  //     }
  //   } catch (error) {
  //     console.error('Error during purchase API call:', error);
  //   }
  // };

  return (
    <div className='basket-page-container'>

      <div className='basket-text-container'>
        <div className='basket-text'>
          <p>
            Basket
          </p>
        </div>
        <div className='basket-items-count'>
          <p>
            3 items
          </p>
        </div>
      </div>

      <div className='basket-items-container'>
        <div className='basket-cart-books'>
          {userCart.map((bookDetails) => (
              <div className='basket-cart-book'>
                  <div className='basket-cart-item-image-container'>
                    <img className='basket-cart-item-image' alt={bookDetails.title} src={bookDetails.imageUrl}></img>
                  </div>
                  <div className='basket-cart-item-details-container'>
                    <div className='rer'>
                      <div className='title-price'>
                        <div className='basket-item-title'>
                          <p>{bookDetails.title}</p>
                        </div>
                        <div className='basket-item-price-black'>
                          <p>${bookDetails.price}</p>
                        </div>
                      </div>
                      <div className='basket-item-price'>
                          <p>${bookDetails.price}</p>
                      </div>
                    </div>
                    <div className='count-section'>
                      2
                      <img src='../assets/images/icon.svg'></img>
                    </div>
                  </div>
              </div>
            ))}
        </div>

        <div className='basket-order-summery-container'>
          <div className='basket-order-summary-title'>
            <p>Order summary</p>
          </div>
            <div className='basket-order-summary-item'>
              <p>Subtotal</p>
              <p>Shiping</p>
              <p>Tax</p>
            </div>
              <div className='basket-order-summary-total'>
                <p>Total</p>
              </div>
            <button type="button" className='basket-order-summary-bottom'>
              <div className='basket-order-summary-bottom-text'>Continue to payment</div>
              <div className='basket-order-summary-bottom-arrow'></div>
             </button>



            </div>

      </div>

    </div>
  );
}

export default Basket;
