import { useState, useEffect } from "react";
import Input from "../../componets/input/input";
import "./style.css";
import Button from "../../componets/button";
import { toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constant";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAutherized, setIsAutherized] = useState(null);
  const navigate = useNavigate();

  const studentLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = { email, password };

    try {
      const tokenResponse = await api.post("/api/token/", data);
      console.log(tokenResponse)
      if (tokenResponse.data) {
        const { access, refresh } = tokenResponse.data;
        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);
        toast.success("Login successful!");

        const decodedToken = jwtDecode(access);
        navigate(`/student-profile`);
      } else {
        toast.error("Login failed. Please try again.");
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

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken) {
      setIsAutherized(false);
      return;
    }
    try {
      const res = await api.post('/api/token/refresh/', { refresh: refreshToken });
      if (res.status === 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAutherized(true);
      } else {
        setIsAutherized(false);
      }
    } catch (error) {
      console.log(error);
      setIsAutherized(false);
    }
  };

  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAutherized(false);
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiry = decoded.exp;
    const now = Date.now() / 1000;

    if (now > tokenExpiry) {
      await refreshToken();
    } else {
      setIsAutherized(true);
    }
  };

  useEffect(() => {
    auth().catch(() => { setIsAutherized(false) });
  }, []);

  if (isAutherized === null) {
    return <div>Loading...</div>;
  } else if (isAutherized) {
    return navigate(`/student-profile/`);;
  }

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
