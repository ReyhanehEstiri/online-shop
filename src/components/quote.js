import React, { useState, useEffect } from 'react';
import '../cssfile/quote.css';

const Quote = () => {
  const apiUrl = "https://d6a5-217-218-145-215.ngrok-free.app/api/v1/Book/GetQuote";
  const [quoteData, setQuoteData] = useState({ sentence: 'Loading..', author: 'Author' });

  const fetchInfo = () => {
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning':true,
        'Accept': '*/*',
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Data received:', data);
        setQuoteData(data);
      })
      .catch((error) => console.error('Error fetching quote data:', error));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="quote-section">
      <p className="quote-text">"{quoteData.quote}"</p>
      <br></br>
      <p className="quote-author">{quoteData.author}</p>
    </div>
  );
};

export default Quote;
