import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import img5 from "../assets/img5.jpg"

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      enqueueSnackbar("Please fill in all fields", { variant: "warning" });
      return;
    }

    axios
      .post("http://localhost:5003/user/login", { username, email, password })
      .then((response) => {
        const { username, email, token, userId } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("user", email);
        localStorage.setItem("username", username);
        localStorage.setItem("userId", userId);

        enqueueSnackbar("Login successful", { variant: "success" });
        navigate("/dashboard"); // Redirect to dashboard
      })
      .catch((error) => {
        enqueueSnackbar("Login failed: Invalid credentials", { variant: "error" });
        console.error(error);
      });
  };


  return (
    <div className="container-fluid max-vh-100 d-flex align-items-center justify-content-center" style={{backgroundImage: `url(${img5})`, backgroundPosition:"center", backgroundSize:"cover"}}>
    <div className="w-100 min-vh-100">
    {/* Header */}
     <div className="d-flex justify-content-between align-items-center bg-light p-4 mb-5 " >
      <h1 className=" fw-bold fs-2 mb-0" style={{opacity:"0.9"}}>My WORKOUT GYM</h1>
      <div>
        <Link to="/" className="text-decoration-none me-3 ">Login</Link>
        <Link to="/Signup" className="text-decoration-none ">Signup</Link>
      </div>
     </div>
    {/* Signup Form */}
   <div className="bg-light rounded shadow  px-5 pt-3 mx-auto" style={{ maxWidth: "400px", height:"400px",opacity:"0.9" }}>
    <h2 className="my-2 fw-bold">Login</h2>
    <form>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Username:
        </label>
        <input 
        type="text" 
        className="form-control" 
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username" />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address:
        </label>
        <input 
        type="email" 
        className="form-control" 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email" />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password:
        </label>
        <input 
        type="password" 
        className="form-control"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password" />
      </div>
      <button onClick={handleLogin} type="submit" className="btn btn-primary w-25">
        Login
      </button>
    </form>
  </div>
</div>
</div>  );
}

export default Login;
