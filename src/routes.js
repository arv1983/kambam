import React from "react";
import { Routes, Route } from "react-router-dom";
import Cards from "./components/cards/cards.js";
import Teste from "./pages/teste.js";

export default function MainRoutes() {
  return (
    <Routes>
      <Route path="/create" element={<Cards />} />
      <Route path="/" element={<Teste />} />
    </Routes>
  );
}
