import React, { useEffect, useState } from 'react';
import "./student.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import { getImageUrl } from '../../utils/utils';


const StudentProfile = ({ profile }) => {
  const [activeSection, setActiveSection] = useState('profile');
    const [img, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [firstName, setFirstName] = useState(profile.user.first_name);
    const [lastName, setLastName] = useState(profile.user.last_name);
    const [profiles, setProfile] = useState(profile);

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
  
            console.log('Profile updated successfully', response.data);
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

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    setProfile(profile);
}, [profile]);


   const imageUrl = getImageUrl(profiles.img);
  return (
    <div className=" mr-4 bootstrap snippets bootdey">
      <div className=" row">
      <div className=" profile-nav col-md-2">
        <div className=" container panel">
          <div className="user-heading round">
            <a href="#">
              <img style={{ borderColor: '#ffff', borderWidth: '5px', borderStyle: 'solid' }} src={imageUrl || "https://bootdey.com/img/Content/avatar/avatar3.png"} />
            </a>
            <h1>{profiles.user.first_name} {profiles.user.last_name}</h1>
            <p>{profiles.user.email}</p>
          </div>

          <ul className="p-1 mt-2 ml-3 space text" style={{ listStyle: 'none' }}>
            <li className={activeSection === 'profile' ? 'active' : ''}>
              <a href="#" onClick={() => handleSectionChange('profile')}>
                <FontAwesomeIcon icon={faUser} /> Profile
              </a>
            </li>
            <li className={activeSection === 'recentActivity' ? 'active' : ''}>
              <a href="#" onClick={() => handleSectionChange('recentActivity')}>
                <FontAwesomeIcon icon={faCalendar} /> Recent Activity
              </a>
            </li>
            <li className={activeSection === 'updateProfile' ? 'active' : ''}>
              <a href="#" onClick={() => handleSectionChange('updateProfile')}>
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </a>
            </li>
          </ul>
        </div>
        </div>

        <div className="profile-info col-md-10">
          <div className="panel">
            <div className="bio-graph-heading">
              Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum.
            </div>

            {/* Render different sections based on activeSection */}
            {activeSection === 'profile' && (
              <>
                {/* Profile Details */}
                <div className="panel-body bio-graph-info mt-3 rounded-3 border shadow-lg">
                  <h1>Bio Graph</h1>
                  <div className="row">
                    <div className="bio-row">
                      <p><span>First Name </span>: {profiles.user.first_name}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Last Name </span>: {profiles.user.last_name}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Email </span>: {profiles.user.email}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Registration </span>: {profiles.registration.student_id}</p>
                    </div>
                    <div className="bio-row">
                    <p>
                      <span>Registration:</span>
                      {profiles.resume ? (
                        <a href={profiles.resume} target="_blank" rel="noopener noreferrer">
                          Download Resume
                        </a>
                      ) : (
                        <span> No resume available</span>
                      )}
                    </p>
                  </div>
                  </div>
                </div>

                {/* Recent Posts Section */}
                <div className="panel-body mt-4">
                  <h2>Recent Posts</h2>
                  <div className="row">
                    {profiles.recentPosts && profiles.recentPosts.length > 0 ? (
                      profiles.recentPosts.map((post, index) => (
                        <div className="col-md-6" key={index}>
                          <div className="panel">
                            <div className="panel-body">
                              <div className="bio-desk">
                                <h4 className="red">{post.title}</h4>
                                <p>Started: {post.startDate}</p>
                                <p>Deadline: {post.deadline}</p>
                                <p>{post.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No recent posts available.</p>
                    )}
                  </div>
                <div class="container">
                <div class="text-center mb-5">
                  <h3>Jobs openning</h3>
                  <p class="lead">Eros ante urna tortor aliquam nisl magnis quisque hac</p>
                </div>
                <div class="card mb-3">
                  <div class="card-body">
                    <div class="d-flex flex-column flex-lg-row">
                      <span class="avatar avatar-text rounded-3 me-4 bg-info mb-2">PM</span>
                      <div class="row flex-fill">
                        <div class="col-sm-5">
                          <h4 class="h5">Director of Product Marketing</h4>
                          <span class="badge bg-secondary">WORLDWIDE</span> <span class="badge bg-success">$150K - $210K</span>
                        </div>
                        <div class="col-sm-4 py-2">
                          <span class="badge bg-secondary">PRODUCT MARKETING</span>
                          <span class="badge bg-secondary">MARKETING</span>
                          <span class="badge bg-secondary">EXECUTIVE</span>
                          <span class="badge bg-secondary">ECOMMERCE</span>
                        </div>
                        <div class="col-sm-3 text-lg-end">
                          <a href="#" class="btn btn-primary stretched-link">Apply</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              </>
            )}

            {/* Recent Activity Section */}
            {activeSection === 'recentActivity' && (
              <div>
                <h2 className="post mt-2">Recent Activity</h2>
                <div className="row mt-3">
                  {profiles.recentPosts && profiles.recentPosts.length > 0 ? (
                    profiles.recentPosts.map((post, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="panel">
                          <div className="panel-body">
                            <div className="bio-desk">
                              <h4 className="red">{post.title}</h4>
                              <p>Started: {post.startDate}</p>
                              <p>Deadline: {post.deadline}</p>
                              <p>{post.description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent posts available.</p>
                  )}
                </div>
              </div>
            )}

            {/* Update Profile Section */}
            {activeSection === 'updateProfile' && (
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
                )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;






