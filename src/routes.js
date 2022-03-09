import React from "react";
import { Routes, Route } from "react-router-dom";
import Cards from "./components/cards/cards.js";
import Home from "./pages/home.js";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/create" element={<Cards />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
