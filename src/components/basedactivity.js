// ActivitySection.js
import React, { useState, useEffect } from "react";
import '../cssfile/basedactivity.css';
import ProductM from "./productM";

const ActivitySection = () => {
  const [activityData, setActivityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const response = await fetch(" https://25ed-5-202-181-171.ngrok-free.app/api/v1/Book/GetBasedOnYourActivity", {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning':true,
            'accept': '*/*',
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user activity");
        }

        const data = await response.json();
        setActivityData(data); // Displaying the latest 5 activities
      } catch (error) {
        console.error("Error fetching user activity:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivityData();
  }, []);

  return (
    <div className="basedactivity-section">
      <div className="basedactivity-text">
        <h1> Based On Your Activity</h1>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="activity-list">
          {activityData.map((product) => (
            <ProductM key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ActivitySection;
