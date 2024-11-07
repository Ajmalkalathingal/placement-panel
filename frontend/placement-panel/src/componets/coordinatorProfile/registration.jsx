import { useEffect, useState } from "react";
import api from "../../api";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBook, faEnvelope, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Registration = () => {
  const [courses, setCourses] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);

  const [formData, setFormData] = useState({
    registration_number: '',
    name: '',
    course: '',
    duration: '',
    starting_date: '',
    ending_date: '',
    is_registered: false,
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
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); 

    try {
      const response = await api.post("api/register/", formData);
      setSuccess('Registration successful!'); 
    } catch (error) {
      console.error("Error during registration:", error);
      setError('Registration failed. Please try again.' + error);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitPdf = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const uploadData = new FormData();
    uploadData.append('file', selectedFile);

    try {
      const response = await api.post('/api/upload-student-data/', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        alert('File uploaded successfully!');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file.');
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
                      name="registration_number" 
                      value={formData.registration_number}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">
                      Registration Number
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faUser} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">
                      Name
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
                    <label className="form-label">
                      Course
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faEnvelope} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="text"
                      name="duration"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">
                    duration
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faCalendarAlt} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="date"
                      name="starting_date"
                      value={formData.starting_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">
                      Starting Date
                    </label>
                  </div>
                </div>

                <div className="d-flex flex-row align-items-center mb-4">
                  <FontAwesomeIcon icon={faCalendarAlt} size="lg" className="me-3" />
                  <div className="form-outline flex-fill mb-0">
                    <input
                      type="date"
                      name="ending_date"
                      value={formData.ending_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                    <label className="form-label">
                      Ending Date
                    </label>
                  </div>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    name="is_registered"
                    checked={formData.is_registered}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">
                    Registered
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
      <div>
        <h2>Upload Student Data</h2>
        <form onSubmit={handleSubmitPdf}>
          <input type="file" accept=".xlsx" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    </>
  );
};

export default Registration;
