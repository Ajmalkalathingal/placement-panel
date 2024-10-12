import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../../api";

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
    setFormData({
      company_name: "",
      position: "",
      contact_number: "",
      company_logo: null,
    });
    setLoading(false);
  };

  return (
    <div className="container mt-5">
<div className="row">
    <div className="col-md-4">
    <div class="card text-white bg-primary py-5 d-md-down-none" style={{width:"100%", height:"100%"}}>
<div class="card-body text-center">
<div>
<h2>Sign up</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
<button type="button" class="btn btn-primary active mt-3">Register Now!</button>
</div>
</div>
</div>
    </div>
        <div className="col-md-8">
          <h2>Create Recruiter Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="company_name" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                id="company_name"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="position" className="form-label">
                Position
              </label>
              <input
                type="text"
                className="form-control"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Enter position"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="contact_number" className="form-label">
                Contact Number
              </label>
              <input
                type="text"
                className="form-control"
                id="contact_number"
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                placeholder="Enter contact number"
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="company_logo" className="form-label">
                Company Logo
              </label>
              <input
                type="file"
                className="form-control"
                id="company_logo"
                name="company_logo"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RicruterRegistrationForm;
