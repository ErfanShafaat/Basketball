import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* بخش لینک‌ها */}
        <div className={styles.links}>
          <h3>لینک‌های مهم</h3>
          <ul>
            <li><Link to="/">خانه</Link></li>
            <li><Link to="/Players">بازیکنان</Link></li>
            <li><Link to="/teams">تیم‌ها</Link></li>
            <li><Link to="/contact">تماس با ما</Link></li>
          </ul>
        </div>

        {/* بخش شبکه‌های اجتماعی */}
        <div className={styles.social}>
          <h3>ما را دنبال کنید</h3>
          <div className={styles.icons}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* اطلاعات تماس */}
        <div className={styles.contact}>
          <h3>تماس با ما</h3>
          <p>ایمیل: info@example.com</p>
          <p>شماره تماس: 09123456789</p>
          <p>آدرس: تهران، ایران</p>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2025 بسکتبال. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  );
}
