import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { getData } from "../../Hooks/getData";
import { toast, Toaster } from "react-hot-toast"; 

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("نام کاربری الزامی است"),
    password: Yup.string().required("رمز عبور الزامی است"),
  });

  const handleLogin = async (values) => {
    setError("");
    setLoading(true);
    try {
      const users = await getData("users");

      const user = users.find(
        (u) => u.username === values.username && u.password === values.password
      );

      if (!user) {
        setError("نام کاربری یا رمز عبور اشتباه است");
      } else {
        Cookies.set("user", JSON.stringify(user), { expires: 7 });

       
        toast.success(`خوش آمدید ${user.username}!`, {
          position: "top-right",
          duration: 3000,
        });

        
        setTimeout(() => {
          navigate("/");
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("مشکلی در ورود پیش آمد. دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Toaster /> {/* اضافه شده */}
      <div className={styles.card}>
        <h2 className={styles.title}>ورود به حساب</h2>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <div className={styles.inputGroup}>
                <label>نام کاربری</label>
                <Field
                  type="text"
                  name="username"
                  placeholder="نام کاربری..."
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{ color: "red", marginBottom: "5px" }}
                />
              </div>

              <div className={styles.inputGroup}>
                <label>رمز عبور</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="رمز عبور..."
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{ color: "red", marginBottom: "5px" }}
                />
              </div>

              {error && (
                <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>
              )}

              <button
                type="submit"
                className={styles.loginBtn}
                disabled={isSubmitting || loading}
              >
                {loading ? "در حال ورود..." : "ورود"}
              </button>
            </Form>
          )}
        </Formik>

        <div className={styles.footer}>
          <Link to="/forgot" className={styles.forgot}>
            فراموشی رمز عبور؟
          </Link>

          <p className={styles.signupText}>
            هنوز ثبت‌نام نکرده‌اید؟{" "}
            <Link to="/SignUp" className={styles.signupLink}>
              ثبت نام کنید
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
