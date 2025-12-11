// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="nf-container">
      <h1 className="nf-title">404</h1>
      <p className="nf-text">صفحه‌ای که دنبالش هستی پیدا نشد!</p>

      <Link to="/" className="nf-button">
        بازگشت به صفحه اصلی
      </Link>
    </div>
  );
};

export default NotFound;
