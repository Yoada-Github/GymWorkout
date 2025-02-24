import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaPlus, FaBuilding, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { Col, ListGroup, Button } from "react-bootstrap";
import profilePic from "../assets/photo_2025-02-07_14-37-38.jpg";
import { CgPerformance } from "react-icons/cg";
import { MdOutlineWork } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


const NavBars = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <Button  className="position-fixed top-0 start-0 my-2 mx-4 bg-secondary "  onClick={toggleNavbar} style={{ zIndex: "1050", width:"50px" }}>
        {isOpen ? <FaTimes className="text-white fs-3"/> : <FaBars className="text-white mb-1" />}
      </Button>

      {/* Sidebar Navigation */}
      <Col md={3} lg={2}
        className={`bg-secondary text-white min-vh-100 p-3 position-fixed ${isOpen ? "d-block" : "d-none"}`}
        style={{ zIndex: "1040", width: "250px", transition: "0.3s" }}
      >

        <div className="d-flex justify-content-center my-1">
          <img src={profilePic} alt="Profile" className="img-fluid rounded-circle" style={{ width: "100px", height: "100px" }}/>
        </div>

        <h3 className="fw-bold text-center mt-2">Dashboard</h3>

        {/* Navigation Links */}
        <ListGroup variant="flush">
          <ListGroup.Item className="bg-secondary border-0">
            <Link to="/dashboard" className="text-white text-decoration-none d-flex align-items-center">
              <FaHome className="me-2" /> Home
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="bg-secondary border-0">
            <Link to="/profile" className="text-white text-decoration-none d-flex align-items-center">
              <CgProfile  className="me-2" />
              Profile
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="bg-secondary border-0">
            <Link to="/create" className="text-white text-decoration-none d-flex align-items-center">
              <FaPlus className="me-2" /> Create
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="bg-secondary border-0">
            <Link to="/gyms" className="text-white text-decoration-none d-flex align-items-center">
              <FaBuilding className="me-2" /> Exercise List
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="bg-secondary border-0">
            <Link to="/workplan" className="text-white text-decoration-none d-flex align-items-center">
              <MdOutlineWork className="me-2" /> WorkoutPlan
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="bg-secondary border-0">
            <Link to="/performance" className="text-white text-decoration-none d-flex align-items-center">
              <CgPerformance className="me-2" /> Performance
            </Link>
          </ListGroup.Item>
          <ListGroup.Item className="bg-secondary border-0 mt-3">
            <Link to="/" className="text-danger text-decoration-none d-flex align-items-center">
              <FaSignOutAlt className="me-2" /> Logout
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </>
  );
};

export default NavBars;