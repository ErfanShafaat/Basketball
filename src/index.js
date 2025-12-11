import React, { Profiler } from "react";
import ReactDOM from "react-dom/client";
import './App.css'
import "animate.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Players from "./Components/Players/Players";
import Navbar from "./Components/Navbar/Navbar";
import Player from "./Components/Players/Player";
import PlayerDetail from "./Components/PlayerDetail/PlayerDetail";
import NotFound from "./Components/NotFound/NotFound";
import AddPlayer from "./Admin/AddPlayer";
import { SearchProvider } from "./Components/Navbar/searchContext";
import Home from "./Components/Home/Home";
import Teams from "./Components/Teams/Teams";
import TeamDetails from "./Components/Teams/TeamDetail";
import AddTeam from "./Admin/AddTeam";
import Login from "./Components/Auth/Login";
import SignUp from "./Components/Auth/SignUp";
import Forgot from "./Components/Auth/Forgot";
import UserProfile from "./Components/Auth/Profile";
import Footer from "./Components/Navbar/Footer";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SearchProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Players" element={<Players />} />
          <Route path="teams" element={<Teams />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
          <Route path="add-player" element={<AddPlayer />} />
          <Route path="add-team" element={<AddTeam />} />
          <Route path="Login" element={<Login />} />
          <Route path="SignUp" element={<SignUp />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </SearchProvider>
  </React.StrictMode>
);
