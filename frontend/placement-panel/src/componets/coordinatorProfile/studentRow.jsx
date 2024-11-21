import  Modal  from "./modal";


const StudentRow = ({ student,onEdit }) => {

  return (
    <>
     <tr>
      <td>
        <p className="fw-bold text-dark mb-1">{student.name}</p>
      </td>
      <td>
        <p className="fw-bold text-dark mb-1">{student.course}</p>
      </td>
      <td>
        <p className="mb-1">{student.registration_number || "N/A"}</p>
      </td>
      <td>
        <span
          className={`badge ${student.is_registered ? "bg-success" : "bg-warning"} rounded-pill`}
          title={student.is_registered ? "Student is registered" : "Student is not registered"}
        >
          {student.is_registered ? "Registered" : "Not Registered"}
        </span>
      </td>
      <td>
        <p className="mb-1">{student.starting_date}</p>
        <small className="text-muted">{student.ending_date}</small>
      </td>
      <td>
        <button
          type="button"
          className="btn btn-outline-primary btn-sm"
          onClick={onEdit}
          title="Edit student information"
        >
          Edit
        </button>
      </td>
    </tr>
    </>
    
  );
};

export default StudentRow;
