import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Registration from "./components/Registration";
import Nav from "./components/Nav";
import AdminLogin from "./components/AdminLogin";
import CustomerLogin from "./components/CustomerLogin";

function App() {
  return (
    <>
      {/* <Register /> */}
      <Nav />
      <Router>
        <Routes>
          <Route path="/" element={<CustomerLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
