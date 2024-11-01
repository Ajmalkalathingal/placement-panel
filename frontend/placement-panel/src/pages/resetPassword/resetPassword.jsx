import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../api'; 
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
            setMessageType('danger');
            return;
        }

        setLoading(true); // Start loading
        try {
            await api.post(`/api/reset-password/${token}/`, {
                email,         
                new_password: password,
                token   
            });
            setMessage('Password reset successful! You can now log in.');
            setMessageType('success');
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error('Error during password reset:', error);
            const errorMsg = error.response?.data?.detail || 'Failed to reset password. Please try again.';
            setMessage(errorMsg);
            setMessageType('danger');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="col-md-8 col-lg-6"> {/* Increased width */}
                <div className="card shadow-sm">
                    <div className="card-body p-5"> {/* Added padding */}
                        <h3 className="text-center text-primary mb-4">Reset Password</h3>
                        {message && (
                            <div className={`alert alert-${messageType} text-center`} role="alert">
                                {message}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="form-group mb-3">
                                {/* <label htmlFor="email">Email</label> */}
                                <input 
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                {/* <label htmlFor="password">New Password</label> */}
                                <input 
                                    type="password"
                                    className="form-control"
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group mb-3">
                                {/* <label htmlFor="confirmPassword">Confirm Password</label> */}
                                <input 
                                    type="password"
                                    className="form-control"
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-primary w-100" 
                                disabled={loading}
                            >
                                {loading ? (
                                    <span>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Resetting...
                                    </span>
                                ) : (
                                    "Reset Password"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
