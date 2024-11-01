import { useEffect, useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import RHome from './RHome';
import EditProfile from './editprofile';
import { getImageUrl } from '../../utils/utils';
import CreateJobPost from './create_post';
import PostList from './pos_list';
import { getMenuItems } from '../../utils/menuItems';
import AppliedStudentList from './appliedstudentlist';
import api from '../../api';

const RecruterProfile = ({ profile}) => {
    const menuItems = getMenuItems('Recruiter');
    const [activeSection, setActiveSection] = useState(menuItems[0].section);
    const [profiles, setProfile] = useState(profile);
    const [unseenCount, setUnseenCount] = useState(0);

    useEffect(() => {
        const fetchUnseenCount = async () => {
            const response = await api.get('/api/applications/unseen-count/');
            console.log(response)
            setUnseenCount(response.data.unseen_count);
        };
        fetchUnseenCount();
    }, []);


    const markApplicationsAsSeen = async () => {
        await api.patch(`/api/applications/mark-seen/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    const handleSectionChange = (section) => {
        setActiveSection(section);
        if (section === 'appliedStudents') {
            markApplicationsAsSeen();
            setUnseenCount(0);  // Update count to zero after marking as seen
        }
    };

    useEffect(() => {
        setProfile(profiles);
    }, [profiles]);

    const imageUrl = getImageUrl(profiles.company_logo);



    return (
        <>
            <div className=" mt-3">
                <div className="bio-graph-heading">
                    Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum.
                </div>
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src={imageUrl || "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                            alt="Admin"
                                            className="rounded-circle p-1 bg-primary"
                                            style={{ width: "110px" }}
                                        />
                                        <div className="mt-3">
                                            <h4>{profiles.company_name}</h4>
                                            <strong><p className="text-secondary mb-1">Position: {profiles.position}</p></strong>
                                            <strong><p className="text-secondary font-size-sm">Name: {profiles.user.first_name}</p></strong>
                                        </div>
                                    </div>
                                    <hr className="my-4" />

                                    {/* Render Sidebar Component */}
                                <ul className="p-1 mt-2 space" style={{ listStyle: 'none' }}>
                                    {menuItems.map((item) => (
                                        <li key={item.section} className={activeSection === item.section ? 'active' : ''}>
                                            <a href="#" onClick={() => handleSectionChange(item.section)}>
                                                <FontAwesomeIcon icon={item.icon} /> {item.label}
                                                {item.section === 'appliedStudents' && <span className='badge bg-danger m-2 '>{item.section === 'appliedStudents' && unseenCount > 0 ? ` ${unseenCount}` : ''}</span> } 
                                                
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                </div>
                            </div>
                        </div>
                       
                        <div className="col-lg-9">
                            {/* Dynamically render sections based on activeSection */}
                            {activeSection === 'profile' && <RHome profile={profiles} />}
                            {activeSection === 'CreateJobpost' && <CreateJobPost profile={profiles} />}
                            {activeSection === 'postlist' && <PostList />}
                    {activeSection === 'appliedStudents' && <AppliedStudentList  />}
                            {activeSection === 'updateProfile' && (
                                <EditProfile profile={profiles} setProfile={setProfile} handleSectionChange={handleSectionChange} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecruterProfile;
