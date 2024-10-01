
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Signup from './pages/signup/Signup';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login/login'

import 'react-toastify/dist/ReactToastify.css';
import StudentProfile from './pages/student profile';

function App() {

  return (
    <>
      <div className="">
        <ToastContainer/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup-for-student" element={<Signup />} />
        <Route path="/login-for-student" element={<Login />} />
        <Route path="/student-profile" element={<StudentProfile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
