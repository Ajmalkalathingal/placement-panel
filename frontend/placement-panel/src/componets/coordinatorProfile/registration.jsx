import { useEffect, useState } from "react";
import api from "../../api";
import "./rstyle.css";

const Registration = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    registration_number: "",
    name: "",
    course: "",
    duration: "",
    starting_date: "",
    ending_date: "",
    is_registered: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("api/course-choices/");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching course choices:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await api.post("api/register/", formData);
      setSuccess("Registration successful!");
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response && error.response.data) {
        const errorMessages = Object.values(error.response.data);
        setError(`Registration failed: ${errorMessages}`);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="card text-black" style={{ borderRadius: "25px" }}>
        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
          Registration
        </p>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
          {/* First Part: Registration Information */}
          <div className="row">
            <div className="col-md-6">
              {/* Registration Number */}
              <div className="form-group mb-4">
                <label htmlFor="registration_number">Registration Number</label>
                <input
                  type="text"
                  id="registration_number"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Registration Number"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Name */}
              <div className="form-group mb-4">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Second Part: Course and Dates */}
          <div className="row">
            <div className="col-md-6">
              {/* Course */}
              <div className="form-group mb-4">
                <label htmlFor="course">Course</label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="" disabled>
                    Select Course
                  </option>
                  {courses.map((course) => (
                    <option key={course.value} value={course.value}>
                      {course.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              {/* Starting Date */}
              <div className="form-group mb-4">
                <label htmlFor="starting_date">Starting Date</label>
                <input
                  type="date"
                  id="starting_date"
                  name="starting_date"
                  value={formData.starting_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>

          {/* Third Part: Duration and Ending Date */}
          <div className="row">
            <div className="col-md-6">
              {/* Duration */}
              <div className="form-group mb-4">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Duration"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              {/* Ending Date */}
              <div className="form-group mb-4">
                <label htmlFor="ending_date">Ending Date</label>
                <input
                  type="date"
                  id="ending_date"
                  name="ending_date"
                  value={formData.ending_date}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>

          {/* Fourth Part: Checkbox and Submit */}
          {/* <div className="row">
            <div className="col-md-6">
              <div className="form-check d-flex justify-content-center mb-5">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  name="is_registered"
                  checked={formData.is_registered}
                  onChange={handleChange}
                />
                <label className="form-check-label">Registered</label>
              </div>
            </div>
          </div> */}

          {/* Submit Button */}
          <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
            <button type="submit" className="btn btn-primary btn-lg">
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
