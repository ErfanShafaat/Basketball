// Player.js
import React from "react";
import { Link } from "react-router-dom";
import "./Players.css";

const Player = ({ name, team, number, image, id }) => {
  return (
    <div className="player-card" dir="rtl">
      <img src={image} alt={name} className="player-img" />
      <div className="player-info">
        <div className="player-name">{name}</div>
        <div className="player-team">{team}</div>
    
        <a href={`/players/${id}`} className="player-btn">اطلاعات بیشتر  </a>
      </div>
    </div>
  );
};


export default Player;
