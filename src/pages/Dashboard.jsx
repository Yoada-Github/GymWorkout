import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import image from "../assets/photo_2025-02-07_14-37-38.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBars from "./NavBars";

const Dashboard = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const bmiValue = (weight / ((height / 100) * (height / 100))).toFixed(2);
      setBmi(bmiValue);
    } else {
      alert("Please enter valid weight and height.");
    }
  };

  return (
    <Container fluid className="max-vh-100 bg-secondary "  style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "55vh", borderRadius:"10px" }}>
    <Row className="flex-nowrap">
      <NavBars />
  
      {/* Main Content Section */}
      <Col >
        <div className="d-flex flex-column justify-content-center align-items-center text-white text-center" 
          style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: "55vh", borderRadius:"10px" }}>
          <div className="bg-dark bg-opacity-50 p-4 rounded mb-4">
            <h1 className="fw-bold">Push Your Limits, Achieve Your Goals!</h1>
            <p className="lead">Track your workouts, stay consistent, and transform your fitness journey with us.</p>
          </div>
        </div>
  
        {/* Cards Section */}
        <Container className="mt-4 pb-3">
            <Row className="g-4">
            <Col md={4}>
                <Card className=" text-dark bg-light" style={{ border: 'none', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <Card.Body className="p-4">
                    <h5 className="fw-bold fs-2 text-center mb-1" style={{ color: '#2c3e50' }}>Fitness Status</h5>
                    <Form>
                      <Form.Group className="mb-1">
                        <Form.Label className="fw-bold" style={{ color: '#34495e' }}>Weight (kg):</Form.Label>
                        <Form.Control
                          type="number"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          placeholder="Enter weight"
                          style={{ borderRadius: '10px', border: '1px solid #ced4da' }}
                        />
                      </Form.Group>
                      <Form.Group className="mb-1">
                        <Form.Label className="fw-bold" style={{ color: '#34495e' }}>Height (cm):</Form.Label>
                        <Form.Control
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="Enter height"
                          style={{ borderRadius: '10px', border: '1px solid #ced4da' }}
                        />
                      </Form.Group>
                      <Button
                        variant="primary"
                        onClick={calculateBMI}
                        className="w-100 mt-3 py-2 fs-5 fw-bold"
                        style={{
                          borderRadius: '10px',
                          border: 'none',
                          transition: 'background-color 0.3s'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                      >
                        Calculate BMI
                      </Button>
                    </Form>
                    {bmi && (
                      <p className="mt-3 fs-5 text-center" style={{ color: '#27ae60' }}>
                        <strong>Your BMI:</strong> {bmi}
                      </p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card className=" text-dark bg-light" style={{ border: 'none', borderRadius: '15px', transition: 'transform 0.3s' }}>
                  <Card.Body className="p-4">
                    <h4 className="text-center fs-2 fw-bold mb-1" style={{ color: '#2c3e50' }}>Workout Progress</h4>
                    <p className="fs-5 mb-4" style={{ color: '#34495e', lineHeight: '1.5', fontStyle: 'italic' }}>
                      View your monthly progress! Analyze your performance, track your goals, and see how much closer you are to your fitness targets.
                    </p>
                    <Link to="/performance" className="text-decoration-none">
                      <Button 
                        variant="primary" 
                        className="w-100 my-2 py-2 fw-bold fs-5" 
                        style={{ 
                          borderRadius: '10px', 
                          border: 'none', 
                          transition: 'background-color 0.3s' 
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'} 
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                      >
                        View Full Progress
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
              <Card className=" text-center text-dark bg-light" style={{ border: 'none', borderRadius: '15px', transition: 'transform 0.3s' }}>
                <Card.Body className="p-4">
                  <h5 className="fw-bold fs-2 mb-1" style={{ color: '#2c3e50' }}>Weekly Goals</h5>
                  <p className="fs-5 mb-3" style={{ color: '#34495e', lineHeight: '1.6', fontStyle: 'italic' }}>
                    Set your weekly workout targets, track your progress, and stay on top of your fitness game. <strong>Consistency is the key to success!</strong>
                  </p>
                  <Link to="/workplan" className="text-decoration-none">
                    <Button
                      variant="primary"
                      className="w-100 my-2 py-2 fs-5 fw-bold"
                      style={{
                        borderRadius: '10px',
                        border: 'none',
                        transition: 'background-color 0.3s'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                    >
                      Weekly Plan
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            </Row>
          </Container>
      </Col>
    </Row>
  </Container>
  
  );
};

export default Dashboard;

