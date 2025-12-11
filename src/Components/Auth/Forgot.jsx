import React, { useState } from "react";
import styles from "./Forgot.module.css";

export default function Forgot() {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleOtpChange = (e, index) => {
    const val = e.target.value;
    if (/^\d?$/.test(val)) {
      const newOtp = [...otp];
      newOtp[index] = val;
      setOtp(newOtp);
      if (val && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>

        <h2 className={styles.title}>بازیابی رمز عبور</h2>

        <form className={styles.form}>

          {/* شماره موبایل با دکمه داخل input */}
          <div className={styles.inputGroup}>
            <label>شماره موبایل</label>
            <div className={styles.phoneInputWrapper}>
              <input
                type="text"
                placeholder="مثال: 09123456789"
                className={styles.phoneInput}
              />
              <button type="button" className={styles.sendCodeInside}>
                ارسال کد
              </button>
            </div>
          </div>

          {/* OTP ۴ رقمی */}
          <div className={styles.inputGroup}>
            <label>کد تأیید (۴ رقمی)</label>
            <div className={styles.otpWrapper}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className={styles.otpInput}
                />
              ))}
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}>
            تایید و ادامه
          </button>
        </form>
      </div>
    </div>
  );
}
