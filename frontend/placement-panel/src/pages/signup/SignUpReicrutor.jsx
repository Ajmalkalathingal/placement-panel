import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../componets/input/input";
import Button from "../../componets/button";
import { toast } from "react-toastify";
import api from "../../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constant";

const SignUpRicuter = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Signup function for Ricuter
  const RicuterSignUp = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password,
      first_name: name,
      last_name: name,
      user_type: "recruiter",
    };

    console.log(data);

    try {
      const response = await api.post("/api/signup/recruiter/", data);

      console.log(response.data);
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
            Sign up on <span style={{ color: "#2970ff" }}>recruiter</span>
          </h2>
          <form onSubmit={RicuterSignUp}>
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
              onClick={RicuterSignUp}
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

      {/* <button onClick={RicuterSignUp}>wwwwww</button> */}
    </>
  );
};

export default SignUpRicuter;
