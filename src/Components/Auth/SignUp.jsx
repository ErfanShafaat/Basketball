import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";
import { collection, addDoc, query, where, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../FireBase/config";


export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    code: "",
    password: "",
    confirmPassword: "",
  });

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // تغییرات اینپوت‌ها
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // تولید OTP (سمت کلاینت – نمایشی)
  const generateOTP = () => {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    const generatedOtp = array[0].toString().slice(0, 4).padStart(4, "0");
    console.log("کد OTP:", generatedOtp);
    setOtp(generatedOtp);
  };

  // ارسال فرم
const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (
    !formData.username ||
    !formData.phone ||
    !formData.password ||
    !formData.confirmPassword ||
    !formData.code
  ) {
    setError("لطفاً تمام فیلدها را پر کنید");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    setError("رمز عبور و تکرار آن مطابقت ندارند");
    return;
  }

  if (formData.code !== otp) {
    setError("کد OTP نادرست است");
    return;
  }

  setLoading(true);
  try {
    // توجه: اسم collection دقیقا همان باشد که در Firebase دارید
    const usersRef = collection(db, "Users"); // small "u" اگر collection شما همین باشد
    const q = query(usersRef, where("username", "==", formData.username));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      // اگر username قبلاً وجود دارد
      setError("این نام کاربری قبلاً ثبت شده است");
      setLoading(false);
      return;
    }

    // افزودن کاربر جدید
    await addDoc(usersRef, {
      username: formData.username,
      phone: formData.phone,
      password: formData.password, // ⚠️ هش کردن در پروژه واقعی الزامی
      role: "user",
      createdAt: serverTimestamp(),
    });

    navigate("/Login");
  } catch (err) {
    console.error(err);
    setError("مشکلی در ثبت‌نام پیش آمد. دوباره تلاش کنید.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2 className={styles.title}>ثبت نام</h2>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>نام کاربری</label>
            <input
              type="text"
              name="username"
              placeholder="نام کاربری..."
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>شماره موبایل</label>
            <div className={styles.phoneInputWrapper}>
              <input
                type="text"
                name="phone"
                placeholder="مثال: 09123456789"
                className={styles.phoneInput}
                value={formData.phone}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles.sendCodeInside}
                onClick={generateOTP}
              >
                ارسال کد
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>کد تأیید</label>
            <input
              type="text"
              name="code"
              placeholder="کد پیامک شده..."
              value={formData.code}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>رمز عبور</label>
            <input
              type="password"
              name="password"
              placeholder="رمز عبور..."
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>تکرار رمز عبور</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="تکرار رمز عبور..."
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
          )}

          <button type="submit" className={styles.loginBtn} disabled={loading}>
            {loading ? "در حال ثبت‌نام..." : "ثبت نام"}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.signupText}>
            قبلاً ثبت‌نام کرده‌اید؟{" "}
            <Link to="/Login" className={styles.signupLink}>
              وارد شوید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
