

import { useState } from "react";
import Input from "../../componets/input/input";
import "./style.css";
import Button from "../../componets/button";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

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

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    // Prepare the data to send
    let student_id = registrationId;
    let data = {
      student_id,
      email,
      password,
      first_name: name,
      last_name: name,
      user_type: "student",
    };

    // console.log(data);

    try {
      const response = await api.post("/api/signup/student/", data);

      console.log(response.data);
      toast.success("Registration successful!");

      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        toast.error("Registration failed: " + JSON.stringify(errorData));
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        console.error("Error", error.message);
        toast.error("Network error or registration failed!");
      }
    } finally {
      setLoading(false);
    }
  };

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
            <Link to={'/login'}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              Already have an account? Click here to login.
            </Link>
          </form>
        </div>
      </div>

      
      <button onClick={studentSignup}>wwwwww</button>
    </>
  );
}

export default Signup;

