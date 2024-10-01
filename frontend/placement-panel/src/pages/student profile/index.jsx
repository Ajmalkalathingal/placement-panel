
import { toast } from "react-toastify";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api"; // Adjust the import based on your project structure

function StudentProfile() {
  // const { id } = useParams(); // Extract the ID from the URL
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await api.get(`/api/students/profile/`);
        setStudent(response.data); 
        console.log(student)
      } catch (error) {
        console.error("Error fetching student profile:", error);
        setError("Profile not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, []); // This will re-fetch the profile whenever the `id` changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  console.log(student)

  return (
    <div>
      <h1>Student Profile</h1>
      {student ? (
        <div>
          <p>Name: {student.user.first_name}</p>
          <p>Email: {student.user.email}</p>
          <p>Student ID: {student.id}</p>
        </div>
      ) : (
        <p>Profile not found.</p>
      )}
    </div>
  );
}

export default StudentProfile;
