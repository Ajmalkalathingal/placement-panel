import React, { useState } from 'react';
import './rstyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faHome, faTachometerAlt, faTable, faBox, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import CDHome from './CDhome';
import StuList from './StuList';
import Registration from './registration';
import UploadDataPDF from './UploadPDF';
import PlacementEventForm from './events';

const CoordinatorProfile = ({ profile }) => {
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 col-md-4 col-sm-12 bg-body-tertiary p-3 sidebar">
          <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
            <FontAwesomeIcon icon={faUser} className="me-2" />
            <span className="fs-4">Coordinator</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <a href="#" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => handleSectionChange('home')}>
                <FontAwesomeIcon icon={faHome} className="me-2" />
                Home
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'dashboard' ? 'active' : ''}`} onClick={() => handleSectionChange('dashboard')}>
                <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                Student List
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'registration' ? 'active' : ''}`} onClick={() => handleSectionChange('registration')}>
                <FontAwesomeIcon icon={faTable} className="me-2" />
                registration
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'uploadStudentData' ? 'active' : ''}`} onClick={() => handleSectionChange('uploadStudentData')}>
                <FontAwesomeIcon icon={faBox} className="me-2" />
                UploaData in PDF
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'placementevent' ? 'active' : ''}`} onClick={() => handleSectionChange('placementevent')}>
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Placement Events
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'logout' ? 'active' : ''}`} onClick={() => handleSectionChange('logout')}>
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Logout
              </a>
            </li>
          </ul>
          <hr />
          <div className="dropdown">
            <a
              href="#"
              className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="Profile"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              <strong>{profile?.user?.first_name || 'Coordinator'}</strong>
            </a>
            <ul className="dropdown-menu text-small shadow">
              <li><a className="dropdown-item" href="#">New project...</a></li>
              <li><a className="dropdown-item" href="#">Settings</a></li>
              <li><a className="dropdown-item" href="#">Profile</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-9 col-md-8 col-sm-12 p-4 content">
          {activeSection === 'home' && <CDHome />}
          {activeSection === 'dashboard' && <StuList />}
          {activeSection === 'registration' && <Registration/>}
          {activeSection === 'uploadStudentData' && <UploadDataPDF/>}
          {activeSection === 'placementevent' && <PlacementEventForm/>}
          {/* {activeSection === 'logout' && <PlacementEventForm/>} */}
          
        </div>
      </div>
    </div>
  );
};

export default CoordinatorProfile;
