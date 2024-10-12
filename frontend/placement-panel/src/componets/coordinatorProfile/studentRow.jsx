import { Modal } from "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useState } from "react";

const StudentRow = ({ student,onEdit  }) => {

  return (
    <>
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src="https://bootdey.com/img/Content/avatar/avatar1.png" // Use a placeholder or actual image
            alt="Student Avatar"
            style={{ width: "45px", height: "45px" }}
            className="rounded-circle"
          />
          <div className="ms-3">
            <p className="fw-bold mb-1">{student.student_id}</p>
            <p className="text-muted mb-0">{student.email}</p>
          </div>
        </div>
      </td>
      <td>
        <p className="fw-normal mb-1">
          {student.registration_code || "N/A"}
        </p>
      </td>
      <td>
        <span
          className={`badge ${student.is_registered ? "bg-success" : "bg-warning"} rounded-pill d-inline`}
        >
          {student.is_registered ? "Registered" : "Not Registered"}
        </span>
      </td>
      <td>{student.email}</td>
      <td>
      <button
          type="button"
          className="btn btn-link btn-sm btn-rounded"
          onClick={onEdit}
        >
          Edit
        </button>
      </td>
    </tr>
    {/* <Modal show={isModalOpen} onClose={handleCloseModal} /> */}
    </>
    
  );
};

export default StudentRow;
