import React, { useEffect, useState } from "react";

const Modal = ({ show, onClose, student, onUpdate }) => {
  if (!show) return;

  const [name, setName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [course, setCourse] = useState('');
  const [duration, setDuration] = useState('');
  const [startingDate, setStartingDate] = useState('');
  const [endingDate, setEndingDate] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    if (student) {
      setName(student.name || '');
      setRegistrationNumber(student.registration_number || '');
      setCourse(student.course || '');
      setDuration(student.duration || '');
      setStartingDate(student.starting_date || '');
      setEndingDate(student.ending_date || '');
    }
  }, [student]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare the updated student data
    const updatedData = {
        id: student.id,
        name: name.trim(),
        registration_number: registrationNumber.trim(),
        course: course.trim(),
        duration: duration.trim(),
        starting_date: startingDate,
        ending_date: endingDate,
    };

    // Call the update function passed from parent
    await onUpdate(updatedData);
    // Close the modal after submission
    onClose();
  };

  return (
    <>
      <div id="loginModal" className="modal show" role="dialog" aria-modal="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="text-center">Update Student Information</h1>
            </div>
            <div className="modal-body">
              <form className="form col-md-12 center-block" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control input-lg" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control input-lg" 
                    placeholder="Registration Number" 
                    value={registrationNumber} 
                    onChange={(e) => setRegistrationNumber(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control input-lg" 
                    placeholder="Course" 
                    value={course} 
                    onChange={(e) => setCourse(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control input-lg" 
                    placeholder="Duration" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="date" 
                    className="form-control input-lg" 
                    value={startingDate} 
                    onChange={(e) => setStartingDate(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="date" 
                    className="form-control input-lg" 
                    value={endingDate} 
                    onChange={(e) => setEndingDate(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Update</button>
                </div>
                <div className="modal-footer">
              <button className="btn" onClick={onClose}>Cancel</button>
            </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
