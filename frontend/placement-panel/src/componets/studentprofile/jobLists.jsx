import React, { useEffect, useState } from 'react';
import api from '../../api';
import { toast } from 'react-toastify';

const JobList = ({profile}) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loadingJobId, setLoadingJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs-lists/');
        setJobs(response.data.results);
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {

    if (!profile.resume) {
      window.alert("Please upload your resume to apply for jobs.");
      return;
    }
    setLoadingJobId(jobId);
    try {
      await api.post(`/api/jobs/${jobId}/apply/`);
      setAppliedJobs((prevAppliedJobs) => [...prevAppliedJobs, jobId]);
      toast.success("Application successful!");
    } catch (err) {
      toast.warning("You have already applied for this job.");
    } finally {
      setLoadingJobId(null); 
    }
  };

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="text-center mb-5">
        <h3>Job Openings</h3>
        <p className="lead">Explore our latest job listings</p>
      </div>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <div className="card mb-3" key={job.id}>
            <div className="card-body">
              <div className="d-flex flex-column flex-lg-row">
                <span className="avatar avatar-text rounded-3 me-4 bg-info mb-2">
                  {job.title.charAt(0)}
                </span>
                <div className="row flex-fill">
                  <div className="col-sm-5">
                    <h4 className="h5">{job.title}</h4>
                    <span className="badge bg-secondary m-2">Location: {job.location}</span>
                    <span className="badge bg-success">Salary: {job.salary}</span><br />
                    <div className="mt-2">
                      <p>requirements</p>
                      {job.requirements.split(",").map((requirement, index) => (
                        <span key={index} className="badge bg-warning m-1">
                          {requirement.trim()}
                        </span>
                      ))}
                    </div>
                    <strong><u>Description</u></strong>
                    <p>{job.description}</p>
                  </div>
                  <div className="col-sm-4 py-2">
                    <span className="badge bg-secondary">Job Type: {job.job_type}</span>
                  </div>
                  <div className="col-sm-3 text-lg-end">
                    <button 
                      onClick={() => applyForJob(job.id)} 
                      className="btn btn-primary stretched-link"
                      disabled={appliedJobs.includes(job.id) || loadingJobId === job.id} 
                    >
                      {loadingJobId === job.id ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        appliedJobs.includes(job.id) ? "Applied" : "Apply"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="col-12">
        <p className="text-center ">No jobs list found.</p>
      </div>
      )}
    </div>
  );
};

export default JobList;
