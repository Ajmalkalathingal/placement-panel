import React, { useEffect, useState } from 'react';
import "./student.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getImageUrl } from '../../utils/utils';
import EditProfile from './EditProfile';
import JobList from './jobLists';
import AppliedJobPost from './appliedjobpost';
import { getMenuItems } from '../../utils/menuItems';
import InterviewDetails from './JobApplicaton';


const StudentProfile = ({ profile }) => {
  const menuItems = getMenuItems('Student');
  const [activeSection, setActiveSection] = useState(menuItems[0].section);
  const [profiles, setProfile] = useState(profile);
  const [imageUrl, setImageUrl] = useState(`${getImageUrl(profile.img)}?${Date.now()}`);


  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };
  
  const updateProfile = (updatedProfile) => {
    // Generate a new URL with a timestamp to bypass caching
    const newImageUrl = `${(updatedProfile.img)}?${Date.now()}`;
    setProfile(updatedProfile);
    setImageUrl(newImageUrl); 
  };

  useEffect(() => {}, [profile]);
  
  return (
    <div className="bootstrap snippets bootdey">
      <div className=" row">
      <div className=" profile-nav col-md-2">
        <div className="  panel" style={{marginLeft:'20px'}}>
          <div className="user-heading round">
            <a href="#">
              <img style={{ borderColor: '#ffff', borderWidth: '5px', borderStyle: 'solid' }} src={imageUrl || "https://bootdey.com/img/Content/avatar/avatar3.png"} />
            </a>
            <h1>{profiles.user.first_name} </h1>
          </div>
          <ul className="p-1 mt-2 ml-3 space text" style={{ listStyle: 'none' }}>
          {menuItems.map((item) => (
                <li key={item.section} className={activeSection === item.section ? 'active' : ''}>
                    <a href="#" onClick={() => handleSectionChange(item.section)}>
                        <FontAwesomeIcon icon={item.icon} /> {item.label}   
                    </a>
                </li>
            ))}
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
                      <p><span>Registration </span>: {profiles.registration.registration_number}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Course </span>: {profiles.registration.course}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Starting Date </span>: {profiles.registration.starting_date}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Eding Date </span>: {profiles.registration.ending_date}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Duration </span>: {profiles.registration.duration}</p>
                    </div>
                    <div className="bio-row">
                    <p>
                      <span>Rsume:</span>
                      {profiles.resume ? (
                        <a href={`http://127.0.0.1:8000/${profiles.resume}`} target="_blank" rel="noopener noreferrer">
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
                <div className="panel-body mt-5">
                  <JobList profile={profiles}/>
                </div>
              </>
            )}

            {/* Recent Activity Section */}
            {activeSection === 'appliedJobs' &&  (<AppliedJobPost  />) }


            {/* Update Profile Section */}
            {activeSection === 'updateProfile' && <EditProfile updateProfile={updateProfile} profile={profile} />}
            {activeSection === 'JobApplicaton' && <InterviewDetails />}

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;






