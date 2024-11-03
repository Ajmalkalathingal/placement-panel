import React, { useEffect, useState } from 'react';
import { Badge, Image, Spinner, Pagination } from 'react-bootstrap';
import api from '../../api';
import "./student.css";


const AppliedJobPost = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  const fetchApplications = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/jobs/applied-list/?page=${page}`);
      setApplications(response.data.results);
      setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      setError(null);
    } catch (err) {
      setError('Error fetching applied jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(currentPage);
  }, [currentPage]);

  useEffect(() => {
    // Trigger animation by adding 'show' class after data loads
    if (!loading) {
      const cards = document.querySelectorAll('.card');
      cards.forEach((card, index) => {
        setTimeout(() => card.classList.add('show'), index * 100);
      });
    }
  }, [applications, loading]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      fetchApplications(page);
    }
  };

  const visiblePages = 5;
  const pageNumbers = [];
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, currentPage + Math.floor(visiblePages / 2));

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

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
                      <h5 className="card-title mb-1">{application.job.recruiter.company_name}</h5>
                      <small className="text-muted">{application.job.title}</small>
                    </div>
                  </div>
                  <p className="mb-1">
                    <strong>Job role:</strong> {application.job.title}
                  </p>
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

      {/* Pagination */}
      <Pagination className="justify-content-center mt-4">
        {currentPage > 1 && (
          <>
            <Pagination.First onClick={() => handlePageChange(1)} />
            <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
          </>
        )}
        
        {pageNumbers.map((page) => (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Pagination.Item>
        ))}

        {currentPage < totalPages && (
          <>
            <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
            <Pagination.Last onClick={() => handlePageChange(totalPages)} />
          </>
        )}
      </Pagination>
    </div>
  );
};

export default AppliedJobPost;
