import { useState } from "react";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUtensils } from "react-icons/fa6";
import "../styles/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    console.log("login");
    e.preventDefault();
    setErrorMessage("");

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post("http://localhost:3000/api/auth/login", data);
      navigate("/dashboard");
    } catch (err) {
      if (err?.response && err.response.status === 401) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage(
          err?.response?.data?.message || err?.message || "Login failed",
        );
      }
      console.log("Failed to post", err?.message || err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <FaUtensils />
        </div>
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your CraveCanteen account</p>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="auth-input-group">
            <label htmlFor="email">
              <MdOutlineEmail className="form-icon" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="loginPassword">
              <RiLockPasswordLine className="form-icon" /> Password
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Log In
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer">
          <p>
            Don't have an account?{" "}
            <a href="/signup">Sign Up</a>
          </p>
          <a className="auth-home-link" href="/">
            <IoMdHome className="home-icon" /> Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
