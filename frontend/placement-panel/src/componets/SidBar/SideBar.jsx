import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = ({ menuItems, activeSection, handleSectionChange }) => {
    return (
        <ul className="p-1 mt-2 space" style={{ listStyle: 'none' }}>
            {menuItems.map((item) => (
                <li key={item.section} className={activeSection === item.section ? 'active' : ''}>
                    <a href="#" onClick={() => handleSectionChange(item.section)}>
                        <FontAwesomeIcon icon={item.icon} /> {item.label}
                    </a>
                </li>
            ))}
        </ul>
    );
};

export default Sidebar;
