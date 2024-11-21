import { useEffect, useState } from "react";
import Sidebar from "../sideBar/SideBar";
import RecruiterList from "./RecruterList";
import CoordinatorRegistrationForm from "./CoordinatorRegistration";

const Verifier = ({profile}) => {
  // Fetch menu items dynamically using the utility function
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
    <>
     <div className="app">
      <Sidebar
        profile={profile}
        role= 'Verifier'
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

        {/* {activeSection === "home" && <CDHome />} */}
        {activeSection === "verify recruter" && <RecruiterList />}
        {activeSection === "create cordinators" && <CoordinatorRegistrationForm />}
        {/* {activeSection === "uploadStudentData" && <UploadDataPDF />} */}
        {/* {activeSection === "placementevent" && <PlacementEventForm />} */}
      </div>


      
    </div>
    </>
  );
};

export default Verifier;
