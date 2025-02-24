import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";


function EditGym() {
  const [day, setDay] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchGymDetails = async (userId) => {

    setLoading(true);
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5003/gym/workout-plan/getOne/${id}`, {params: {userId: userId}});
      const { day, title } = response.data;
      console.log(response.data)

      if (day && title) {
        setDay(day);
        setTitle(title);
      } else {
        console.log('Incomplete gym data!');
      }
    } catch (error) {
      console.error('Failed to fetch gym details:', error);
      setError('Failed to fetch gym details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Added useEffect to fetch gym details on component mount
  useEffect(() => {
    fetchGymDetails();
  }, [id]);

  const handleEditGym = async () => {
    const data = { day, title };
    setLoading(true);
  
    try {
      await axios.put(`http://localhost:5003/gym/workout-plan/${id}`, data); 
      alert('Gym plan updated successfully!');
      navigate('/workPlan');
    } catch (err) {
      console.error('Failed to update gym plan:', err.message);
      setError('Failed to update the gym plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-4 bg-light vh-100">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="btn btn-outline-secondary mb-4"style={{ width: '56px' }}>
        <strong><IoMdArrowRoundBack className='fw-bold fs-2' /></strong> 
      </button>
      <h1 className="text-center text-primary mb-4 fw-bold">Edit Gym Plan</h1>

      {error && (
        <div className="alert alert-danger text-center mb-4">
          {error}
        </div>
      )}

      {/* Form Container */}
      <div className="card shadow-sm mx-auto bg-secondary " style={{ maxWidth: '500px', minHeight:"300px" }}>
        <div className="card-body p-5">
          {loading ? (
            <div className="text-center text-muted">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2">Loading...</p>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="day" className="form-label fs-5 text-white fw-bold">
                  Day :
                </label>
                <input
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="form-control"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="title" className="form-label fs-5 mb-2 text-white fw-bold">Title :</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <button className="btn btn-primary w-100 py-1 my-3 fs-4"  onClick={handleEditGym} disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </button>
            </>
          )}
        </div>
      </div>
  </div>
  );
}

export default EditGym;