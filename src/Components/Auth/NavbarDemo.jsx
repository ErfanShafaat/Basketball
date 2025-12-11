import React, { useEffect, useState, useRef } from "react";
import styles from "./LoginBox.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginBox() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate()
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        setUser(JSON.parse(userCookie));
      } catch (err) {
        console.error("خطا در خواندن کوکی:", err);
        setUser(null);
      }
    }
  }, []);

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("user"); 
    setUser(null);          
    setDropdownOpen(false);  
    navigate('./')
  };

  return (
    <div className={styles.loginBox}>
      <div className={styles.loginBtn}>
        {user ? (
          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              className={styles.dropdownToggle}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {user.username} ▼
            </button>
            {dropdownOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  to="/profile"
                  className={styles.dropdownItem}
                  onClick={() => setDropdownOpen(false)}
                >
                  پروفایل
                </Link>
                <button
                  className={styles.dropdownItem}
                  onClick={handleLogout}
                >
                  خروج از اکانت
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link className={styles.loginLink} to="/Login">
              ورود
            </Link>
            <Link className={styles.signupLink} to="/SignUp">
              ثبت‌نام
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
