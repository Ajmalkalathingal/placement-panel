import React, { useEffect, useState } from "react";
import api from "../../api";
import StudentRow from "./studentRow";
import Modal from "./modal";
import PaginationComponent from "../pagination/Pagination";
import { toast } from "react-toastify";

const StuList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');

    // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20; 

  // Open the modal and set the selected student for editing
  const handleEditClick = (student) => {
    setSelectedStudent(student); // Set the selected student for the modal
    setModalOpen(true);
  };

  // Close the modal
  const handleCloseModal = () => {
    console.log('clicked');
    setModalOpen(false);
    setSelectedStudent(null);
  };

  // Handle update student
  const handleUpdateStudent = async (updatedData) => {
    if (!selectedStudent) return; // Ensure there's a selected student
  console.log(updatedData,'updated data')
    try {
      const response = await api.put(`/api/student-list/${selectedStudent.id}/`, updatedData);
      toast.success(' stuent data updated ')
      // Update the students list
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id ? { ...student, ...response.data } : student
        )
      );

      handleCloseModal();
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };


    const fetchStudents = async (page) => {
      setLoading(true);

      try {
        const response = await api.get(`/api/student-list/?page=${page}`);
        setStudents(response.data.results);
        const totalPages = Math.ceil(response.data.count / itemsPerPage);
        setTotalPages(totalPages); // Update totalPages
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    useEffect(() => {
      fetchStudents(currentPage); // Fetch students for the current page
    }, [currentPage]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
        <Modal 
          show={isModalOpen} 
          onClose={handleCloseModal} 
          student={selectedStudent} 
          onUpdate={handleUpdateStudent} 
        />
      <div className="main-box clearfix">
      <div className="table-responsive">
      <table className="table table-hover align-middle mb-0 bg-white rounded shadow-sm">
        <thead className="bg-light">
          <tr>
            <th className="text-primary">Student Name</th>
            <th className="text-primary">Course</th>
            <th className="text-primary">Registration Number</th>
            <th className="text-primary">Status</th>
            <th className="text-primary">Duration</th>
            <th className="text-primary">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              onEdit={() => handleEditClick(student)}
            />
          ))}
        </tbody>
      </table>
    </div>

       {/* pagination here  */}
       <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} // Pass the function to handle page change
        />
      </div>
    </>
  );
};

export default StuList;
