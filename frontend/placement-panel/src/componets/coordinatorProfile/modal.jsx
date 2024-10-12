import React, { useEffect, useState } from "react";

const Modal = ({ show, onClose, student, onUpdate }) => {
  // Render nothing if the modal should not be shown
  if (!show) return null;

  const [registrationCode, setRegistrationCode] = useState('');

  useEffect(() => {
    if (student) {
      setRegistrationCode(student.registration_code || '');
    }
  }, [student]);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Call the update function passed from parent
    await onUpdate({ registration_code: registrationCode });
    
    // Close the modal after submission
    onClose();
  };

  return (
    <>
      <div id="loginModal" className="modal show" role="dialog" aria-modal="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="text-center">Update Registration Code</h1>
            </div>
            <div className="modal-body">
              <form className="form col-md-12 center-block" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input 
                    type="text" 
                    className="form-control input-lg" 
                    placeholder="Registration Code" 
                    value={registrationCode} 
                    onChange={(e) => setRegistrationCode(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg btn-block">Update</button>
                  <span className="pull-right"><a href="#">Need help?</a></span>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={onClose}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
