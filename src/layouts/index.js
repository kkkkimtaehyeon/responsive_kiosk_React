import React from "react";
import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-layout">
        <div className="main-inner">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
