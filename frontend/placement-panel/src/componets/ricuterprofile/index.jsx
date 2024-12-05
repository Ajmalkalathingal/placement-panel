import { useEffect, useState } from "react";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RHome from "./RHome";
import EditProfile from "./editprofile";
import CreateJobPost from "./create_post";
import PostList from "./pos_list";
import { getMenuItems } from "../../utils/menuItems";
import api from "../../api";
import { getImageUrl } from "../../utils/utils";
import JobAppliedStudent from "./jobappliedstudent";

const RecruterProfile = ({ profile }) => {
  const menuItems = getMenuItems("Recruiter");
  const [activeSection, setActiveSection] = useState(menuItems[3].section);
  const [profiles, setProfile] = useState(profile);
  let image = getImageUrl(profile.company_logo)
  const [unseenCount, setUnseenCount] = useState(0);

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const fetchUnseenCount = async () => {
      const response = await api.get("/api/applications/unseen-count/");
      setUnseenCount(response.data.unseen_count);
    };
    fetchUnseenCount();
  }, []);

  const markApplicationsAsSeen = async () => {
    await api.patch(`/api/applications/mark-seen/`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
    setSidebarVisible(!isSidebarVisible);
    if (section === "appliedStudents") {
      markApplicationsAsSeen();
      setUnseenCount(0);
    }
  };

  useEffect(() => {
    setProfile(profiles);
  }, [profiles]);


  if (!profiles.is_active) {
    return (
      <div className="container mt-5">
        <div className="card text-center shadow-sm">
          <div className="card-body">
            <div className="mb-4">
              <img
                src={"src/assets/images/logo2.png"}
                alt="Verification Icon"
                style={{ opacity: 0.8 }}
              />
            </div>
            <h5 className="card-title">Profile Verification in Progress</h5>
            <p className="card-text text-secondary">
              Please wait a moment while our team verifies your profile. Once
              verified, it will be activated, and you can access all the
              features.
            </p>
            <div className="mt-3">
              <button className="btn btn-primary" disabled>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Verifying...
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" mt-3">
        <div className="bio-graph-heading">
          <img
            src={"src/assets/images/logo2.png"}
            alt="University Logo"
            width="40"
            height="40"
            className="me-2 ml-4"
          />
          Welcome to calicut univercity Dcms Placement cell.
        </div>
        <div className="main-body">
          <div className="row">
            <div className="col-lg-2">
              {window.innerWidth < 992 && (
                <button
                  className="btn btn-primary mb-3 d-lg-none"
                  onClick={toggleSidebar}
                >
                  ☰ Menu
                </button>
              )}

              {/* Sidebar, hidden on small screens if toggled */}
              <div
                className={`card ${
                  isSidebarVisible ? "d-block" : "d-none"
                } d-lg-block`}
              >
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={
                        image ||
                        "https://bootdey.com/img/Content/avatar/avatar6.png"
                      }
                      alt="Admin"
                      className="rounded-circle p-1 bg-primary"
                      style={{ width: "110px" }}
                    />
                    <div className="mt-3">
                      <h4>{profiles.company_name}</h4>
                      <strong>
                        <p className="text-secondary mb-1">
                          Position: {profiles.position}
                        </p>
                      </strong>
                      <strong>
                        <p className="text-secondary font-size-sm">
                          Name: {profiles.user.first_name}
                        </p>
                      </strong>
                    </div>
                  </div>
                  <hr className="my-4" />

                  {/* Render Sidebar Menu */}
                  <ul className="p-1 mt-2 space" style={{ listStyle: "none" }}>
                    {menuItems.map((item) => (
                      <li
                        key={item.section}
                        className={
                          activeSection === item.section ? "active" : ""
                        }
                      >
                        <a
                          href="#"
                          onClick={() => handleSectionChange(item.section)}
                        >
                          <FontAwesomeIcon icon={item.icon} /> {item.label}
                          {item.section === "appliedStudents" && (
                            <span className="badge bg-danger m-2 ">
                              {item.section === "appliedStudents" &&
                              unseenCount > 0
                                ? ` ${unseenCount}`
                                : ""}
                            </span>
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-lg-10">
              {/* Dynamically render sections based on activeSection */}
              {activeSection === "profile" && <RHome profile={profile} />}
              {activeSection === "CreateJobpost" && (
                <CreateJobPost profile={profiles} />
              )}
              {activeSection === "postlist" && <PostList />}
              {activeSection === "appliedStudents" && <JobAppliedStudent />}
              {activeSection === "updateProfile" && (
                <EditProfile
                  profile={profiles}
                  setProfile={setProfile}
                  handleSectionChange={handleSectionChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecruterProfile;
