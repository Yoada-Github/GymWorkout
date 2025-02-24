import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DeleteGym from "./pages/DeleteGym";
import ExerciseList from "./pages/ExerciseList";
import WorkoutPlan from "./pages/WorkoutPlan"; 
import Setting from "./pages/Setting";
import EditGym from "./pages/EditGym"; 
import EditExercise from "./pages/EditExercise"; 
import PerformanceTracking from "./pages/WorkPerformance"


function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/delete/:id" element={<DeleteGym />} />
        <Route path="create" element={<Home />} />
        <Route path="/gyms/" element={<ExerciseList />} />
        <Route path="workplan" element={<WorkoutPlan />} />
        <Route path="profile" element={<Setting />} />
        <Route path="performance" element={<PerformanceTracking />} />
        <Route path="/edit/:id" element={<EditGym />} />
        <Route path="/editExercise/:id" element={<EditExercise />} />

        {/* Protected Dashboard Routes */}
        <Route path="/dashboard/*" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute> }>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

