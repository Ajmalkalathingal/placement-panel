import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";

const EditProfile = ({profile}) => {

    const [img, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [firstName, setFirstName] = useState(profile.user.first_name);
    const [lastName, setLastName] = useState(profile.user.last_name);

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);  
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);  
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
  
        const formData = new FormData();

        if (img) {
          formData.append("img", img);
        }
        if (resume) {
          formData.append("resume", resume);;
        }
    
        
        formData.append("user.first_name", firstName);
        formData.append("user.last_name", lastName);
  
        try {
            const response = await api.update(`/api/student-profile/${profile.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
  
            console.log('Profile updated successfully');
            toast.success('Profile updated successfully')
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return <>
                <div className='container'>
              <h2 className="post mt-2" style={{color:' #0072ff'}}>Edit Profile</h2>
              <form className='mt-3' onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="profileImage">Profile Image</label>
                  <input type="file" className="form-control" id="profileImage" onChange={handleProfileImageChange} accept="image/*" />
                </div>
                <div className="form-group">
                  <label htmlFor="resume">Resume</label>
                  <input type="file" className="form-control" id="resume" onChange={handleResumeChange} accept=".pdf,.doc,.docx" />
                </div>
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Profile</button>
              </form>
            </div>
            </>
}

export default EditProfile