import React, { useState, useEffect } from 'react';
import "../cssfile/book.css";
import { useNavigate, useParams } from 'react-router-dom';
import "../cssfile/book.css"

const BookDetails = () => {
  const [bookDetails, setBookDetails] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log(id);
    const fetchBookDetails = async () => {
      try {
        const response = await fetch("https://localhost:7268/api/v1/Book/GetBookDetails?Id="+id, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning':true,
            'accept': '*/*',
          },
        });

        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  const handleAddToCart = async () => {
    var user_id = localStorage.getItem('user_id');
    if(!user_id){
      navigate('/login');
      return;
    }
    
    try {
      const response = await fetch("https://localhost:7268/api/v1/Book/AddToCart", {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning':true,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: id,
          userId: localStorage.getItem('user_id')
        }),
      });
      if(!response.ok){
        alert("Book already exists in the cart");
      }else{
        navigate('/basket');
      }
    } catch (error) {
      alert("Error");
    }
  };

  const handleAddToWishlist = async () => {
    var user_id = localStorage.getItem('user_id');
    if(!user_id){
      navigate('/login');
      return;
    }
    try {
      const response = await fetch("https://localhost:7268/api/v1/Book/AddToWishList", {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning':true,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: id,
          userId: localStorage.getItem('user_id')
          // Add other necessary parameters for adding to the wishlist
        }),
      });
      if(!response.ok){
        alert("Book already exists in the wish list");
      }else{
        navigate('/profile');
      }
    } catch (error) {
      alert("Error");
    }
  };
  function breakText(text) {
    const maxLength = 800;
    if (text.length <= maxLength) {
      return text; // Return the text as it is if it's less than or equal to 200 characters
    }
  
    const shortenedText = text.substring(0, maxLength); // Extract the first 200 characters
    const truncatedText = shortenedText.replace(/\s\S*$/, '...'); // Replace the last word boundary with "..."
    return truncatedText;
  }

  function detailsHelper(){
    return(
      <div>
        <br></br>
        <div className='color919191'>Price</div>
        <div>{bookDetails.price}</div>
        <div className='color919191'>Publisher</div>
        <div>{bookDetails.publisher}</div>
        <div className='color919191'>Publish Date</div>
        <div>{bookDetails.publishDate}</div>
        <div className='color919191'>Pages</div>
        <div>{bookDetails.pages}</div>
        <div className='color919191'>Dimensions</div>
        <div>{bookDetails.dimensions}</div>
        <div className='color919191'>Language</div>
        <div>{bookDetails.language}</div>
        <div className='color919191'>Type</div>
        <div>{bookDetails.type}</div>
        <div className='color919191'>EAN/UPC</div>
        <div>{bookDetails.ean}</div>
      </div>
    );
  }

  if (!bookDetails) {
    return <p>Loading...</p>;
  }
  return (
    <div className='book-detail-root'>
      <div className="book-details-container">
      {/* <div className='book-title-cart'>
        <h2 className="book-title">{bookDetails.title}</h2>
        <p className="book-authors">Authors: {bookDetails.author}</p>
      </div> */}
        {/* <div className="line"></div> */}
      <div className='book-details-card'>
        <div className='book-image-container'>
          <img className="book-image" src={bookDetails.imageUrl} alt={bookDetails.title} />
          </div>
          <div className='details-cart'>
            <h2 className="book-second-title">{bookDetails.title}</h2>
            <br></br>
            <p className="book-price">${bookDetails.price}</p>
            <div className='isAvailabe'>
              <div className='isAvailabe-text'>
                Availabe
              </div>
            </div>
            <div className='desc-cart'>
            <p className="book-description">
              Description: 
              <br></br>
              {breakText(bookDetails.description)}
              <br></br>
              <br></br>
              <div className='flex'>
              <button className="book-button addtocart" onClick={handleAddToCart}>Add to Cart</button>
              <button className="book-button wishlist" onClick={handleAddToWishlist}>Add to Wishlist</button>
              </div>
              </p>
          
            <p className="book-details-section">Product Details<br></br>{detailsHelper()}</p>
          </div>
          <div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookDetails;
