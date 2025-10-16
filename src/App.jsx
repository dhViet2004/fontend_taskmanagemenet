import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './admin/AdminLayout'
import EmployeeLayout from './employee/EmployeeLayout'
import Login from './login/login'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/employee/*" element={<EmployeeLayout />} />
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  )
}
