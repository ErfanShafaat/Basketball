// EditTeam.js
import React from "react";

const EditTeam = ({
  show,
  onClose,
  name,
  coach,
  city,
  country,
  logo,
  setName,
  setCoach,
  setCity,
  setCountry,
  setLogo,
  onSave,
}) => {
  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>ویرایش تیم</h2>

        <form className="edit-form">
          <label>نام تیم:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>مربی:</label>
          <input
            type="text"
            value={coach}
            onChange={(e) => setCoach(e.target.value)}
          />

          <label>شهر:</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <label>کشور:</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />

          <label>لوگو:</label>
          <input
            type="text"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="modal-save" onClick={onSave}>
              ذخیره
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
