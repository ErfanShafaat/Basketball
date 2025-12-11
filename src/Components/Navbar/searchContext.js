// SearchContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { useDebounce } from "../../Hooks/useDebounce";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);

  const [teams, setTeams] = useState([]);
  const [filteredTeams, setFilteredTeams] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // بارگذاری بازیکنان
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("http://localhost:3000/players");
        const data = await response.json();
        setPlayers(data);
      } catch (e) {
        console.error("Failed to load players");
      }
    };

    if (searchActive && players.length === 0) {
      fetchPlayers();
    }
  }, [searchActive, players.length]);

  // بارگذاری تیم‌ها
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch("http://localhost:3000/teams");
        const data = await response.json();
        setTeams(data);
      } catch (e) {
        console.error("Failed to load teams");
      }
    };

    if (searchActive && teams.length === 0) {
      fetchTeams();
    }
  }, [searchActive, teams.length]);

  // فیلتر کردن بازیکنان و تیم‌ها
  useEffect(() => {
    if (debouncedSearchTerm.trim() === "") {
      setFilteredPlayers([]);
      setFilteredTeams([]);
    } else {
      const filteredP = players.filter((player) =>
        player.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      const filteredT = teams.filter((team) =>
        team.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
        teams,
        filteredTeams,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
