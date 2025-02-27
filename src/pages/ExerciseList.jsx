import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import NavBars from "./NavBars";
import beginner from "../assets/Beginner.jpg"
import intermediate from "../assets/Intermediate.jpg"
import Advanced from "../assets/Advanced.jpg"
import { IoMdArrowRoundBack } from "react-icons/io";
import exerciseMedia from "../data/exerciseEmojs";


const ExerciseList = () => {
  const [gyms, setGyms] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [filteredExercises, setFilteredExercises] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios
      .get(`https://gymworkoutback-1.onrender.com/gym/gyms/${userId}`)
      .then((response) => {
        setGyms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching gyms:", error);
        alert("Failed to fetch gyms. Please try again later.");
      });
  }, []);

  const filterExercisesByLevel = (level) => {
    setSelectedLevel(level);
  
    const filtered = gyms.map((gym) => {
      let levelLoad, levelReps;
  
      if (level === "Beginner") {
        levelLoad = Math.ceil(gym.load * 0.3);
        levelReps = Math.ceil(gym.reps * 0.3);
      } else if (level === "Intermediate") {
        levelLoad = Math.ceil(gym.load * 0.7);
        levelReps = Math.ceil(gym.reps * 0.7);
      } else {
        levelLoad = gym.load;
        levelReps = gym.reps;
      }
  
      return { ...gym, load: levelLoad, reps: levelReps };
    });
  
    setFilteredExercises(filtered);
  }; 
  
  return (
    <div>
      <Container fluid className="vh-100">
        <Row className="flex-nowrap">
          <Col>
            {!selectedLevel ? (
            <div className="text-center">
              <Row>
              <NavBars/>
              <h4 className="fs-2 text-success fw-bold pt-4">Select Your Workout Level</h4>

                <Col md={4}>
                  <Card className="shadow-lg p-3 mb-5 bg-light rounded text-center">
                    <Card.Img variant="top shadow" src={beginner} alt="Beginner Workout" height={300}/>
                    <Card.Body>
                      <Card.Title>Beginner Level</Card.Title>
                      <Card.Text>
                        Perfect for those starting their fitness journey with light workouts.
                      </Card.Text>
                      <Button variant="primary" onClick={() => filterExercisesByLevel("Beginner")}>
                        Beginner
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                    <Card.Img variant="top" src={intermediate} alt="Intermediate Workout" height={300} />
                    <Card.Body>
                      <Card.Title>Intermediate Level</Card.Title>
                      <Card.Text>
                        Take your fitness to the next level with challenging workouts.
                      </Card.Text>
                      <Button variant="primary" onClick={() => filterExercisesByLevel("Intermediate")}>
                        Intermediate
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                    <Card.Img variant="top" src={Advanced} alt="Advanced Workout" height={300} />
                    <Card.Body>
                      <Card.Title>Advanced Level</Card.Title>
                      <Card.Text>
                        High-intensity workouts designed for experienced fitness enthusiasts.
                      </Card.Text>
                      <Button variant="primary" onClick={() => filterExercisesByLevel("Advanced")}>
                        Advanced
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
            ) : (
              <>
                 <Button variant="btn btn-outline-secondary" className=" m-3 fw-1" style={{ width: '56px' }} onClick={() => setSelectedLevel(null)}>
                  <strong><IoMdArrowRoundBack  className="fw-bold fs-3"/></strong>
                 </Button>
                <h3 className="text-center text-uppercase">{selectedLevel} Level Exercises</h3>
                <Row>
                  {filteredExercises.length > 0 ? (
                    filteredExercises.map((exercise) => (
                      <Col key={exercise._id} md={4} className="mb-4">
                        <Card className="shadow-lg border-0 overflow-hidden">
                        <div className="gym-card-bg position-relative">
                          {exerciseMedia[exercise.title.toLowerCase()] ? (
                            exerciseMedia[exercise.title.toLowerCase()].endsWith(".mp4") ? (
                              <video
                                src={exerciseMedia[exercise.title.toLowerCase()]}
                                autoPlay
                                loop
                                muted
                                className="w-100"
                                style={{ maxHeight: "20vh", objectFit: "cover" }}
                              />
                            ) : (
                              <img
                                src={exerciseMedia[exercise.title.toLowerCase()]}
                                alt={exercise.title.toLowerCase()}
                                className="w-75 mx-5 my-3"
                                style={{ maxHeight: "25vh", maxWidth:"404px", objectFit: "cover" }}
                              />
                            )
                          ) : (
                            <p className="text-center text-muted">No media available</p>
                          )}
                        </div>
                          <Card.Body className="text-center">
                            <Card.Title className="fw-bold text-primary fs-4">
                            <strong>Load:</strong> {exercise.title}
                            </Card.Title>
                            <Card.Text className="text-secondary">
                              <strong>Load:</strong> {exercise.load}kg
                            </Card.Text>
                            <Card.Text className="text-secondary">
                              <strong>Reps:</strong> {exercise.reps}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))
                  ) : (
                    <p className="text-center text-muted fs-5">
                      No exercises found for this level.
                    </p>
                  )}
                </Row>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ExerciseList;
