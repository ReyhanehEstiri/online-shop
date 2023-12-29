// ActivityItem.js
import React from "react";


const ActivityItem = ({ activity }) => (
  <div className="activity-item">
    <p>{activity.description}</p>
    <small>{activity.timestamp}</small>
  </div>
);

export default ActivityItem;
