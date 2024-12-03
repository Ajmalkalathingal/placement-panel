import { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const RecruiterList = () => {
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch recruiters from API

  const getRecruiters = async () => {
    setLoading(true);
    try {
      const response = await api.get("api/recruiters/");
      setRecruiters(response.data.results);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load recruiters.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecruiters();
  }, []);

  // Handle recruiter verification
  const handleVerify = async (id, isActive) => {
    try {
      const response = await api.post(`api/recruiters/${id}/verify/`, {
        is_active: isActive,
      });

      toast.success(response.data.message);

      setRecruiters((prevRecruiters) =>
        prevRecruiters.map((rec) =>
          rec.id === id ? { ...rec, is_active: isActive } : rec
        )
      );
    } catch (error) {
      console.error("Error updating recruiter status:", error);
      toast.error("Failed to update recruiter status.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this recruiter?");
    
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await api.delete(`/api/recruiters/${id}/delete/`);
  
      if (response.status === 204) {
        setRecruiters((prev) => prev.filter((recruiter) => recruiter.id !== id));
        toast.success("Recruiter deleted successfully.");
      }
    } catch (error) {
      console.error("Failed to delete recruiter:", error);
      toast.warning("Error deleting recruiter. Please try again.");
    }
  };
  
  
  
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Recruiter List</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Logo</th>
              <th scope="col">Company Name</th>
              <th scope="col">Position</th>
              <th scope="col">Recruiter</th>
              <th scope="col">Contact</th>
              <th scope="col">Email</th>
              <th scope="col">Verify</th>
              <th scope="col">Actiion</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {recruiters.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    src={item.company_logo}
                    alt={`${item.company_name} Logo`}
                    className="img-fluid rounded"
                    style={{ maxHeight: "50px" }}
                  />
                </td>
                <td>{item.company_name}</td>
                <td>{item.position}</td>
                <td>
                  {item.user.first_name} {item.user.last_name}
                </td>
                <td>{item.contact_number}</td>
                <td>{item.user.email}</td>
                <td>{item.is_active ? "verified" : "Not verified"}</td>
                <td>
                  <button
                    className={`btn btn-sm mt-1 ${
                      item.is_active ? "btn-danger" : "btn-primary"
                    }`}
                    onClick={() => handleVerify(item.id, !item.is_active)}
                  >
                    {item.is_active ? "Reject Recruiter" : "Verify Recruiter"}
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm mt-1"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete Recruiter
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecruiterList;
