// SearchContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useDebounce } from "../../Hooks/useDebounce";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../FireBase/config";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // 🔥 بارگذاری Players از Firestore
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Players"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPlayers(data);
      } catch (e) {
        console.error("Failed to load players", e);
      }
    };

    if (searchActive && players.length === 0) {
      fetchPlayers();
    }
  }, [searchActive, players.length]);

  // 🔥 بارگذاری Teams از Firestore
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const snapshot = await getDocs(collection(db, "Teams"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeams(data);
      } catch (e) {
        console.error("Failed to load teams", e);
      }
    };

    if (searchActive && teams.length === 0) {
      fetchTeams();
    }
  }, [searchActive, teams.length]);

  // 🔎 فیلتر کردن بازیکنان و تیم‌ها (بدون تغییر)
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredPlayers([]);
      setFilteredTeams([]);
    } else {
      const term = debouncedSearchTerm.toLowerCase();

      const filteredP = players.filter((player) =>
        player.name?.toLowerCase().includes(term)
      );

      const filteredT = teams.filter((team) =>
        team.name?.toLowerCase().includes(term)
      );

      setFilteredPlayers(filteredP);
      setFilteredTeams(filteredT);
    }
  }, [debouncedSearchTerm, players, teams]);

  const openSearch = () => setSearchActive(true);

  const closeSearch = () => {
    setSearchActive(false);
    setSearchTerm("");
    setFilteredPlayers([]);
    setFilteredTeams([]);
  };

  return (
    <SearchContext.Provider
      value={{
        searchActive,
        openSearch,
        closeSearch,
        searchTerm,
        setSearchTerm,
        filteredPlayers,
        filteredTeams,
        teams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
