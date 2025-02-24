import React, { useState } from "react";
import axios from "axios";

const AddWorkoutForm = ({ setGyms }) => {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState("");

  const handleAddWorkout = (e) => {
    e.preventDefault();
    setError("");

    if (!title || !load || !reps) {
      setError("Please fill in all fields.");
      return;
    }

    const userId = localStorage.getItem("userId");
    const newWorkout = { title, load, reps, userId, timestamp: new Date().toISOString() };
    

    axios
      .post("http://localhost:5003/gym/", newWorkout)
      .then((response) => {
        setGyms((prevGyms) => [response.data, ...prevGyms]);
        setTitle("");
        setLoad("");
        setReps("");
      })
      .catch((error) => {
        console.error("Error creating workout:", error);
        alert("Failed to create workout. Please try again later.");
      });
  };


  return (
    <div className="col-lg-4 my-3">
      <div className="bg-secondary shadow-sm p-4 rounded text-white fw-bold">
        <h3 className="fw-bold mb-4">Add a New Workout</h3>
        <form onSubmit={handleAddWorkout}
        > 
          <div className="mb-3">
            <label className="form-label">Exercise Title:</label>
            <input
              type="text"
              value={title}
              className="form-control"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Load (kg):</label>
            <input
              type="number"
              value={load}
              className="form-control"
              onChange={(e) => setLoad(e.target.value)}
              placeholder="Enter load"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Reps:</label>
            <input
              type="number"
              value={reps}
              className="form-control"
              onChange={(e) => setReps(e.target.value)}
              placeholder="Enter reps"
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 my-3">Add Workout</button>
          {error && <div className="text-danger mt-3">{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddWorkoutForm;
