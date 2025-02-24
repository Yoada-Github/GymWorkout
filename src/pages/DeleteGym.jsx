import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';
import { MdDelete } from "react-icons/md";


const DeleteGym = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteWorkout = () => {
    axios
      .delete(`http://localhost:5003/gym/delete/${id}`)
      .then(() => {
        enqueueSnackbar('Gym deleted successfully', { variant: 'success' });
        navigate('/create');
      })
      .catch((error) => {
        enqueueSnackbar('Failed to delete Gym', { variant: 'error' });
        console.error(error);
      });
  };

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100">
      <Card className="shadow-lg border-0 p-4 text-center" style={{ maxWidth: '500px' }}>
        <Card.Body>
          <h2 className="text-danger fw-bold"><MdDelete /> Delete Gym</h2>
          <p className="fs-5 text-muted">Are you sure you want to delete this gym? This action cannot be undone.</p>
          
          <div className="d-flex gap-3 justify-content-center mt-4">
            <Button 
              variant="danger" 
              className="fw-bold px-4 py-2"
              onClick={handleDeleteWorkout}
            >
              Yes, Delete
            </Button>
            <Button 
              variant="secondary" 
              className="fw-bold px-4 py-2"
              onClick={() => navigate('/create')}
            >
              Cancel
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DeleteGym;
