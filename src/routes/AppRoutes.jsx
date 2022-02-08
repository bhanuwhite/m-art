import React from "react";
import _ from "lodash";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Assigner from "../pages/assigner/Assigner";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/assigner" element={<Assigner />} /> */}
        <Route path="/" element={<Assigner />} />
        <Route path="*" element={<div>No page</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
