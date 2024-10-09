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
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType'); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                let profileUrl;

                if (userType === 'student') {
                    profileUrl = '/api/students/profile/';
                } else if (userType === 'coordinator') {
                    profileUrl = '/api/coordinators/profile/';
                } else if (userType === 'recruiter') {
                    profileUrl = '/api/recruiters/profile/';
                }

                const response = await api.get(profileUrl);
                setProfile(response.data);
            } catch (err) {
                console.error('Error fetching profile:', err); // Log the full error for debugging

                // Handle the error by checking if it's a token expiration issue
                if (err.response) {
                    if (err.response.status === 401) {
                        // If token expired, navigate to login page
                        toast.error("Session expired. Please log in again.");
                        localStorage.removeItem(ACCESS_TOKEN);
                        localStorage.removeItem(REFRESH_TOKEN);
                        navigate('/login'); // Redirect to login page
                    } else {
                        // Handle other errors based on status code or response data
                        setError(err.response.data.error || 'Something went wrong please login again');
                    }
                } else {
                    setError('Network error. Please try again later.');
                }
            }
        };

        fetchProfile();
    }, [userType, navigate]); // Include navigate in the dependency array

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!profile) {
        return <div>Loading...</div>;
    }
console.log(profile)
    return (
        <div>
            {/* <h1>Welcome {profile.user.first_name}</h1>
            <p>Profile Type: {userType}</p> */}

            {userType === 'student' && (
                <>
                    {/* <p>Email: {profile.email}</p>
                    <p>Graduation Year: {profile.graduation_year}</p> */}
                    <StudentProfile profile={profile} />
                </>
            )}

            {userType === 'coordinator' && (
                <>
                    <CoordinateorProfile/>
                </>
            )}

            {userType === 'recruiter' && (
                <>
                    <RicruterRegistrationForm/>
                </>
            )}
        </div>
    );
}

export default Profile;
