// Team.js
import React from "react";
import { Link } from "react-router-dom";
import "./Teams.css";

const Team = ({ name, coach, players, logo, city, country, id }) => {
  return (
    <div className="team-card" dir="rtl">
      <img src={logo} alt={name} className="team-logo" />
      <div className="team-info">
        <div className="team-name">{name}</div>
        <div className="team-coach">مربی: {coach}</div>
        <div className="team-location">{city}, {country}</div>
        <a href={`/teams/${id}`} className="team-btn">اطلاعات بیشتر</a>
      </div>
    </div>
  );
};

export default Team;
