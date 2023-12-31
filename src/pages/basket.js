import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../cssfile/basket.css';


function Basket() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('your_api_endpoint_here');
        const data = await response.json();
        setProducts(data); // Assuming the API returns an array of products
      } catch (error) {
        console.error('Error fetching data from API', error);
      }
    };

    fetchData();
  }, []);

  const itemCount = products.reduce((count, product) => count + parseInt(product.quantity) || 0, 0);
  const subTotal = products.reduce((total, product) => total + product.quantity * product.price, 0);
  const fixedTax = 2; // Fixed $2 tax
  const shippingCost = 4; // Shipping cost
  const totalPrice = subTotal + fixedTax + shippingCost;

  const updateQuantity = (index, event) => {
    const updatedProducts = [...products];
    const value = event.target.value;
    const valueInt = parseInt(value);

    if (value === "") {
      updatedProducts[index].quantity = value;
    } else if (valueInt > 0 && valueInt < 100) {
      updatedProducts[index].quantity = valueInt;
    }

    setProducts(updatedProducts);
  };

  const checkQuantity = (index, event) => {
    if (event.target.value === "") {
      const updatedProducts = [...products];
      updatedProducts[index].quantity = 1;
      setProducts(updatedProducts);
    }
  };

  const removeItem = async (bookId, userId) => {
    try {
      const response = await fetch('https://c032-86-55-39-39.ngrok-free.app/api/v1/Book/RemoveBookFromCart', {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: bookId,
          userId: userId,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        // Handle the response data as needed
        console.log('Remove Book API response:', responseData);
        // Update the products state to reflect the removal
        setProducts((prevProducts) => prevProducts.filter((product) => product.bookId !== bookId));
      } else {
        console.error('Failed to remove book from cart');
      }
    } catch (error) {
      console.error('Error during remove book API call:', error);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await fetch('https://c032-86-55-39-39.ngrok-free.app/api/v1/Book/PurchaseUserCart', {
        method: 'POST',
        headers: {
          'accept': '*/*',
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Purchase API response:', responseData);
      } else {
        console.error('Failed to purchase user cart');
      }
    } catch (error) {
      console.error('Error during purchase API call:', error);
    }
  };

  return (
    // <div id="app">
    //   <div className='banner'>
    //     <h1 className="main_title">Basket</h1>
    //     <div className="line"></div>
    //   </div>

    //   <section className="container">
    //   </section>

    //   <div className='summary-box'>
    //     <div className="summary">
    //       <h1>Order Summary</h1>
    //       <ul>
    //         <li>Subtotal <span>${subTotal}</span></li>
    //         <li>Tax <span>${fixedTax}</span></li>
    //         <li>Shipping <span>${shippingCost}</span></li>
    //         <li className="total">Total <span>${totalPrice}</span></li>
    //       </ul>
    //     </div>

    //     <div className="checkout">
    //       <button type="button" onClick={handlePurchase}>
    //         Continue to payment
    //       </button>
    //     </div>
    //   </div>

    //   {products.length > 0 && (
    //     <ul className="products">
    //       {products.map((product, index) => (
    //         <li key={index} className="row">
    //           {/* ... (your existing product information) */}
    //           <button type="button" onClick={() => removeItem(product.bookId, product.userId)}>
    //             Remove
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   )} 

    // </div>
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
          <div className='basket-cart-book'>4</div>
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
