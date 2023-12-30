// NewReleases.js
import React, { useState, useEffect } from "react";
import ProductM from "./productM";
import '../cssfile/newrelease.css';

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const response = await fetch(" https://25ed-5-202-181-171.ngrok-free.app/api/v1/Book/GetNewReleases", {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning':true,
            'accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch new releases");
        }

        const data = await response.json();
        // Assuming data is an array of new release products
        setNewReleases(data);
      } catch (error) {
        console.error("Error fetching new releases:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewReleases();
  }, []);

  return (
    <div className="new-releases-section">
      <div className="new-releases-text">
        <h1>New Releases This Week</h1>
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="new-releases-product-container">
          <div className="new-releases-product-wrap">
            {newReleases.map((product) => (
              <ProductM key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewReleases;
