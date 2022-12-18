import { useState } from "react";
import Notebook from "./views/notebook";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./views/dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/notebook" element={<Notebook />} />
    </Routes>
  );
}

export default App;
