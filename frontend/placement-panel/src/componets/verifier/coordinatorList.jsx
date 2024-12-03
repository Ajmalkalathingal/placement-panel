import { useEffect, useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const CoordinatorList = () => {

    const [coordinators, setCoordinators] = useState([]);

    useEffect(() => {
        const getCoordinatorList = async () => {
            try {
            const response = await api.get('api/coordinator-list/')
            console.log(response)
            if(response && response.data){
                setCoordinators(response.data.results)
            }
            } catch (error) {
                toast.error("Failed to fetch recruiters.");
              }
        }

        getCoordinatorList()
    },[])


  // Handle delete
  const handleDelete = async (id) => {
    console.log(id)
    const confirmDelete = window.confirm("Are you sure you want to delete this recruiter?");
    if (!confirmDelete) return;

    try {
      const response = await api.delete(`api/coordinator/${id}/delete/`);
      if (response.status === 204) {
        setCoordinators((prev) => prev.filter((recruiter) => recruiter.id !== id));
        toast.success("Recruiter deleted successfully.");
      }
    } catch (error) {
      console.error("Failed to delete recruiter:", error);
      toast.error("Error deleting recruiter. Please try again.");
    }
  };

    return (
        <>
        {coordinators.length>0 ?  <div className="container mt-4">
      <h2 className="text-center mb-4">Recruiter List</h2>
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Coordinator ID</th>
              <th scope="col">Department</th>
              <th scope="col">Email</th>
              <th scope="col">Registered</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {coordinators.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.registration.coordinator_id}</td>
                <td>{item.registration.department}</td>
                <td>{item.user.email}</td>
                <td>{item.is_registered ? "Yes" : "No"}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div> : <h2 className="container text-center"> empty</h2>}
        </>
    )
}

export default CoordinatorList;