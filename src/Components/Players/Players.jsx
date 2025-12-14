import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../FireBase/config";

import Player from "./Player";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";

const Players = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "Players"),
      (snapshot) => {
        const playersData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(playersData);
        setLoading(false);
      },
      (error) => {
        console.error(error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  if (loading) return <Loading />;
  if (!players.length) return <NotFound message="No players available" />;

  return (
    <div className="players-container">
      {players.map((player) => (
        <Player
          key={player.id}
          id={player.id}
          name={player.name}
          team={player.team}
          number={player.number}
          image={player.image}
        />
      ))}
    </div>
  );
};

export default Players;
