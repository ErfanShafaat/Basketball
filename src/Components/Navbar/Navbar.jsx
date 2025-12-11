// Navbar.js
import React, { useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import SearchResults from "./SearchResults";
import { useSearch } from "./searchContext";
import LoginBox from "../Auth/NavbarDemo";
import Footer from "./Footer";

function Navbar() {
  const inputRef = useRef(null);
  const { searchActive, openSearch, closeSearch, searchTerm, setSearchTerm } =
    useSearch();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarRight}>
          <NavLink to="/" className={styles.logo}>
            🏀 بسکتبال
          </NavLink>

          <ul className={styles.navItems}>
            <li className={styles.navItem}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                صفحه اصلی
              </NavLink>
            </li>{" "}
            <li className={styles.navItem}>
              <NavLink
                to="/Players"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
               بازیکن ها
              </NavLink>
            </li>
            <li className={styles.navItem}>
              <NavLink
                to="/teams"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                تیم‌ها
              </NavLink>
            </li>
           
            <li className={styles.navItem}>
              <NavLink
                to="/add-player"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                افزودن بازیکن
              </NavLink>
            </li>
              <li className={styles.navItem}>
              <NavLink
                to="/add-team"
                className={({ isActive }) =>
                  isActive ? styles.active : undefined
                }
              >
                افزودن تیم
              </NavLink>
            </li>
          </ul>
        </div>

        <form
          className={styles.searchForm}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="جستجو..."
            ref={inputRef}
            value={searchTerm}
            onFocus={openSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <LoginBox/>
      </nav>

      {searchActive && <SearchResults onClose={closeSearch} />}

      <Outlet />
   
    </>
  );
}

export default Navbar;
