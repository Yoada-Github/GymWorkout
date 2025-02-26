import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import WorkoutList from '../components/WorkoutList';
import AddWorkoutForm from '../components/AddWorkoutForm';
import NavBars from "./NavBars";

function Home() {
  const [gyms, setGyms] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log(userId)

    if (!userId) {
      console.error("Error: No user ID found.");
      return;
    }
    axios
      .get(`ttps://gymworkoutback-1.onrender.com/gym/gyms/${userId}`)
      .then((response) => {
        setGyms(response.data);
      })
      .catch((error) => {
        console.error("Error fetching workouts:", error);
        alert("Failed to fetch workouts. Please try again later.");
      });
  }, []);

  return (
    <div className="container-fluid">
      <Row className="flex-nowrap">
        <NavBars/>
        <Col >
          <div className="row py-5">
            <WorkoutList gyms={gyms} />
            <AddWorkoutForm setGyms={setGyms} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
