import React, { useEffect, useState } from 'react';
import api from '../../api';


const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of jobs from the API
    const fetchJobs = async () => {
      try {
        const response = await api.get('/api/jobs/'); 
        console.log(response.data)
        setJobs(response.data); 
      } catch (err) {
        setError('Failed to fetch jobs');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {jobs.map((job) => (
          <div className="card-body">
            <div className="d-flex flex-column flex-lg-row">
              <span className="avatar avatar-text rounded-3 me-4 mb-2">{job.title[0]}</span>
              <div className="row flex-fill">
                <div className="col-sm-5">
                  <h4 className="h5">{job.title}</h4>
                  <span className="badge bg-secondary">{job.location}</span>{" "}
                  <span className="badge bg-success">${job.salary}</span>
                </div>
                <div className="col-sm-4 py-2">
                  <span className="badge bg-secondary">{job.requirements}</span>
                </div>
                <div className="col-sm-3 text-lg-end">
                  <a href="#" className="btn btn-primary stretched-link">
                    Apply
                  </a>
                </div>
              </div>
            </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;
