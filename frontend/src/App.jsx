import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Registration from "./components/Registration";
import Nav from "./components/Nav";
import AdminLogin from "./components/AdminLogin";
import CustomerLogin from "./components/CustomerLogin";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<CustomerLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;