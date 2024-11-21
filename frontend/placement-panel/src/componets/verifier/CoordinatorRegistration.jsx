import React, { useState } from "react";
import api from "../../api";  // Make sure the API is correctly set up

const CoordinatorRegistrationForm = () => {
  const [coordinatorId, setCoordinatorId] = useState("");
  const [email, setEmail] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/api/coordinators/register/", {
        coordinator_id: coordinatorId,
        email: email,
        registration_code: registrationCode,
        is_registered: isRegistered,
      });

      // Handle successful registration
      if (response.status === 201) {
        alert("Coordinator registered successfully!");
        setCoordinatorId("");
        setEmail("");
        setRegistrationCode("");
        setIsRegistered(false);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Coordinator Registration</h2>

      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title text-center">Register as a Coordinator</h5>

              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="coordinatorId">Coordinator ID</label>
                  <input
                    type="text"
                    id="coordinatorId"
                    className="form-control"
                    value={coordinatorId}
                    onChange={(e) => setCoordinatorId(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="registrationCode">Registration Code</label>
                  <input
                    type="text"
                    id="registrationCode"
                    className="form-control"
                    value={registrationCode}
                    onChange={(e) => setRegistrationCode(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    id="isRegistered"
                    className="form-check-input"
                    checked={isRegistered}
                    onChange={() => setIsRegistered(!isRegistered)}
                  />
                  <label className="form-check-label" htmlFor="isRegistered">
                    I am registered
                  </label>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorRegistrationForm;
