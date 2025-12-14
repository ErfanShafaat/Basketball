import React, { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../FireBase/config";
import Swal from "sweetalert2";
import "animate.css";

const EditTeam = ({ show, onClose, teamId, initialData }) => {
  const [name, setName] = useState("");
  const [coach, setCoach] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);

  // مقداردهی اولیه با داده‌های تیم
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCoach(initialData.coach || "");
      setCity(initialData.city || "");
      setCountry(initialData.country || "");
      setLogo(initialData.logo || "");
    }
  }, [initialData]);

  if (!show) return null;

  const handleSave = async () => {
    setLoading(true);
    try {
      const teamRef = doc(db, "Teams", teamId);

      await updateDoc(teamRef, {
        name,
        coach,
        city,
        country,
        logo,
      });

      Swal.fire({
        title: "ویرایش شد!",
        text: "اطلاعات تیم بروزرسانی شد.",
        icon: "success",
        confirmButtonText: "باشه",
        showClass: { popup: "animate__animated animate__zoomIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });

      onClose();
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "خطا!",
        text: "ویرایش انجام نشد.",
        icon: "error",
        showClass: { popup: "animate__animated animate__shakeX" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2>ویرایش تیم</h2>

        <form className="edit-form" onSubmit={(e) => e.preventDefault()}>
          <label>نام تیم:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>مربی:</label>
          <input type="text" value={coach} onChange={(e) => setCoach(e.target.value)} />

          <label>شهر:</label>
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />

          <label>کشور:</label>
          <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />

          <label>لوگو:</label>
          <input type="text" value={logo} onChange={(e) => setLogo(e.target.value)} />

          <div className="modal-actions">
            <button type="button" className="modal-save" onClick={handleSave} disabled={loading}>
              {loading ? "در حال ذخیره..." : "ذخیره"}
            </button>

            <button type="button" className="modal-cancel" onClick={onClose}>
              بستن
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTeam;
