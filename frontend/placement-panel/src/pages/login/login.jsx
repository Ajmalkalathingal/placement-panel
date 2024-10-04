import { useEffect, useState} from "react";
import Input from "../../componets/input/input";
import "./style.css";
import Button from "../../componets/button";
import { toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constant";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    // Check if user is already logged in
    useEffect(() => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN);
      if (accessToken) {
        navigate("/profile");  // Redirect to profile if access token exists
      }
    }, [navigate]);

  const studentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = { email, password };

    try {
      const tokenResponse = await api.post("/api/token/", data);
      console.log(tokenResponse)
      if (tokenResponse.data) {

        localStorage.setItem(ACCESS_TOKEN, tokenResponse.data.access);
        localStorage.setItem(REFRESH_TOKEN, tokenResponse.data.refresh);
        localStorage.setItem('userType', tokenResponse.data.user_type);
        localStorage.setItem('username', tokenResponse.data.username);

        toast.success("Login successful!");

        navigate(`/profile`);
      } else {
        toast.error("Login failed. Please try again.");
        navigate(`/login`);
      }
    } catch (error) {
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
        <h2 className="title">Login on <span style={{ color: "#2970ff" }}>Student</span></h2>
        <form>
          <Input label="Email" type="email" state={email} setState={setEmail} placeholder="Enter your email" />
          <Input label="Password" type="password" state={password} setState={setPassword} placeholder="Enter password" />
          <Button disabled={loading} text={loading ? "Loading" : "Login with Email"} onClick={studentLogin} />
          <Link to={'/signup-for-student'}>Don't have an account? Sign up.</Link>
        </form>
      </div>
        
      <button onClick={studentLogin}>wwwwww</button>
    </div>
  );
}

export default Login;
