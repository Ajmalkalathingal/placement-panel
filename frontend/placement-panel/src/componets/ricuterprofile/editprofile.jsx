import React, { useState } from 'react';
import api from '../../api';
import { getImageUrl } from '../../utils/utils';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ profile,handleSectionChange,setProfile }) => {
  const navigate = useNavigate();

    const [formData, setFormData] = useState({
    firstName: profile.user.first_name || '',
    lastName: profile.user.last_name || '',
    email: profile.user.email || '',
    companyName: profile.company_name || '',
    position: profile.position || '',
    contactNumber: profile.contact_number || '',
    company_logo: profile.company_logo || null, 
  });

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
    <>
      <h1 className="text-primary">Edit Profile</h1>
      <hr />
      <div className="row">
        {/* left column */}
        <div className="col-md-4">
          <div className="text-center">
            <img
              src={null || 'https://bootdey.com/img/Content/avatar/avatar7.png'}
              className="avatar img-circle img-thumbnail"
              alt="avatar"
            />
            <h6>Upload a different logo...</h6>
            <input type="file" className="form-control" onChange={handleFileChange} />
          </div>
        </div>

        {/* edit form column */}
        <div className="col-md-8 personal-info">
          <h3>Personal info</h3>

          <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="form-group">
              <label className="col-lg-3 control-label">First name:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Last Name */}
            <div className="form-group">
              <label className="col-lg-3 control-label">Last name:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Company Name */}
            <div className="form-group">
              <label className="col-lg-3 control-label">Company:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Position */}
            <div className="form-group">
              <label className="col-lg-3 control-label">Position:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Contact Number */}
            <div className="form-group">
              <label className="col-lg-3 control-label">Contact Number:</label>
              <div className="col-lg-8">
                <input
                  className="form-control"
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="form-group">
              <div className="col-lg-8 col-lg-offset-3">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <hr />
    </>
  );
};

export default EditProfile;
