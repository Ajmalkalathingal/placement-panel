
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import Signup from './pages/signup/Signup';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <div className="">
        <ToastContainer/>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/singup-for-student" element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App
