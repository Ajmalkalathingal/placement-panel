import { useEffect, useState } from "react";
import api from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Registration = ({}) => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    student_id: '',
    course: '',
    email: '',
    terms: false
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      [name]: type === 'checkbox' ? checked : value // Handle checkbox
    });
  };

console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); 

    try {
 
      const response = await api.post("api/register/", formData);
      console.log(response); 
      setSuccess('Registration successful!'); 
    } catch (error) {
      console.error("Error during registration:", error);
      setError('Registration failed. Please try again.'+ error);
    }
  };

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <div className="card text-black" style={{ borderRadius: "25px" }}>
        <div className="card-body p-md-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-5 col-xl-4 order-2 order-lg-1">
              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                Registration
              </p>

              {error && <div className="alert alert-danger">{error}</div>} 
              {success && <div className="alert alert-success">{success}</div>} 

              <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
             
                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faUser} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="text"
                      name="student_id" 
                      value={formData.registrationId}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label" htmlFor="form3Example1c">
                      Registration ID
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faBook} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <select
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
                    <label className="form-label" htmlFor="formCourse">
                      Course
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label" htmlFor="form3Example3c">
                      Email
                    </label>
                  </div>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    required
                  />
                  <label className="form-check-label" htmlFor="form2Example3">
                    I agree to all statements in{" "}
                    <a href="#!">Terms of service</a>
                  </label>
                </div>

                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Register
                  </button>
                </div>
              </form>
            </div>

            <div className="col-md-10 col-lg-6 col-xl-5 d-flex align-items-center order-1 order-lg-2">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                className="img-fluid"
                alt="Sample image"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
