import { useEffect, useState} from "react";
import Input from "../../componets/input/input";
import "./style.css";
import Button from "../../componets/button";
import { toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constant";

import Cookies from 'js-cookie';
import { setTokenCookies } from "../../utils/cookies";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
      const accessToken = Cookies.get(ACCESS_TOKEN);
      if (accessToken) {
        navigate("/profile");  // Redirect to profile if access token exists
      }
    }, [navigate]);

    const studentLogin = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (!email || !password) {
        toast.warn("Please fill in both email and password.");
        setLoading(false);
        return; 
      }
    
    
      // Prepare login data
      const data = {
        email: email,     
        password: password
      };
    
      try {
        const tokenResponse = await api.post("/api/token/", data);
        const  access= tokenResponse.data.access_token;
        const  refresh= tokenResponse.data.refresh_token;
        const  user_type= tokenResponse.data.user_type;

        // Save tokens in cookies
        setTokenCookies(access, refresh,user_type);
    
        toast.success("Login successful!");
        navigate(`/profile`);
      } catch (error) {
        console.log(error)
        if (error.response) {
          toast.error("Login failed: " + error.response.data.detail);
        } else {
          toast.error("Network error. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="wrapper">
        <div className="signup-wrapper">
          <h2 className="title">Login <span style={{ color: "#2970ff" }}></span></h2>
          <form >
          <Input required={true} label="Email" type="email" state={email} setState={setEmail} placeholder="Enter your email" />
            <Input required ={true} label="Password" type="password" state={password} setState={setPassword} placeholder="Enter password" />
            <Button 
              disabled={loading} 
              onClick={studentLogin} 
              text={
                loading ? (
                  <span>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading
                  </span>
                ) : (
                  "Login"
                )
              } 
            />
            <Link to={'/signup-for-student'}>Don't have an account? Sign up.</Link>
            <br />
            <Link to={'/reset-password'}>reset password.</Link>
          </form>
        </div>
      </div>
    );
}

export default Login;
