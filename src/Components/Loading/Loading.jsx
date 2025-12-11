// Loading.js
import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading players...</p>
    </div>
  );
};

export default Loading;
