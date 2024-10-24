import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../api"; 
import Cookies from 'js-cookie';
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../../constant";
import StudentProfile from "../../componets/studentprofile";
import CoordinateorProfile from "../../componets/coordinatorProfile";
import RicruterRegistrationForm from "../../componets/ricuterprofile/Rregistrationform";
import RecruterProfile from "../../componets/ricuterprofile";
import { setTokenCookies } from "../../utils/cookies";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState(null);
    const [isRecruiter, setIsRecruiter] = useState(false);
    const navigate = useNavigate();
    const userType = Cookies.get('user_type'); 

   

    useEffect(() => {
        if (!userType) {
            navigate('/login');
            return;
        }

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
                console.error('Error fetching profile:', err);
                Cookies.remove(ACCESS_TOKEN)
                Cookies.remove(REFRESH_TOKEN)
                navigate('/login')
            }
        };

        fetchProfile();
    }, [userType, navigate]);

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

    return (
        <div>
            {userType === 'student' && <StudentProfile profile={profile} />}
            {userType === 'coordinator' && <CoordinateorProfile profile={profile} />}
            {userType === 'recruiter' && (
                <>
                    {isRecruiter ? (
                        <RicruterRegistrationForm onSubmit={handleRecruiterRegistration} />
                    ) : (
                        <RecruterProfile profile={profile}/>
                    )}
                </>
            )}
        </div>
    );
}

export default Profile;
