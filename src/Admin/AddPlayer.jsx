import React, { useState, useEffect } from "react";
import "./AddPlayer.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../FireBase/config";

export default function AddPlayer() {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState("");
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

    if (!name || !team || !number || !image) return;

    const newPlayer = {
      name,
      team,
      number: Number(number),
      image,
      createdAt: new Date(),
    };

    try {
      setLoading(true);

      await addDoc(collection(db, "Players"), newPlayer);

      toast.success(`بازیکن ${name} با موفقیت اضافه شد!`, {
        position: "top-right",
        autoClose: 3000,
      });

      // پاک کردن فرم
      setName("");
      setTeam("");
      setNumber("");
      setImage("");
    } catch (error) {
      toast.error("مشکلی پیش آمد! لطفاً دوباره تلاش کنید.", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (accessDenied) {
    return (
      <div className="add-player-container">
        <h2>دسترسی غیرمجاز</h2>
        <p>شما اجازه دسترسی به این صفحه را ندارید.</p>
      </div>
    );
  }

  return (
    <div className="add-player-container">
      <h2>افزودن بازیکن جدید</h2>

      <form className="add-player-form" onSubmit={handleSubmit}>
        <label>نام بازیکن:</label>
        <input
          type="text"
          placeholder="مثلاً Devin Booker"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>تیم:</label>
        <input
          type="text"
          placeholder="Phoenix Suns"
          value={team}
          onChange={(e) => setTeam(e.target.value)}
          required
        />

        <label>شماره پیراهن:</label>
        <input
          type="number"
          placeholder="1"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />

        <label>لینک عکس:</label>
        <input
          type="text"
          placeholder="https://example.com/player.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          required
        />

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "در حال افزودن..." : "افزودن بازیکن"}
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}
