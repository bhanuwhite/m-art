/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import _ from "lodash";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logo from "../../images/logo.png";
import { signIn } from "../../api/helpers";
import "./login.css";

const checkIsArtist = (data, cb) => {
  if (_.get(data, "role") === "Artist") {
    return cb(true);
  } else {
    return cb(false);
  }
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});

  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const toggleEye = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setError({});
    setLoading(true);
    signIn(credentials)
      .then((res) => {
        return res.data;
      })
      .then((result) => {
        setLoading(false);
        localStorage.setItem("loginUserInfo", JSON.stringify(result));
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        setError(_.get(err.response, "data"));
      });
  };

  const { email, password } = credentials;

  return (
    <>
      <div className="login-wrapper">
        <div className="login-block">
          <div className="login-form">
            <img src={logo} alt="ArtenRoll-Logo" className="art-enroll-logo" />
            <form onSubmit={handleLogin}>
              <div className="form-input-material">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="off"
                  required
                  className="form-control-material"
                />
                <label htmlFor="email">
                  Email<sup>*</sup>
                </label>
              </div>
              <div className="form-input-material">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  placeholder=" "
                  autoComplete="off"
                  required
                  className="form-control-material"
                />
                <label htmlFor="password">
                  Password<sup>*</sup>
                </label>
                {showPassword ? (
                  <AiFillEye className="psd-img" onClick={toggleEye} />
                ) : (
                  <AiFillEyeInvisible className="psd-img" onClick={toggleEye} />
                )}
              </div>
              {/* <p className="forgot-psd">
                Forgot Password? <a href="">Click here</a>
              </p> */}
              {_.size(error) ? (
                <div>
                  <p className="text-danger">* {_.get(error, "message", "")}</p>
                </div>
              ) : null}
              <button className="login-btn">
                {loading ? (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
