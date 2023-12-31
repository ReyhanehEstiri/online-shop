import React, { useState, useEffect } from 'react';
import '../cssfile/quote.css';

const Quote = () => {
  const apiUrl = "https://96c6-217-218-145-81.ngrok-free.app/api/v1/Book/GetQuote";
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
          return;
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
