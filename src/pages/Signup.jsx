import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import img4 from "../assets/img4.jpg";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = (e) => {
    e.preventDefault();

    if (! username|| !email || !password || !confirmPassword) {
      enqueueSnackbar("All fields are required", { variant: "warning" });
      return;
    }
    
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", { variant: "error" });
      return;
    }

    axios
      .post("https://gymworkoutback-1.onrender.com/user/signup", {username, email, password })
      .then((response) => {
        enqueueSnackbar("Signup successful! Please login.", { variant: "success" });
        navigate("/"); // Redirect to login page
      })
      .catch((error) => {
        enqueueSnackbar("Signup failed: Email already exists", { variant: "error" });
        console.error(error);
      });
  };

  return (
    <div className="rounded w-100 container d-flex align-items-center justify-content-center vh-100" style={{backgroundImage: `url(${img4})`, backgroundPosition:"center", backgroundSize:"cover"}}>
      <div className="bg-light p-5 rounded shadow" style={{ maxWidth: "400px", width: "100%", opacity:"0.8" }}>
        <h2 className="mb-4 fs-1 fw-bold text-center">Sign Up</h2>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label className="form-label">Username:</label>
            <input 
            type="text" 
            className="form-control" 
            onChange={(e) => setUsername(e.target.value)} 
            placeholder="Enter your username" />
          </div>
          <div className="mb-3">
            <label className="form-label">Email address:</label>
            <input 
            type="email" 
            className="form-control" 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email" />
          </div>
          <div className="mb-3">
            <label className="form-label">Password:</label>
            <input 
            type="password" 
            className="form-control" 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Enter your password" />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password:</label>
            <input 
            type="password" 
            className="form-control" 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm password" />
          </div>
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
        <div className="mt-3 text-center">
          <p>Already have an account? <Link to="/">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
