import React, { useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const PlacementEventForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    is_active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('api/placement-events/',formData);
      console.log(response)

      if (response.status === 201) {
        // Handle success (e.g., show a success message or redirect)
        toast.success('Placement Event created successfully!');
      } else {
        // Handle error
        alert('Failed to create placement event');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header">
          <h2>Create Placement Event</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="event_date">Event Date</label>
              <input
                type="datetime-local"
                id="event_date"
                name="event_date"
                className="form-control"
                value={formData.event_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-check">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                className="form-check-input"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="is_active">
                Is Active
              </label>
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlacementEventForm;