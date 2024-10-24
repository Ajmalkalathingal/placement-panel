import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import RModal from './modal';

const PostList = () => {
    const [jobs, setJobs] = useState([]);
    const [editingJob, setEditingJob] = useState(null);
    const [updatedData, setUpdatedData] = useState({}); 

    console.log(editingJob)
    console.log(updatedData)

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
                await api.delete(`/api/jobs/${id}/delete/`);
                setJobs(jobs.filter(job => job.id !== id));  // Remove deleted job from state
                alert("Job deleted successfully.");
            } catch (error) {
                console.error("Error deleting job:", error);
                alert("Failed to delete the job.");
            }
        }
    };

    const updateJob = async (id, jobData) => {
        try {
            await api.put(`/api/jobs/${id}/update/`, jobData);
            fetchJobs();  
        } catch (error) {
            console.error("Error updating job:", error);
        }
    };

    const openEditModal = (job) => {
        console.log(job)
        setEditingJob(job.id);
        setUpdatedData(job);  // Set the job data for editing
    };

    const closeModal = () => {
        setEditingJob(null);
        setUpdatedData({});  // Clear updatedData on close
    };

    return (
        <div className="container mt-3">
            <div className="row">
                {jobs.map((job) => (
                    <div className="col-md-4 mb-4" key={job.id}>
                        <div className="card text-center position-relative">
                            <div className="card-header">Job Posting</div>
                            <div className="card-body">
                                <h5 className="card-title">{job.title}</h5>
                                <p className="card-text">{job.description}</p>
                                <p className="card-text">
                                    <strong>Location:</strong> {job.location}<br />
                                    <strong>Salary:</strong> ${job.salary}<br />
                                    <strong>Job Type:</strong> {job.job_type}
                                </p>
                                
                                <button className="btn btn-primary" onClick={() => openEditModal(job)}>
                                    <FontAwesomeIcon icon={faEdit} /> Edit
                                </button>
                            </div>
                            <button className="btn btn-danger position-absolute top-0 end-0 m-2" onClick={() => deleteJob(job.id)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for Editing Job Posting */}
            {editingJob !== null && (
                <RModal
                    isOpen={editingJob !== null}
                    onClose={closeModal}
                    job={updatedData}  // Pass the job data for editing
                    onSubmit={(updatedJobData) => {
                        updateJob(editingJob, updatedJobData); // Update job with new data
                        closeModal();  // Close the modal after updating
                    }}
                />
            )}
        </div>
    );
};

export default PostList;
