// EditModal.js
import React from "react";


const EditPlayer = ({
  show,
  onClose,
  name,
  team,
  number,
  image,
  setName,
  setTeam,
  setNumber,
  setImage,
  onSave,
}) => {
  if (!show) return null;

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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>تیم:</label>
          <input
            type="text"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />

          <label>شماره:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <label>عکس:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
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

export default EditPlayer;
