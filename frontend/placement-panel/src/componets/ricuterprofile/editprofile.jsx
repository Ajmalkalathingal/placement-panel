import React, { useState } from 'react';
import api from '../../api';
import { getImageUrl } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ profile,handleSectionChange,setProfile }) => {
  const navigate = useNavigate();
  let image = getImageUrl(profile.company_logo)

    const [formData, setFormData] = useState({
    firstName: profile.user.first_name || '',
    lastName: profile.user.last_name || '',
    email: profile.user.email || '',
    companyName: profile.company_name || '',
    position: profile.position || '',
    contactNumber: profile.contact_number || '',
    company_logo: image || null, 
  });
console.log(formData.company_logo)
  // Handle input change
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      company_logo: e.target.files[0],
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for submission
    const form = new FormData();
    form.append('user.first_name', formData.firstName);
    form.append('user.last_name', formData.lastName);
    form.append('company_name', formData.companyName);
    form.append('position', formData.position);
    form.append('contact_number', formData.contactNumber);
    form.append('is_active', formData.isActive);

    if (formData.company_logo && formData.company_logo instanceof File) {
      form.append('company_logo', formData.company_logo); 
  }

    try {
      const response = await api.put(`/api/recruiters/${profile.id}/update/`, form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfile(response.data);

    console.log('after update',profile)
      handleSectionChange('profile')
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  return (
    <div className="container mt-5">
      <h1 className="text-primary text-center">Edit Profile</h1>
      <hr />
      <div className="row">
        {/* Left Column - Profile Picture Upload */}
        <div className="col-md-4 text-center">
          <div className="card p-3 mb-3">
            <img
              src={formData.company_logo || 'https://bootdey.com/img/Content/avatar/avatar7.png'}
              className="avatar img-fluid rounded-circle mb-3"
              alt="avatar"
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
            <h6>Upload a different logo...</h6>
            <input type="file" className="form-control mt-2" onChange={handleFileChange} />
          </div>
        </div>

        {/* Right Column - Edit Form */}
        <div className="col-md-8">
          <div className="card p-4">
            <h3 className="mb-4">Personal Information</h3>
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="form-group row mb-3">
                <label className="col-lg-3 col-form-label">First Name:</label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="form-group row mb-3">
                <label className="col-lg-3 col-form-label">Last Name:</label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Company Name */}
              <div className="form-group row mb-3">
                <label className="col-lg-3 col-form-label">Company:</label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Position */}
              <div className="form-group row mb-3">
                <label className="col-lg-3 col-form-label">Position:</label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Contact Number */}
              <div className="form-group row mb-3">
                <label className="col-lg-3 col-form-label">Contact Number:</label>
                <div className="col-lg-9">
                  <input
                    type="text"
                    className="form-control"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="form-group row">
                <div className="col-lg-9 offset-lg-3">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default EditProfile;
