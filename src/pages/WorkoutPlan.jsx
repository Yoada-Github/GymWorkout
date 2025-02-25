import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { Row, Col } from "react-bootstrap";
import NavBars from "./NavBars";
import { MdDelete } from "react-icons/md";
import { useSnackbar } from "notistack";
import { AiOutlineEdit } from 'react-icons/ai';
import { Link } from "react-router-dom";


const WorkoutPlan = () => {
  const [exercise, setExercise] = useState("");
  const [day, setDay] = useState("Monday");
  const [workoutPlan, setWorkoutPlan] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const userId = localStorage.getItem("userId"); 

  // Fetch workout plan from backend
  const fetchingData = async () => {
      try {
        const response = await axios.get(`https://gymworkoutback-1.onrender.com/gym/workout-plan/`, {params: {userId: userId}})
        setWorkoutPlan(response.data);

       } catch (error)  {
        console.error("Error fetching workout plan:", error);
        alert("Failed to fetch workout plan. Try again later.");
      };
  }

  useEffect(() => {
    if (userId) 
      fetchingData();
    
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exercise) {
      alert("Please enter an exercise name.");
      return;
    }
    const newWorkout = { title: exercise, day, userId };

    try {
      const response = await axios.post("https://gymworkoutback-1.onrender.com/gym/workout-plan", newWorkout);
      setWorkoutPlan([...workoutPlan, response.data]); // Add new workout to UI
      setExercise(""); 
      fetchingData();
    } catch (error) {
      console.error("Error adding workout:", error);
      alert("Failed to add workout.");
    }
  };

  const handleDeleteWorkout = async (id) => {
    try {
      const response = await axios.delete(`https://gymworkoutback-1.onrender.com/gym/workout-plan/${id}`);
      console.log('Workout deleted:', response.data);
      enqueueSnackbar('Workout deleted successfully', { variant: 'success' });
      fetchingData();
  
    } catch (error) {
      console.error('Error deleting workout:', error);
      enqueueSnackbar('Failed to delete workout', { variant: 'error' });
    }
  };


  return (
    <div className="container-fluid">
      <Row className="flex-nowrap">
        <NavBars />
        <Col>
          <div className="container mt-2">
            <h2 className="text-center text-primary fw-bold pb-3 fs-1"> Create Workout</h2>

            {/* Add Workout Form */}
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
              <div className="mb-2 col-md-4">
                <label className="form-label fw-bold">Exercise Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter exercise"
                  value={exercise}
                  onChange={(e) => setExercise(e.target.value)}
                />
              </div>
              <div className="row">
                <div className="col-md-4">
                  <label className="form-label fw-bold">Day:</label>
                  <select value={day} onChange={(e) => setDay(e.target.value)} className="form-select">
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </select>
                </div>
              </div>
              <button type="submit" className="btn btn-primary mt-3" style={{ width: "140px" }}>
                Add Workout
              </button>
            </form>

            {/* Display Weekly Workout Plan */}
            <h3 className="text-center text-success mt-3 fs-2 fw-bold"> Weekly Workout Plan</h3>
            {workoutPlan.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped table-bordered mt-4 text-center align-items-center">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Day</th>
                      <th>Exercise</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workoutPlan.map((workout, index) => (
                      <tr key={workout._id}>
                        <td>{index + 1}</td>
                        <td>{workout.day}</td>
                        <td>{workout.title}</td>
                        <td>
                          <button
                            onClick={() => handleDeleteWorkout(workout._id)} 
                            className="btn btn-light btn-sm" style={{ width: "60px", justifyContent: "center" }}>
                            <MdDelete title="Delete" className="text-danger fw-bold fs-2 text-center" />
                          </button>
                           <Link to={`/edit/${workout._id}`} className="text-primary mx-2 fs-2 text-center">
                             <AiOutlineEdit title="Edit" />
                           </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center mt-3">No workouts planned yet.</p>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default WorkoutPlan;