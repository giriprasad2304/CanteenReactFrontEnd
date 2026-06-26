import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaUtensils } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/Auth.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const data = {
      UserName: e.target.userName.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    try {
      await axios.post("http://localhost:3000/api/auth/register", data);
      navigate("/dashboard");
    } catch (err) {
      if (err?.response && err.response.status === 409) {
        setErrorMessage(err.response.data.message);
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
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join CraveCanteen and start ordering</p>

        {errorMessage && <div className="auth-error">{errorMessage}</div>}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="auth-input-group">
            <label htmlFor="userName">
              <IoPersonOutline className="form-icon" /> User Name
            </label>
            <input
              type="text"
              id="userName"
              name="userName"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="email">
              <MdOutlineEmail className="form-icon" /> Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter a valid email"
              required
            />
          </div>

          <div className="auth-input-group">
            <label htmlFor="password">
              <RiLockPasswordLine className="form-icon" /> Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              required
            />
          </div>

          <button type="submit" className="auth-submit-btn">
            Sign Up
          </button>
        </form>

        <div className="auth-divider">or</div>

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <a href="/login">Log In</a>
          </p>
          <a className="auth-home-link" href="/">
            <IoMdHome className="home-icon" /> Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
