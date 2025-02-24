import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from 'react-icons/ai';


const WorkoutList = ({ gyms }) => {
  return (
    <div className="col-lg-8 mx-auto">
      {gyms.length === 0 ? (
        <div className="text-center my-4">
          <p className="text-muted fs-5">No workouts created yet.</p>
        </div>
      ) : (
        <div className="row">
          {gyms.map((gym) => (
            <div key={gym._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-lg border-0 rounded">
                <div className="card-body bg-light">
                  <h5 className="card-title text-primary fw-bold">{gym.title}</h5>
                  <p className="mb-2"><strong>Load:</strong> {gym.load} kg</p>
                  <p className="mb-2"><strong>Reps:</strong> {gym.reps}</p>
                  <small className="text-muted">{new Date(gym.createdAt).toLocaleString()}</small>
                </div>
                <div className=" d-flex card-footer justify-content-center">
                  <Link to={`/delete/${gym._id}`} className="text-primary mx-2 fs-2 text-center">
                      <MdDelete title="Delete" className="fs-1 text-danger"/> 
                  </Link>
                  <Link to={`/editExercise/${gym._id}`} className="text-primary mx-2 fs-2 text-center">
                      <AiOutlineEdit title="Edit" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WorkoutList;
