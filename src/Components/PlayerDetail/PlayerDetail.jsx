import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
import Cookies from "js-cookie";

import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import EditModal from "../../Admin/EditModal";

import { putData, deleteData } from "../../Hooks/getData";

import "./PlayerDetails.css";
import EditPlayer from "../../Admin/EditModal";

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
  const [isAdmin, setIsAdmin] = useState(false); // نقش کاربر

  // گرفتن نقش کاربر از کوکی
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

  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/players/${id}`);
        setPlayer(response.data);
      } catch (err) {
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

  const handleSave = async () => {
    const updatedPlayer = {
      ...player,
      name: editName,
      team: editTeam,
      number: Number(editNumber),
      image: editImage,
    };

    try {
      await putData("players", player.id, updatedPlayer);
      setPlayer(updatedPlayer);
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
      showClass: { popup: "animate__animated animate__fadeInDown" },
      hideClass: { popup: "animate__animated animate__fadeOutUp" },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setFadeOut(true);

          setTimeout(async () => {
            await deleteData("players", player.id);

            Swal.fire({
              title: "حذف شد!",
              text: "بازیکن با موفقیت حذف شد.",
              icon: "success",
              confirmButtonText: "باشه",
              showClass: { popup: "animate__animated animate__zoomIn" },
              hideClass: { popup: "animate__animated animate__fadeOut" },
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
            showClass: { popup: "animate__animated animate__shakeX" },
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

            <div className="details-actions">
              {isAdmin && (
                <>
                  <button className="edit-btn" onClick={openModal}>
                    <i className="fas fa-edit"></i> ویرایش
                  </button>

                  <button className="delete-btn" onClick={handleDelete}>
                    <i className="fas fa-trash"></i> حذف
                  </button>
                </>
              )}
            </div>

            <Link to="/" className="back-btn">
              بازگشت
            </Link>
          </div>
        </div>
      </div>

      <EditPlayer
        show={showModal}
        onClose={() => setShowModal(false)}
        name={editName}
        team={editTeam}
        number={editNumber}
        image={editImage}
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
