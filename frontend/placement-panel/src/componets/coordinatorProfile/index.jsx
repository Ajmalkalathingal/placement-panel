import React, { useEffect, useState } from 'react';
import './rstyle.css';
import CDHome from './CDhome';
import StuList from './StuList';
import Registration from './registration';
import UploadDataPDF from './UploadPDF';
import PlacementEventForm from './events';
import Sidebar from '../sideBar/SideBar';


const CoordinatorProfile = ({ profile }) => {
  const [activeSection, setActiveSection] = useState("home");
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarActive(!isSidebarActive);
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarActive(false);
  };

  return (
    <div className="app">
      <Sidebar
        profile={profile}
        role = 'Coordinator'
        activeSection={activeSection}
        handleSectionChange={handleSectionChange}
        isMobile={isMobile}
        isSidebarActive={isSidebarActive}
        toggleSidebar={toggleSidebar}
      />

      <div id="content" className={isSidebarActive ? "active" : ""}>
        {isMobile && (
          <button className="btn" onClick={toggleSidebar}>
            ☰ Menu
          </button>
        )}

        {activeSection === "home" && <CDHome />}
        {activeSection === "dashboard" && <StuList />}
        {activeSection === "registration" && <Registration />}
        {activeSection === "uploadStudentData" && <UploadDataPDF />}
        {activeSection === "placementevent" && <PlacementEventForm />}
      </div>
    </div>
  );
};

export default CoordinatorProfile;