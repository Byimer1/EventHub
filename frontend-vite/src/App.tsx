import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import AddEvent from "./pages/AddEvent";
import UpdateEvent from "./pages/UpdateEvent";
import Events from "./pages/Events";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/update/:id" element={<UpdateEvent />} />
        <Route path="/events" element={<Events />} />

      </Routes>
    </Router>
  );
}

export default App;
