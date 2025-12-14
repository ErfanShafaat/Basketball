import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Swal from "sweetalert2";
import "animate.css";
import Cookies from "js-cookie";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../FireBase/config";

import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import EditPlayer from "../../Admin/EditModal";

import { putData, deleteData } from "../../Hooks/getData";

import "./PlayerDetails.css";

const PlayerDetails = () => {
  const { id } = useParams();

  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const [editName, setEditName] = useState("");
  const [editTeam, setEditTeam] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [editImage, setEditImage] = useState("");

  const [fadeOut, setFadeOut] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // نقش کاربر از کوکی
  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        if (user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("خطا در خواندن کوکی:", err);
      }
    }
  }, []);

  // 🔥 گرفتن بازیکن از Firestore
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const docRef = doc(db, "Players", id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError("Player not found!");
          return;
        }

        setPlayer({
          id: docSnap.id,
          ...docSnap.data(),
        });
      } catch (err) {
        console.error(err);
        setError("Player not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayer();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <NotFound message={error} />;
  if (!player) return <NotFound message="Player not found!" />;

  const openModal = () => {
    setEditName(player.name);
    setEditTeam(player.team);
    setEditNumber(player.number);
    setEditImage(player.image);
    setShowModal(true);
  };

  // ✏️ ویرایش (Firestore)
  const handleSave = async () => {
    const updatedPlayer = {
      name: editName,
      team: editTeam,
      number: Number(editNumber),
      image: editImage,
    };

    try {
      await putData("Players", player.id, updatedPlayer);

      setPlayer({ ...player, ...updatedPlayer });
      setShowModal(false);

      Swal.fire({
        title: "ویرایش شد!",
        text: "اطلاعات بازیکن بروزرسانی شد.",
        icon: "success",
        confirmButtonText: "باشه",
        showClass: { popup: "animate__animated animate__zoomIn" },
        hideClass: { popup: "animate__animated animate__fadeOut" },
      });
    } catch (error) {
      Swal.fire({
        title: "خطا!",
        text: "ویرایش انجام نشد",
        icon: "error",
        showClass: { popup: "animate__animated animate__shakeX" },
      });
    }
  };

  // 🗑 حذف (Firestore)
  const handleDelete = () => {
    Swal.fire({
      title: "حذف بازیکن",
      text: "مطمئنی میخوای این بازیکن رو حذف کنی؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله، حذف کن",
      cancelButtonText: "لغو",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setFadeOut(true);

          setTimeout(async () => {
            await deleteData("Players", player.id);

            Swal.fire({
              title: "حذف شد!",
              text: "بازیکن با موفقیت حذف شد.",
              icon: "success",
              confirmButtonText: "باشه",
            });

            setTimeout(() => {
              window.location.href = "/";
            }, 600);
          }, 400);
        } catch (error) {
          Swal.fire({
            title: "خطا!",
            text: "مشکلی در حذف رخ داد.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <>
      <div className={`player-details-container ${fadeOut ? "fade-out" : ""}`}>
        <div className="player-details-card">
          <img src={player.image} alt={player.name} className="details-img" />

          <div className="details-info">
            <h1 className="details-name">{player.name}</h1>
            <p className="details-team">تیم: {player.team}</p>
            <p className="details-number">شماره: #{player.number}</p>

            {isAdmin && (
              <div className="details-actions">
                <button className="edit-btn" onClick={openModal}>
                  ✏️ ویرایش
                </button>
                <button className="delete-btn" onClick={handleDelete}>
                  🗑 حذف
                </button>
              </div>
            )}

            <Link to="/" className="back-btn">
              بازگشت
            </Link>
          </div>
        </div>
      </div>

      <EditPlayer
        show={showModal} 
        onClose={() => setShowModal(false)}
        playerId={player.id} 
        initialData={{
          name: editName,
          team: editTeam,
          number: editNumber,
          image: editImage,
        }}
        setName={setEditName}
        setTeam={setEditTeam}
        setNumber={setEditNumber}
        setImage={setEditImage}
        onSave={handleSave} 
      />
    </>
  );
};

export default PlayerDetails;
