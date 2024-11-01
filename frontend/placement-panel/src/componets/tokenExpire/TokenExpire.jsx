// TokenExpired.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../constant';
import Cookies from 'js-cookie';

const TokenExpired = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    Cookies.remove(ACCESS_TOKEN);
    Cookies.remove(REFRESH_TOKEN);
    navigate('/login');
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title">Session Expired</h5>
          </div>
          <div className="modal-body">
            <p>Your session has expired. Please log in again to continue.</p>
          </div>
          <div className="modal-footer">
            <button onClick={handleLoginRedirect} className="btn btn-primary">
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenExpired;
