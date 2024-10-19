import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';

const PostList = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null); 
    const [updatedData, setUpdatedData] = useState({}); 

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/api/jobs/');
            setJobs(response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Delete Job Function
    const deleteJob = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (confirmDelete) {
            try {
                await axios.delete(`/api/jobs/${id}/delete/`);
                setJobs(jobs.filter(job => job.id !== id));  // Remove deleted job from state
                alert("Job deleted successfully.");
            } catch (error) {
                console.error("Error deleting job:", error);
                alert("Failed to delete the job.");
            }
        }
    };

    const updateJob = async (id) => {
        try {
            await api.put(`/api/jobs/${id}/update/`, updatedData);
            setEditingJob(null); 
            fetchJobs();  
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    // Handle form changes for editing a job
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData({
            ...updatedData,
            [name]: value,
        });
    };

    return (
        <div className="container mt-3">
            <div className="row">
                {jobs.map((job, index) => (
                    <div className="col-md-6 mb-4" key={index}>
                        <div className="card text-center position-relative">
                            <div className="card-header">Job Posting</div>
                            <div className="card-body">
                                {editingJob === job.id ? (
                                    // Editing Form
                                    <div>
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={job.title}
                                            onChange={handleInputChange}
                                        />
                                        <textarea
                                            name="description"
                                            defaultValue={job.description}
                                            onChange={handleInputChange}
                                        />
                                        <button className="btn btn-success" onClick={() => updateJob(job.id)}>
                                            Save
                                        </button>
                                    </div>
                                ) : (
                                    // Job Details
                                    <>
                                        <h5 className="card-title">{job.title}</h5>
                                        <p className="card-text">{job.description}</p>
                                        <p className="card-text">
                                            <strong>Location:</strong> {job.location}<br />
                                            <strong>Salary:</strong> ${job.salary}<br />
                                            <strong>Job Type:</strong> {job.job_type}
                                        </p>
                                    </>
                                )}
                                
                                {!editingJob && (
                                    <a href="#" className="btn btn-primary" onClick={() => setEditingJob(job.id)}>
                                        <FontAwesomeIcon icon={faEdit} /> Edit
                                    </a>
                                )}
                            </div>
                            <button className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={() => deleteJob(job.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;
