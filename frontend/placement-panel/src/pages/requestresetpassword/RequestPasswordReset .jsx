import React, { useState } from 'react';
import api from '../../api';

const RequestPasswordReset = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        try {
            await api.post('/api/password-reset-request/', { email });
            setMessage('Password reset link sent! Please check your email.');
        } catch (error) {
            setMessage('Failed to send password reset link. Please try again.');
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <div className="card shadow-sm" style={{ width: '100%', maxWidth: '450px' }}>
                <div className="card-body">
                    <h2 className="text-center text-primary mb-4">
                        Reset Your Password
                    </h2>
                    <strong className="text-center text-muted mb-4">
                        Enter your email to receive a password reset link.
                    </strong>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input
                                type="email"
                                id="email"
                                className="form-control p-2"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mb-3"
                            disabled={loading}
                        >
                            {loading ? (
                                <span>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Sending...
                                </span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                        {message && (
                            <div className={`alert ${message.includes('sent') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RequestPasswordReset;
