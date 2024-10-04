import React, { useState } from 'react';
import "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';

const StudentProfile = ({ profile }) => {
  // State to manage which section is active
  const [activeSection, setActiveSection] = useState('profile'); // Default to 'profile'

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container bootstrap snippets bootdey">
      <div className="row">
        <div className="profile-nav col-md-3">
          <div className="panel">
            <div className="user-heading round">
              <a href="#">
                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
              </a>
              <h1>{profile.user.first_name} {profile.user.last_name}</h1>
              <p>{profile.user.email}</p>
            </div>

            {/* Navigation buttons */}
            <ul className="p-1 mt-2 space" style={{ listStyle: 'none' }}>
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

        <div className="profile-info col-md-9">
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
                      <p><span>First Name </span>: {profile.user.first_name}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Last Name </span>: {profile.user.last_name}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Email </span>: {profile.user.email}</p>
                    </div>
                    <div className="bio-row">
                      <p><span>Registration </span>: {profile.registration}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Posts Section */}
                <div className="panel-body mt-4">
                  <h2>Recent Posts</h2>
                  <div className="row">
                    {profile.recentPosts && profile.recentPosts.length > 0 ? (
                      profile.recentPosts.map((post, index) => (
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
              </>
            )}

            {/* Recent Activity Section */}
            {activeSection === 'recentActivity' && (
              <div>
                <h2 className="post mt-2">Recent Activity</h2>
                <div className="row mt-3">
                  {profile.recentPosts && profile.recentPosts.length > 0 ? (
                    profile.recentPosts.map((post, index) => (
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
              <div>
                <h2 className="post mt-2">Update Profile</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      defaultValue={profile.user.first_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      defaultValue={profile.user.last_name}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      defaultValue={profile.user.email}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Update</button>
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
