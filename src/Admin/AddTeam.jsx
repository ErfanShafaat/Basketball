import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import './AddPlayer.css'

import { collection, addDoc } from "firebase/firestore";
import { db } from "../FireBase/config";

export default function AddTeam() {
  const [name, setName] = useState("");
  const [coach, setCoach] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  const navigate = useNavigate();

  // بررسی نقش کاربر
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        if (user.role !== "admin") {
          setAccessDenied(true);
        }
      } catch (err) {
        console.error("خطا در خواندن کوکی:", err);
        setAccessDenied(true);
      }
    } else {
      setAccessDenied(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !coach || !city || !country || !logo) return;

    const newTeam = {
      name,
      coach,
      city,
      country,
      logo,
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      await addDoc(collection(db, "Teams"), newTeam);

      alert("تیم با موفقیت اضافه شد!");

      // پاک کردن فرم
      setName("");
      setCoach("");
      setCity("");
      setCountry("");
      setLogo("");

    } catch (error) {
      alert("مشکلی پیش آمد! لطفاً دوباره تلاش کنید.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (accessDenied) {
    return (
      <div className="add-team-container">
        <h2>دسترسی غیرمجاز</h2>
        <p>شما اجازه دسترسی به این صفحه را ندارید.</p>
        <p>تنها ادمین ها اجازه کار با این صفحه را دارند</p>
      </div>
    );
  }

  return (
    <div className="add-team-container">
      <h2>افزودن تیم جدید</h2>

      <form className="add-team-form" onSubmit={handleSubmit}>
        <label>نام تیم:</label>
        <input
          type="text"
          placeholder="مثلاً Los Angeles Lakers"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>مربی:</label>
        <input
          type="text"
          placeholder="مثلاً Frank Vogel"
          value={coach}
          onChange={(e) => setCoach(e.target.value)}
          required
        />

        <label>شهر:</label>
        <input
          type="text"
          placeholder="Los Angeles"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />

        <label>کشور:</label>
        <input
          type="text"
          placeholder="USA"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />

        <label>لینک لوگو:</label>
        <input
          type="text"
          placeholder="https://example.com/team-logo.jpg"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "در حال افزودن..." : "افزودن تیم"}
        </button>
      </form>
    </div>
  );
}
