import React, { useEffect, useState, useCallback } from "react";
import { getData } from "../../Hooks/getData";
import Team from "./Team";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import { throttle } from "lodash";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  // تابع fetch را با throttle محدود می‌کنیم
  const fetchTeams = useCallback(
    throttle(async () => {
      setLoading(true);
      try {
        const data = await getData("teams");
        setTeams(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 2000), // حداکثر یک بار در 2 ثانیه اجرا شود
    []
  );

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (loading) return <Loading />;
  if (teams.length === 0) return <NotFound message="No teams available" />;

  return (
    <div className="teams-container">
      {teams.map((team) => (
        <Team
          key={team.id}
          name={team.name}
          coach={team.coach}
          players={team.players}
          logo={team.logo}
          city={team.city}
          country={team.country}
          id={team.id}
        />
      ))}
    </div>
  );
};

export default Teams;
