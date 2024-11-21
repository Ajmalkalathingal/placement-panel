import React, { useEffect, useState } from "react";

const Modal = ({ show, onClose, student, onUpdate }) => {
  const [name, setName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");

  useEffect(() => {
    if (student) {
      setName(student.name || "");
      setRegistrationNumber(student.registration_number || "");
      setCourse(student.course || "");
      setDuration(student.duration || "");
      setStartingDate(student.starting_date || "");
      setEndingDate(student.ending_date || "");
    }
  }, [student]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      ...student,
      name: name.trim(),
      registration_number: registrationNumber.trim(),
      course: course.trim(),
      duration: duration.trim(),
      starting_date: startingDate,
      ending_date: endingDate,
    };
    onUpdate(updatedData);
  };

  if (!show) return null;

  return (
    <div
      className="modal show"
      role="dialog"
      aria-modal="true"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title">Update Student Information</h1>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Registration Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={registrationNumber}
                  onChange={(e) => setRegistrationNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Course</label>
                <input
                  type="text"
                  className="form-control"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Duration</label>
                <input
                  type="text"
                  className="form-control"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Starting Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={startingDate}
                  onChange={(e) => setStartingDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Ending Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={endingDate}
                  onChange={(e) => setEndingDate(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-between mt-3">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
