import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearchPlus,
  faPencil,
  faTrashAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import api from "../../api";
import StudentRow from "./studentRow";
import Modal from "./modal";

const StuList = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');

  // Open the modal and set the selected student for editing
  const handleEditClick = (student) => {
    setSelectedStudent(student); // Set the selected student for the modal
    setModalOpen(true);
  };
  console.log(selectedStudent,'selected')

  // Close the modal
  const handleCloseModal = () => {
    console.log('clicked');
    setModalOpen(false);
    setSelectedStudent(null);
  };

  // Handle update student
  const handleUpdateStudent = async (updatedData) => {
    if (!selectedStudent) return; // Ensure there's a selected student
  
    try {
      const response = await api.put(`/api/student-list/${selectedStudent.id}/`, updatedData);
      // Update the students list
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === selectedStudent.id ? { ...student, ...response.data } : student
        )
      );
      console.log(response.data);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update student:", error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);

      try {
        const response = await api.get("/api/student-list/");
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); 
      }
    };

    fetchStudents();
  }, []);


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
          <table className="table align-middle mb-0 bg-white">
            <thead className="bg-light">
              <tr>
                <th>Name</th>
                <th>Registration Code</th>
                <th>Status</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <StudentRow key={student.id} student={student} onEdit={() => handleEditClick(student)} />
              ))}
            </tbody>
          </table>
        </div>

        <ul className="pagination pull-right">
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faChevronLeft} />
            </a>
          </li>
          <li>
            <a href="#">1</a>
          </li>
          <li>
            <a href="#">2</a>
          </li>
          <li>
            <a href="#">3</a>
          </li>
          <li>
            <a href="#">4</a>
          </li>
          <li>
            <a href="#">5</a>
          </li>
          <li>
            <a href="#">
              <FontAwesomeIcon icon={faChevronRight} />
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default StuList;
