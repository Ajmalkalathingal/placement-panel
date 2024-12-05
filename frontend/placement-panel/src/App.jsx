
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"

import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/signup/SignupStudent';
import { ToastContainer } from 'react-toastify';
import Login from './pages/login/login'

import 'react-toastify/dist/ReactToastify.css';
import Profile from './pages/profile/profile';
import SignUpRicuter from './pages/signup/SignUpReicrutor';
import SignupCoordinator from './pages/signup/signUpCoordinator';
import ResetPassword from './pages/resetPassword/resetPassword';
import RequestPasswordReset from './pages/requestresetpassword/RequestPasswordReset ';
import Index from './pages/home';
import ContactUs from './componets/contact us/ContactUs';
import Blog from './componets/PlacementBlog/Blog';

function App() {
  

  return (
    <>
      <div className="">
        <ToastContainer/>
        <Routes>
        <Route path="/" element={<Index/>}/>
        <Route path="/" element={<ContactUs/>}/>
        <Route path="/" element={<Blog/>}/>
        <Route path="/signup-for-student" element={<Signup />} />
        <Route path="/signup-for-recruiter" element={<SignUpRicuter />} />
        <Route path="/signup-for-coordinator" element={<SignupCoordinator />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<RequestPasswordReset />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route path='/profile' element={ <Profile/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
