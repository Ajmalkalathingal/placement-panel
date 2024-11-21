import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./sideBar.css";
import { getMenuItems } from "../../utils/menuItems";

const Sidebar = ({ profile,role, activeSection, handleSectionChange,isSidebarActive}) => {
    const menuItems = getMenuItems(role)
    return (
      <div id="sidebar" className={`d-flex flex-column p-3 ${isSidebarActive ? "active" : ""}`}>
        <h4 className="text-center">{profile?.user.first_name || "My Sidebar"}</h4>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
        {menuItems.map((item) => (
            <li
              key={item.section}
              className = {` nav-item${activeSection === item.section ? "active" : ""}`}
            >
              <a href="#" onClick={() => handleSectionChange(item.section)}>
                <FontAwesomeIcon icon={item.icon} /> {item.label}
              </a>
            </li>
          ))}
        </ul>
        <hr />
      </div>
    );
  };
  
  export default Sidebar;

    