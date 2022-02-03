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
import Login from "../pages/login/Login";

const AlreadyInAuth = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
  const auth = _.get(userInfo, "isAuthenticated");
  let location = useLocation();
  if (auth) {
    return <Navigate to="/assigner" state={{ from: location }} replace />;
  }
  return children;
};
const RequireAuth = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
  const auth = _.get(userInfo, "isAuthenticated");
  let location = useLocation();
  if (!auth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <AlreadyInAuth>
              <Login />
            </AlreadyInAuth>
          }
        />
        <Route
          path="/assigner"
          element={
            <RequireAuth>
              <Assigner />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to={"/login"} />} />
        <Route path="*" element={<div>No page</div>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
