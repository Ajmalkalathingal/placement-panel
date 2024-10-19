import { useEffect, useState } from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendar, faEdit } from '@fortawesome/free-solid-svg-icons';
import RHome from './RHome';
import EditProfile from './editprofile';
import { getImageUrl } from '../../utils';
import CreateJobPost from './create_post';
import PostList from './pos_list';

const RecruterProfile = ({ profile }) => {
    const [activeSection, setActiveSection] = useState('profile');
    const [profiles ,setProfile] =useState(profile)

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    useEffect(() => {
        setProfile(profiles);
      }, [profile]);
    //   console.log(profiles)
      const imageUrl = getImageUrl(profiles.company_logo); 

    return (
        <>
            <div className="container mt-3">
            <div className="bio-graph-heading">
              Aliquam ac magna metus. Nam sed arcu non tellus fringilla fringilla ut vel ispum.
            </div>
                <div className="main-body">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img
                                            src={getImageUrl(profile.company_logo) || "https://bootdey.com/img/Content/avatar/avatar6.png"}
                                            alt="Admin"
                                            className="rounded-circle p-1 bg-primary"
                                            style={{ width: "110px" }}
                                        />
                                        <div className="mt-3">
                                            <h4>{ profiles.company_name}   </h4>
                                            <p className="text-secondary mb-1">company position :{profiles.position}</p>
                                            <p className="text-muted font-size-sm">Name : {profiles.user.first_name}</p>
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                    <ul className="p-1 mt-2 space" style={{ listStyle: 'none' }}>
                                        <li className={activeSection === 'profile' ? 'active' : ''}>
                                            <a href="#" onClick={() => handleSectionChange('profile')}>
                                                <FontAwesomeIcon icon={faUser} /> Profile
                                            </a>
                                        </li>
                                        <li className={activeSection === 'CreateJobpost' ? 'active' : ''}>
                                            <a href="#" onClick={() => handleSectionChange('CreateJobpost')}>
                                                <FontAwesomeIcon icon={faCalendar} /> Create Job post
                                            </a>
                                        </li>
                                        <li className={activeSection === 'postlist' ? 'active' : ''}>
                                            <a href="#" onClick={() => handleSectionChange('postlist')}>
                                                <FontAwesomeIcon icon={faCalendar} /> postlist
                                            </a>
                                        </li>
                                        <li className={activeSection === 'appliedStudents' ? 'active' : ''}>
                                            <a href="#" onClick={() => handleSectionChange('appliedStudents')}>
                                                <FontAwesomeIcon icon={faEdit} /> Applied Students
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
                        </div>

                        <div className="col-lg-8">

                        {activeSection === 'profile' && <RHome profile={profiles} />}
                        {activeSection === 'CreateJobpost' && <CreateJobPost profile={profiles}/> }
                        {activeSection === 'postlist' && <PostList/>}
                        {activeSection === 'appliedStudents' && <h1>appliedStudents</h1>}
                        {activeSection === 'updateProfile' && <EditProfile profile={profiles} setProfile={setProfile} handleSectionChange={handleSectionChange}/>}
                                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecruterProfile;
