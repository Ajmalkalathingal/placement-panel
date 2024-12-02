import { useEffect, useState } from "react";
import Input from "../../componets/input/input";
import "./style.css";
import Button from "../../componets/button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";
import { REFRESH_TOKEN } from "../../constant";
import Profile from "../profile/profile";
import Cookies from "js-cookie";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Signup function for student
  const studentSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    let data = {
      registration_number: registrationId,
      email,
      password,
      first_name: name,
      last_name: name,
      user_type: "student",
    };

    try {
      const response = await api.post("/api/signup/student/", data);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;

        for (const [field, messages] of Object.entries(errorData)) {
          messages.forEach((message) => toast.error(`${field}: ${message}`));
        }
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("Network error or registration failed!");
      }
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (refreshToken) {
      navigate("/profile"); 
    }
  }, [navigate]);

  return (
    <>
      <div className="wrapper">
        <div className="signup-wrapper">
          <h2 className="title">
            Sign up on <span style={{ color: "#2970ff" }}>Student</span>
          </h2>
          <form onSubmit={studentSignup}>
            <Input
              label="Registration ID"
              type="text"
              state={registrationId}
              setState={setRegistrationId}
              placeholder="Enter your registration ID"
            />
            <Input
              label="Full Name"
              type="text"
              state={name}
              setState={setName}
              placeholder="Enter your full name"
            />
            <Input
              label="Email"
              type="email"
              state={email}
              setState={setEmail}
              placeholder="Enter your email"
            />
            <Input
              label="Password"
              type="password"
              state={password}
              setState={setPassword}
              placeholder="Enter password"
            />
            <Input
              label="Confirm Password"
              type="password"
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder="Confirm password"
            />
            <Button
              disabled={loading}
              text={loading ? "Loading" : "Sign up "}
              onClick={studentSignup}
            />
            <Link
              to={"/login"}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              Already have an account? Click here to login.
            </Link>
          </form>
        </div>
      </div>

      {/* <button onClick={studentSignup}>wwwwww</button> */}
    </>
  );
}

export default Signup;
