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
    getUserBooks();
  }, []);

  const getUserBooks= ()=>{
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

  async function  removeItemFromCart (book_id) {
    try {
      const response = await fetch('https://localhost:7268/api/v1/Book/RemoveBookFromCart', {
        method: 'DELETE',
        headers: {
          'ngrok-skip-browser-warning':true,
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: book_id,
          userId: localStorage.getItem('user_id'),
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        getUserBooks();
      } else {
        console.error('Failed to remove book from cart');
      }
    } catch (error) {
      console.error('Error during remove book API call:', error);
    }
  } 

  // const handlePurchase = async () => {
  //   try {
  //     const response = await fetch('https://localhost:7268/api/v1/Book/PurchaseUserCart', {
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
  const getUserCartCount=()=>{
    return userCart.length;
  }

  const calcSubtotal=()=>{
    var total = 0;
    for(let i=0; i<userCart.length; i++){
      total+=userCart[i].price;
    }
    return total;
  }

  const calcShiping=()=>{
    return (calcSubtotal()*0.2).toFixed(2);
  }

  const calcTax=()=>{
    return (calcSubtotal()*0.09).toFixed(2);
  }

  const calcTotal=()=>{
    return (+calcSubtotal() + +calcShiping() + +calcTax()).toFixed(2);
  }

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
            {getUserCartCount()} items
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
                      1
                      <img className='minus-logo' src='../assets/images/458344.webp' onClick={()=>removeItemFromCart(bookDetails.id)}></img>
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
              <div className='flex-space-between'><p>Subtotal</p><p>{calcSubtotal()}</p></div>
              <div className='flex-space-between'><p>Shiping</p><p>{calcShiping()}</p></div>
              <div className='flex-space-between'><p>Tax</p><p>{calcTax()}</p></div>
            </div>
              <div className='basket-order-summary-total'>
              <div className='flex-space-between'><p>Total</p><p>{calcTotal()}</p></div>
              </div>
            <div className='efesdfsdf'>
              <button type="button" className='basket-order-summary-bottom'>
                <div className='basket-order-summary-bottom-text'>Continue to payment</div>
                <div className='basket-order-summary-bottom-arrow'></div>
              </button>
            </div>



            </div>

      </div>

    </div>
  );
}

export default Basket;
