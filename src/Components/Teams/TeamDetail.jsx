import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
import Cookies from "js-cookie";

import NotFound from "../NotFound/NotFound";
import Loading from "../Loading/Loading";
import EditTeam from "../../Admin/EditTeams";

import { putData, deleteData } from "../../Hooks/getData";

import "./TeamDetails.css";

const TeamDetails = () => {
  const { id } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const [editName, setEditName] = useState("");
  const [editCoach, setEditCoach] = useState("");
  const [editCity, setEditCity] = useState("");
  const [editCountry, setEditCountry] = useState("");
  const [editLogo, setEditLogo] = useState("");

  const [isAdmin, setIsAdmin] = useState(false); // نقش کاربر

  // بررسی نقش کاربر
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
    const fetchTeam = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/teams/${id}`);
        setTeam(response.data);
      } catch (err) {
        setError("Team not found!");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <NotFound message={error} />;
  if (!team) return <NotFound message="Team not found!" />;

  const openModal = () => {
    setEditName(team.name);
    setEditCoach(team.coach);
    setEditCity(team.city);
    setEditCountry(team.country);
    setEditLogo(team.logo);
    setShowModal(true);
  };

  const handleSave = async () => {
    const updatedTeam = {
      ...team,
      name: editName,
      coach: editCoach,
      city: editCity,
      country: editCountry,
      logo: editLogo,
    };

    try {
      await putData("teams", team.id, updatedTeam);
      setTeam(updatedTeam);
      setShowModal(false);

      Swal.fire({
        title: "ویرایش شد!",
        text: "اطلاعات تیم بروزرسانی شد.",
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
      title: "حذف تیم",
      text: "مطمئنی میخوای این تیم رو حذف کنی؟",
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
            await deleteData("teams", team.id);

            Swal.fire({
              title: "حذف شد!",
              text: "تیم با موفقیت حذف شد.",
              icon: "success",
              confirmButtonText: "باشه",
              showClass: { popup: "animate__animated animate__zoomIn" },
              hideClass: { popup: "animate__animated animate__fadeOut" },
            });

            setTimeout(() => {
              window.location.href = "/teams";
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
      <div className={`team-details-container ${fadeOut ? "fade-out" : ""}`}>
        <div className="team-details-card">
          <img src={team.logo} alt={team.name} className="details-logo" />

          <div className="details-info">
            <h1 className="details-name">{team.name}</h1>
            <p className="details-coach">مربی: {team.coach}</p>
            <p className="details-location">
              مکان: {team.city}, {team.country}
            </p>

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

            <Link to="/teams" className="back-btn">
              بازگشت
            </Link>
          </div>
        </div>
      </div>

      <EditTeam
        show={showModal}
        onClose={() => setShowModal(false)}
        name={editName}
        coach={editCoach}
        city={editCity}
        country={editCountry}
        logo={editLogo}
        setName={setEditName}
        setCoach={setEditCoach}
        setCity={setEditCity}
        setCountry={setEditCountry}
        setLogo={setEditLogo}
        onSave={handleSave}
      />
    </>
  );
};

export default TeamDetails;
