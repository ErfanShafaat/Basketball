import React, { useEffect, useState, useCallback } from "react";
import { getData } from "../../Hooks/getData";
import Team from "./Team";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import { throttle } from "lodash";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const fetchTeams = useCallback(
    throttle(async () => {
      setLoading(true);
      try {
        const data = await getData("Teams"); 
        setTeams(data);
      } catch (err) {
        console.error("Failed to load teams:", err);
      } finally {
        setLoading(false);
      }
    }, 2000),
    []
  );

  useEffect(() => {
    fetchTeams();

    // پاکسازی throttle موقع unmount
    return () => {
      fetchTeams.cancel && fetchTeams.cancel();
    };
  }, [fetchTeams]);

  if (loading) return <Loading />;
  if (!teams.length) return <NotFound message="No teams available" />;

  return (
    <div className="teams-container">
      {teams.map((team) => (
        <Team
          key={team.id}
          id={team.id}
          name={team.name}
          coach={team.coach}
          players={team.players}
          logo={team.logo}
          city={team.city}
          country={team.country}
        />
      ))}
    </div>
  );
};

export default Teams;
