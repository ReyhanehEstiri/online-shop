// BestSellers.js
import React, { useState, useEffect } from "react";
import ProductM from "./productM";
import '../cssfile/bestseller.css';

const BestSellers = () => {
  const [bestSellers, setBestSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await fetch("http://localhost:7266/api/v1/Book/GetBestSellers", {
          method: 'GET',
          headers: {
            'accept': '*/*',
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch bestsellers");
        }

        const data = await response.json();
        // Assuming data is an array of bestseller products
        setBestSellers(data);
      } catch (error) {
        console.error("Error fetching bestsellers:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <div className="bestsellers-section">
      <div className="bestseller-text">
        <h1>Best Sellers Of The Week</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bestsellers-product-container">
          <div className="bestsellers-product-wrap">
            {bestSellers.map((product) => (
              <ProductM key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSellers;
