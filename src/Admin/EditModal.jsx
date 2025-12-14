// EditPlayer.js
import React from "react";

const EditPlayer = ({
  show,
  onClose,
  playerId,
  initialData,
  onSave, // این تابع در والد Firestore را آپدیت می‌کند
  setName,
  setTeam,
  setNumber,
  setImage,
}) => {
  if (!show || !initialData) return null;

  const handleSave = () => {
    if (!playerId) {
      console.error("playerId is undefined!");
      return;
    }
    onSave(playerId); // تابع save از والد فراخوانی می‌شود
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()} 
      >
        <h2>ویرایش بازیکن</h2>

        <form className="edit-form">
          <label>نام:</label>
          <input
            type="text"
            value={initialData.name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>تیم:</label>
          <input
            type="text"
            value={initialData.team}
            onChange={(e) => setTeam(e.target.value)}
          />

          <label>شماره:</label>
          <input
            type="number"
            value={initialData.number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <label>عکس:</label>
          <input
            type="text"
            value={initialData.image}
            onChange={(e) => setImage(e.target.value)}
          />

          <div className="modal-actions">
            <button type="button" className="modal-save" onClick={handleSave}>
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

export default EditPlayer;
