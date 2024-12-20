import React, { useState } from "react";
import { toast } from "react-toastify";
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";

function RicruterRegistrationForm({onSubmit}) {
  const [formData, setFormData] = useState({
    company_name: "",
    position: "",
    contact_number: "",
    company_logo: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append("company_name", formData.company_name);
    form.append("position", formData.position);
    form.append("contact_number", formData.contact_number);
    if (formData.company_logo) {
      form.append("company_logo", formData.company_logo);
    }

    // Call the onSubmit prop passed from Profile component
    await onSubmit(form);

    // Reset form fields after successful submission
    // setFormData({
    //   company_name: "",
    //   position: "",
    //   contact_number: "",
    //   company_logo: null,
    // });
    setLoading(false);
  };

  return (
    <div className="container register">
    <div className="row">
      <div className="col-md-3 register-left">
      <img
            src={"src/assets/images/logo2.png"}
            alt="University Logo"
            width="40"
            height="40"
            className="me-2 ml-4"
          />
        <h3>Welcome</h3>
        <p>Calicut university DCMS placeemnt cell</p>
      </div>
      <div className="col-md-9 register-right">
        <div className="tab-content" id="myTabContent ">
          {/* Employee Form */}
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h3 className="register-heading">Apply as Recruter</h3>
            <div className="row register-form">
              <div className="col-md-6">
                
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="company name *" 
                    name="company_name"
                    value={formData.company_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="company position *" 
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <input 
                    type="text" 
                    minLength="10" 
                    maxLength="10" 
                    className="form-control" 
                    placeholder="Your Phone *" 
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                    <label htmlFor="company_logo">Upload Company Logo:</label>
                    <input
                      type="file"
                      className="form-control"
                      id="company_logo"
                      name="company_logo"
                      onChange={handleChange}
                    />
                  </div>
                <input 
                  type="submit" 
                  className="btnRegister"  
                  value={loading ? "Registering..." : "Register"} 
                  disabled={loading}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>

          {/* Hirer Form */}
          <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
            <h3 className="register-heading">Apply as a Ricruter</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default RicruterRegistrationForm;
