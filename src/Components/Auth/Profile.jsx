import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import styles from "./UserProfile.module.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const parsedUser = JSON.parse(userCookie);
        setUser(parsedUser);
      } catch (err) {
        console.error("خطا در خواندن کوکی:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setUser(null);
    window.location.href = "/"; // هدایت به صفحه اصلی بعد از خروج
  };

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <h2>کاربر وارد نشده است</h2>
          <p>لطفاً ابتدا وارد سایت شوید.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <img
            src={
              user.avatar ||
              "https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS96nozaf8rL0GEk4pTZysGqvcQ_D8ESvJs1RvL6uUJiLnNUldZZNTyAgjxaO4J2xee5vum6fQRmiJmZ30gEFefbdjU2SOjW7rI8k9FXy1QqXYNVq1B7h6R17jX1lkERi5Kog3XSDF8rzPW&s=19"
            }
            alt="Profile"
            className={styles.avatar}
          />
          <h2 className={styles.name}>{user.username || "کاربر ناشناس"}</h2>
          <span className={styles.role}>{user.role || "کاربر"}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.item}>
            <span className={styles.label}>شماره تلفن:</span>
            <span className={styles.value}>{user.phone || "–"}</span>
          </div>

          {user.email && (
            <div className={styles.item}>
              <span className={styles.label}>ایمیل:</span>
              <span className={styles.value}>{user.email}</span>
            </div>
          )}

          {user.address && (
            <div className={styles.item}>
              <span className={styles.label}>آدرس:</span>
              <span className={styles.value}>{user.address}</span>
            </div>
          )}
        </div>

        <div className={styles.actions}>
          <button className={styles.editBtn}>ویرایش پروفایل</button>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            خروج
          </button>
        </div>
      </div>
    </div>
  );
}
