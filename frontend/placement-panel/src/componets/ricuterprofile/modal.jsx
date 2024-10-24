import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const RModal = ({ isOpen, onClose, job, onSubmit }) => {
    const [formData, setFormData] = useState(job);

    // Update formData when job prop changes
    useEffect(() => {
        setFormData(job);
    }, [job]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Job Posting</h5>
                        <button type="button" className="close" onClick={onClose}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Job Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Job Description</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-control"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    className="form-control"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    className="form-control"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="job_type">Job Type</label>
                                <select
                                    id="job_type"
                                    name="job_type"
                                    className="form-control"
                                    value={formData.job_type}
                                    onChange={handleChange}
                                >
                                    <option value="full_time">Full Time</option>
                                    <option value="part_time">Part Time</option>
                                    <option value="contract">Contract</option>
                                    <option value="internship">Internship</option>
                                </select>
                            </div>

                            <button type="button" className="btn btn-success" onClick={handleSubmit}>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RModal;
