import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Routes>
          <Route path="/" element={} />
          <Route path="about" element={} />
        </Routes>
      </div>
      <div className="main"></div>
      <div className="footer"></div>
    </div>
  );
}

export default App;
