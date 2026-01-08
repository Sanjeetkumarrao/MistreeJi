import {Routes, Route, BrowserRouter as Router} from "react-router-dom"
import Login from "./pages/Login.jsx"
import RoleSelection from "./pages/RoleSelection.jsx"
import WorkerRegistration from "./pages/WorkerRegistration.jsx"
import CustomerDashboard from "./pages/CustomerDashboard.jsx"
import WorkerDashboard from "./pages/WorkerDashBoard.jsx"
import CustomerRegistration from "./pages/CustomerRegistration.jsx"

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} ></Route>
        <Route path="/role-selection" element={<RoleSelection/>} ></Route>
        <Route path="/worker-registration" element={<WorkerRegistration/>} ></Route>
        <Route path="/customer-registration" element={<CustomerRegistration/>} ></Route>
        <Route path="/customer-dashboard" element={<CustomerDashboard/>} ></Route>
        <Route path="/worker-dashboard" element={<WorkerDashboard/>} ></Route>
      </Routes>
    </Router>
  )
}

export default App
