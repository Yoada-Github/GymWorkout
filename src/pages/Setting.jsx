import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBars from "./NavBars";
import image from "../assets/photo_2025-02-07_14-37-38.jpg";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // Fetch user profile data
  useEffect(() => {
    if (!userId) return;

    axios.get(`https://gymworkoutback-1.onrender.com/user/profile/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.error("Error fetching profile:", error));
  }, [userId]);

  // Handle Password Update
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://gymworkoutback-1.onrender.com/user/update/${userId}`, { password });
      setMessage({ type: "success", text: "Password updated successfully!" });
      setPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage({ type: "danger", text: "Failed to update password." });
    }
  };

  // Handle Account Deletion
  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      axios.delete(`https://gymworkoutback-1.onrender.com/user/delete/${userId}`)
        .then(() => {
          alert("Account deleted successfully");
          navigate("/");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Failed to delete account");
        });
    }
  };

  return (
    <Container fluid className="bg-light min-vh-100">
      <Row>
        <NavBars />
        <Col md={8} className="mx-auto pt-5 mt-4">
          {/* Profile Header */}
          <Card className="shadow-lg bg-white p-4 mb-4 rounded-3 border-0">
            <Row className="align-items-center">
            <h2 className="fw-bold text-primary text-center">Profile Settings</h2>
              <Col md={2} >
                <img src={image} width={100} height={100} className="rounded-circle border shadow" alt="Profile" />
              </Col>
              <Col md={8}>
                <h4 className="mt-2 text-dark">{user.username}</h4>
                <p className="text-muted">{user.email}</p>
              </Col>
            </Row>
          </Card>

          {/* Account Settings */}
          <Card className="shadow-lg p-4 bg-white rounded-3 border-0">
            <h4 className="fw-bold text-secondary">Account Settings</h4>
            
            {message.text && <Alert variant={message.type} className="mt-3">{message.text}</Alert>}

            {/* Password Update Form */}
            <Form onSubmit={handleUpdatePassword} className="mt-3">
              <Form.Group className="mb-3 w-100">
                <Form.Label className="fw-bold">New Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Enter new password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </Form.Group>

              <Button type="submit" className="w-100 btn btn-primary fw-bold">
                Update Password
              </Button>
            </Form>

            {/* Delete Account */}
            <Button onClick={handleDeleteAccount} className="w-100 btn btn-danger fw-bold mt-3">
              Delete Account
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Settings;
