// SearchResults.js
import React from "react";
import { Link } from "react-router-dom";
import { useSearch } from "./searchContext";
import "./SearchResults.css";

function SearchResults({ onClose }) {
  const { filteredPlayers, filteredTeams, searchTerm, setSearchTerm } = useSearch();

  const handleOverlayClick = () => {
    if (onClose) onClose();
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); 
  };

  return (
    <div className="sr-modal-overlay" onClick={handleOverlayClick}>
      <div className="sr-modal-box" onClick={handleModalClick}>
        <h2 className="sr-modal-title">نتایج جستجو</h2>

        <input
          type="text"
          className="sr-search-input"
          placeholder="نام بازیکن یا تیم را جستجو کنید..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <h3 className="sr-section-title">بازیکنان</h3>
        <div className="sr-players-grid">
          {filteredPlayers.length > 0 ? (
            filteredPlayers.map((player) => (
              <div key={player.id} className="sr-player-card">
                <img src={player.image} alt={player.name} className="sr-player-img" />
                <h2 className="sr-player-name">{player.name}</h2>
                <p className="sr-player-team">{player.team}</p>
                <span className="sr-player-number">#{player.number}</span>
                <Link to={`/players/${player.id}`} className="sr-player-btn">
                  مشاهده پروفایل
                </Link>
              </div>
            ))
          ) : (
            <p className="sr-no-results">هیچ بازیکنی یافت نشد!</p>
          )}
        </div>

        <h3 className="sr-section-title">تیم‌ها</h3>
        <div className="sr-players-grid">
          {filteredTeams && filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <div key={team.id} className="sr-player-card">
                <img src={team.logo} alt={team.name} className="sr-player-img" />
                <h2 className="sr-player-name">{team.name}</h2>
                <p className="sr-player-team">مربی: {team.coach}</p>
                <p className="sr-player-number">
                  مکان: {team.city}, {team.country}
                </p>
                <Link to={`/teams/${team.id}`} className="sr-player-btn">
                  مشاهده تیم
                </Link>
              </div>
            ))
          ) : (
            <p className="sr-no-results">هیچ تیمی یافت نشد!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
