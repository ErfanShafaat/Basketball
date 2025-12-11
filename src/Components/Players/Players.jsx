import React, { useEffect, useState } from "react";
import { getData } from "../../Hooks/getData";
import Player from "./Player";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const data = await getData("players");
        setPlayers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <Loading />;
  if (players.length === 0) return <NotFound message="No players available" />;

  return (
    <div className="players-container">
      {players.map((player) => (
        <Player
          key={player.id}
          name={player.name}
          team={player.team}
          number={player.number}
          image={player.image}
          id={player.id}
        />
      ))}
    </div>
  );
};

export default Players;
