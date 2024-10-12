import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../api"; 
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../constant";
import StudentProfile from "../../componets/studentprofile";
import CoordinateorProfile from "../../componets/coordinatorProfile";
import RicruterRegistrationForm from "../../componets/ricuterprofile/Rregistrationform";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isRecruiter, setIsRecruiter] = useState(false);  // New state to check if recruiter profile exists
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType'); 

    useEffect(() => {
        if (!userType){
            return navigate('/login');
        }

        const fetchProfile = async () => {
            try {
                let profileUrl;

                if (userType === 'student') {
                    profileUrl = '/api/students/profile/';
                } else if (userType === 'coordinator') {
                    profileUrl = '/api/coordinators/profile/';
                } else if (userType === 'recruiter') {
                    profileUrl = '/api/recruiters/profile/';  // Changed to check if recruiter profile exists
                }

                const response = await api.get(profileUrl);
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err);

                if (err.response) {
                    if (err.response.status === 401) {
                        toast.error("Session expired. Please log in again.");
                        localStorage.removeItem(ACCESS_TOKEN);
                        localStorage.removeItem(REFRESH_TOKEN);
                        navigate('/login');
                    } else if (userType === 'recruiter' && err.response.status === 404) {
                        // If recruiter profile does not exist (404), show registration form
                        setIsRecruiter(true);
                    } else {
                        setError(err.response.data.error || 'Something went wrong, please try again.');
                    }
                } else {
                    setError('Network error. Please try again later.');
                }
            }
        };

        fetchProfile();
    }, [userType, navigate]);

    // Handle recruiter registration form submission
    const handleRecruiterRegistration = async (formData) => {
        try {
            const response = await api.post('/api/recruiter/register/', formData);
            setProfile(response.data);
            setIsRecruiter(false);
            toast.success("Recruiter profile created successfully.");
        } catch (err) {
            console.error('Error registering recruiter:', err);
            toast.error("Failed to register recruiter. Please try again.");
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile && !isRecruiter) {
        return <div>Loading...</div>;
    }
    console.log(profile)
    return (
        <div>
            {userType === 'student' && (
                <StudentProfile profile={profile} />
            )}

            {userType === 'coordinator' && (
                <CoordinateorProfile profile={profile} />
            )}

            {userType === 'recruiter' && (
                <>
                    {isRecruiter ? (
                        <RicruterRegistrationForm onSubmit={handleRecruiterRegistration} />
                    ) : (
                        <div>
                            {/* Display recruiter profile once it's created */}
                            <h1>Welcome, Recruiter {profile.user.first_name}</h1>
                            <p>Email: {profile.user.email}</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
