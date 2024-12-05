import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import Cookies from "js-cookie";
import StudentProfile from "../../componets/studentprofile";
import CoordinateorProfile from "../../componets/coordinatorProfile";
import RicruterRegistrationForm from "../../componets/ricuterprofile/Rregistrationform";
import RecruterProfile from "../../componets/ricuterprofile";
import TokenExpired from "../../componets/tokenExpire/TokenExpire";
import Verifier from "../../componets/verifier";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../constant";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const navigate = useNavigate();
  const userType = Cookies.get("user_type");

  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const refreshToken = Cookies.get(REFRESH_TOKEN);
    if (!refreshToken) {
      navigate("/login");
    }

    const fetchProfile = async () => {
      try {
        let profileUrl;

        if (userType === "student") {
          profileUrl = "/api/students/profile/";
        } else if (userType === "coordinator") {
          profileUrl = "/api/coordinators/profile/";
        } else if (userType === "recruiter") {
          profileUrl = "/api/recruiters/profile/";
        } else if (userType === "verifier") {
          profileUrl = "/api/verifier/profile/";
        }

        const response = await api.get(profileUrl);
        setProfile(response.data);
      } catch (err) {
        const status = err.response?.status;

        if (status === 404 && userType === "recruiter") {
          // Profile not found for recruiter, show registration form
          setIsRecruiter(true);
        } else if (status === 401 || status === 403) {
          Cookies.remove(ACCESS_TOKEN);
          Cookies.remove(REFRESH_TOKEN);
          setTokenExpired(true);
          // navigate('/login');
        } else {
          // Other errors, log error message or setError for display
          console.error("Error fetching profile:", err);
          setError("An unexpected error occurred. Please try again later.");
        }
      }
    };

    fetchProfile();
  }, [userType, navigate]);

  const handleRecruiterRegistration = async (formData) => {
    try {
      const response = await api.post("/api/recruiter/register/", formData);
      setProfile(response.data);
      setIsRecruiter(false);
      toast.success("Recruiter profile created successfully.");
    } catch (err) {
      console.error("Error registering recruiter:", err);
      toast.error("Failed to register recruiter. Please try again.");
    }
  };

  if (tokenExpired) {
    return <TokenExpired />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!profile && !isRecruiter) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {userType === "student" && <StudentProfile profile={profile} />}
      {userType === "coordinator" && <CoordinateorProfile profile={profile} />}
      {userType === "recruiter" && (
        <>
          {isRecruiter ? (
            <RicruterRegistrationForm onSubmit={handleRecruiterRegistration} />
          ) : (
            <RecruterProfile profile={profile} />
          )}
        </>
      )}
      {userType === "verifier" && <Verifier profile={profile} />}
    </div>
  );
}

export default Profile;
