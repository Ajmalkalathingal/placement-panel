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
        <img src="https://image.ibb.co/n7oTvU/logo_white.png" alt=""/>
        <h3>Welcome</h3>
        <p>You are 30 seconds away from earning your own money!</p>
        <input type="submit" name="" value="Login"/><br/>
      </div>
      <div className="col-md-9 register-right">
        <ul className="nav nav-tabs nav-justified" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Hirer</a>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent ">
          {/* Employee Form */}
          <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <h3 className="register-heading">Apply as an Employee</h3>
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
            {/* Add hirer form fields similar to the employee */}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default RicruterRegistrationForm;
