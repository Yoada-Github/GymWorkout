import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Button, Table, Row, Col } from 'react-bootstrap';
import NavBars from './NavBars';
import { MdDelete } from "react-icons/md";
import { useSnackbar } from 'notistack';

const PerformanceTracking = () => {
  const [performanceData, setPerformanceData] = useState([]);
  const [formData, setFormData] = useState({ date: '', weight: '', exerciseName: '', load: '', reps: '' });
  const userId = localStorage.getItem('userId');
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://gymworkoutback-1.onrender.com/gym/performance/${userId}`);
      setPerformanceData(response.data);
    } catch (error) {
      console.error('Error fetching performance data:', error);
    }
  };

  useEffect(() => {
    if (userId) 
      fetchData();
    
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPerformance = { ...formData, userId: userId, date: new Date(formData.date).getTime() };
    try {
      const response = await axios.post('https://gymworkoutback-1.onrender.com/gym/performance', newPerformance);
      fetchData();  
      setFormData({ date: '', weight: '', exerciseName: '', load: '', reps: '' });
    } catch (error) {
      console.error('Error saving performance:', error);
    }
  };

  const handleDeletePerformance = async (id) => {
    try {
      await axios.delete(`https://gymworkoutback-1.onrender.com/gym/performance/${id}`);
      enqueueSnackbar('Performance deleted successfully', { variant: 'success' });
      fetchData();
    } catch (error) {
      enqueueSnackbar('Failed to delete performance', { variant: 'error' });
      console.error('Error deleting performance:', error);
    }
  };

  // Group performance data by date and include _id
  const groupedData = performanceData.reduce((acc, data) => {
    const date = new Date(data.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = { weight: data.weight, exercises: {}, ids: [] };
    }
    if (!acc[date].exercises[data.exerciseName]) {
      acc[date].exercises[data.exerciseName] = [];
    }
    acc[date].exercises[data.exerciseName].push({ load: data.load, reps: data.reps });
    acc[date].ids.push(data._id);
    return acc;
  }, {});

  // Get unique exercise names
  const exerciseNames = [...new Set(performanceData.map(data => data.exerciseName))];

  return (
    <div className="container-fluid">
      <Row className="flex-nowrap">
        <NavBars />
        <Col>
          <div className="container mt-3">
            <h2 className="text-center text-primary mb-4">Gym Performance Tracker</h2>
            <Form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light">
              {['date', 'weight', 'exerciseName', 'load', 'reps'].map(field => (
                <Form.Group className="mb-3" key={field}>
                  <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
                  <Form.Control 
                    type={field === 'date' ? 'date' : (['weight', 'load', 'reps'].includes(field) ? 'number' : 'text')} 
                    name={field} 
                    value={formData[field]} 
                    onChange={handleChange} 
                    required 
                  />
                </Form.Group>
              ))}
              <Button variant="primary" type="submit">Save Performance</Button>
            </Form>
            <h3 className="mt-3 text-success">Monthly Performance Data</h3>
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Weight (kg)</th>
                  {exerciseNames.map(exercise => (
                    <th colSpan="2" key={`header-${exercise}`}>{exercise}</th>
                  ))}
                  <th>Delete</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  {exerciseNames.map(exercise => (
                    <>
                      <th key={`header-${exercise}-load`}>Load (kg)</th>
                      <th key={`header-${exercise}-reps`}>Reps</th>

                    </>
                  ))}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(groupedData).map(([date, data]) => (
                  <tr key={date}>
                    <td>{date}</td>
                    <td>{data.weight}</td>
                    {exerciseNames.map(exercise => (
                      <>
                       <td key={`${date}-${exercise}-load`}>
                        {data.exercises[exercise] ? data.exercises[exercise].map((ex, idx) => (
                          <div key={`${date}-${exercise}-load-${idx}`}>{ex.load}</div>
                        )) : '-'}
                      </td>
                      <td key={`${date}-${exercise}-reps`}>
                        {data.exercises[exercise] ? data.exercises[exercise].map((ex, idx) => (
                          <div key={`${date}-${exercise}-reps-${idx}`}>{ex.reps}</div>
                        )) : '-'}
                      </td>


                      </>
                    ))}
                    <td>
                      <button onClick={() => handleDeletePerformance(data.ids[0])} className="btn btn-light btn-sm" style={{ width: "60px", justifyContent: "center" }}>
                        <MdDelete className='text-danger fw-bold fs-1' />
                      </button>
                     
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PerformanceTracking;