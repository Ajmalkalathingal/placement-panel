import React, { useEffect, useState } from 'react';
import "./student.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import api from '../../api';
import { getImageUrl } from '../../utils/utils';
import EditProfile from './EditProfile';
import JobList from './jobLists';
import AppliedJobPost from './appliedjobpost';


const StudentProfile = ({ profile }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [profiles, setProfile] = useState(profile);


  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  useEffect(() => {
    setProfile(profile);
}, [profile]);


   const imageUrl = getImageUrl(profiles.img);
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
            <p>{profiles.user.email}</p>
          </div>

          <ul className="p-1 mt-2 ml-3 space text" style={{ listStyle: 'none' }}>
            <li className={activeSection === 'profile' ? 'active' : ''}>
              <a href="#" onClick={() => handleSectionChange('profile')}>
                <FontAwesomeIcon icon={faUser} /> Profile
              </a>
            </li>
            <li className={activeSection === 'Applied Jobs' ? 'active' : ''}>
              <a href="#" onClick={() => handleSectionChange('Applied Jobs')}>
                <FontAwesomeIcon icon={faCalendar} /> Applied Jobs
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
            {activeSection === 'Applied Jobs' &&  (<AppliedJobPost  />) }


            {/* Update Profile Section */}
            {activeSection === 'updateProfile' && (<EditProfile profile={profiles}/>)}

          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;






