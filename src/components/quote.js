import React, { useState, useEffect } from 'react';
import '../cssfile/quote.css';

const Quote = () => {
  const apiUrl = "http://localhost:7266/api/v1/Book/GetQuote";
  const [quoteData, setQuoteData] = useState({ sentence: 'Loading..', author: 'Author' });

  const fetchInfo = () => {
    return fetch(apiUrl, {
      method: 'GET',
      headers: {
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
      <p className="quote-text">{quoteData.sentence}</p>
      <p className="quote-author">{quoteData.author}</p>
    </div>
  );
};

export default Quote;
