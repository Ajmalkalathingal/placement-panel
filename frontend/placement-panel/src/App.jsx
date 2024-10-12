
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/home';
import Signup from './pages/signup/SignupStudent';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login/login'

import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/profile/profile';
import SignUpRicuter from './pages/signup/SignUpReicrutor';
import SignupCoordinator from './pages/signup/signUpCoordinator';

function App() {

  return (
    <>
      <div className="">
        <ToastContainer/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup-for-student" element={<Signup />} />
        <Route path="/signup-for-recruiter" element={<SignUpRicuter />} />
        <Route path="/signup-for-coordinator" element={<SignupCoordinator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  )
}

export default App
