import { useState } from "react";
import Input from "../input/input";
import "./style.css";
import Button from "../button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import axios from "axios";

function SignupSigninComponents() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registrationId, setRegistrationId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
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

    console.log(data);

    try {
      const response = await api.post("/api/signup/student/", data);

      console.log(response.data);
      toast.success("Registration successful!");

      // Store tokens in localStorage
      const tokenResponse = await api.post("/api/token/",data);
      console.log(tokenResponse)
      if (tokenResponse) {
        localStorage.setItem("ACCESS_TOKEN", tokenResponse.access_token);
        localStorage.setItem("REFRESH_TOKEN", tokenResponse.refresh_token);
        toast.success("Tokens stored successfully!");
      } else {
        toast.error("Tokens are missing from the response.");
      }

      // Redirect or navigate to the login page after successful registration
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

  const studentSignupp = () => {
    console.log("data");
  };
  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Login on <span style={{ color: "#2970ff" }}>AppName</span>
          </h2>
          <form>
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
            <Button
              disabled={loading}
              text={loading ? "Loading" : "Login with Email"}
              onClick={studentSignup} // Use the correct handler
            />
            <p
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Don't have an account? Click here to sign up.
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign up on <span style={{ color: "#2970ff" }}>AppName</span>
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
              text={loading ? "Loading" : "Sign up using Email"}
              onClick={studentSignup}
            />
            <p
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Already have an account? Click here to login.
            </p>
          </form>
        </div>
      )}

      <Button
        disabled={loading}
        text={"Sign up using Email"}
        onClick={studentSignupp}
      />
      <button onClick={studentSignup}>wwwwww</button>
    </>
  );
}

export default SignupSigninComponents;
