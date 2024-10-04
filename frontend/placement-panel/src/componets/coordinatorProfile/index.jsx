import React, { useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faHome, faTachometerAlt, faTable, faBox, faUsers,
} from '@fortawesome/free-solid-svg-icons';
import CDHome from './CDhome';
import CDList from './CDList';

const CoordinatorProfile = ({ profile }) => {
  const [activeSection, setActiveSection] = useState('home'); // Default to 'home'

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-body-tertiary p-3" style={{ height: '100vh', width:'33vh' }}>
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
              <a href="#" className={`nav-link ${activeSection === 'orders' ? 'active' : ''}`} onClick={() => handleSectionChange('orders')}>
                <FontAwesomeIcon icon={faTable} className="me-2" />
                Orders
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'products' ? 'active' : ''}`} onClick={() => handleSectionChange('products')}>
                <FontAwesomeIcon icon={faBox} className="me-2" />
                Products
              </a>
            </li>
            <li>
              <a href="#" className={`nav-link ${activeSection === 'customers' ? 'active' : ''}`} onClick={() => handleSectionChange('customers')}>
                <FontAwesomeIcon icon={faUsers} className="me-2" />
                Customers
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
        <div className="col-md-9 p-4">
            {activeSection === 'home' && <CDHome/>}
            {activeSection === 'dashboard' && <CDList/>}
            {activeSection === 'orders' &&     <form>
        <legend>Student Registration</legend>
        <div className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">Disabled input</label>
          <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
        </div>
        <div className="mb-3">
          <label htmlFor="disabledTextInput" className="form-label">Disabled input</label>
          <input type="text" id="disabledTextInput" className="form-control" placeholder="Disabled input" />
        </div>
        <div className="mb-3">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="disabledFieldsetCheck"  />
            <label className="form-check-label" htmlFor="disabledFieldsetCheck">
              Can't check this
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>}
            {activeSection === 'products' && <h1>Products Section</h1>}
            {activeSection === 'customers' && <h1>Customers Section</h1>}
        </div>
      </div>
    </div>
  );
};

export default CoordinatorProfile;
