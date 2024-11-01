import React, { useEffect, useState } from 'react';
import { Badge, Image, Spinner } from 'react-bootstrap';
import api from '../../api';
import { getImageUrl } from '../../utils/utils';

const AppliedJobPost = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await api.get('/api/jobs/applied-list/');
        setApplications(response.data);
      } catch (err) {
        setError('Error fetching applied jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  console.log(applications);


  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" variant="primary" /></div>;
  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-primary mb-4 text-center">Your Applied Job Posts</h2>
      <div className="row">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div key={application.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm border-1 h-100 rounded-3">
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <Image
                      src={application.job.recruiter.company_logo || "https://via.placeholder.com/50"}
                      roundedCircle
                      width={50}
                      height={50}
                      alt={`${application.job.recruiter.company_name} logo`}
                      className="me-3 border"
                    />
                    <div>
                      <h5 className="card-title mb-1">{application.job.title}</h5>
                      <small className="text-muted">{application.job.recruiter.company_name}</small>
                    </div>
                  </div>
                  <p className="mb-1">
                    <strong>Location:</strong> {application.job.location}
                  </p>
                  <p className="mb-1">
                    <strong>Applied On:</strong> {new Date(application.applied_on).toLocaleDateString()}
                  </p>
                  <div className="mt-3">
                    <Badge
                      bg={
                        application.status === 'accepted'
                          ? 'success'
                          : application.status === 'rejected'
                          ? 'danger'
                          : application.status === 'reviewed'
                          ? 'warning'
                          : 'secondary'
                      }
                      className="p-2"
                    >
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="text-center text-muted">No applied jobs found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedJobPost;
