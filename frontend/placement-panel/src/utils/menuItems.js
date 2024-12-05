import {
    faUser,
    faCalendar,
    faBriefcase,
    faEdit,
    faSignOutAlt,
    faTable,
    faBox,
    faUsers,
    faCheckCircle,
    faHome,
    faTachometerAlt,
  } from '@fortawesome/free-solid-svg-icons';
  
  export const getMenuItems = (role) => {
    switch (role) {
      case 'Coordinator':
        return [
          { section: 'home', label: 'Home', icon: faHome },
          { section: 'dashboard', label: 'dashboard', icon: faTachometerAlt },
          { section: 'registration', label: 'Registration', icon: faTachometerAlt },
          { section: 'uploadStudentData', label: 'uploadStudentData', icon: faTable },
          { section: 'placementevent', label: 'placementevent', icon: faBox },
          { section: 'logout', label: 'Logout', icon: faSignOutAlt },
        ];

      case 'Recruiter':
        return [
          { section: 'profile', label: 'Profile', icon: faUser },
          { section: 'CreateJobpost', label: 'Create Job Post', icon: faBriefcase },
          { section: 'postlist', label: 'Post List', icon: faCalendar },
          { section: 'appliedStudents', label: 'Applied Students', icon: faUsers },
          { section: 'selected Students', label: 'selected Students', icon: faUsers },
          { section: 'updateProfile', label: 'Edit Profile', icon: faEdit },
          { section: 'logout', label: 'Logout', icon: faSignOutAlt },
        ];
      case 'Verifier':
        return [
          { section: 'home', label: 'Profile', icon: faUser },
          { section: 'verify recruter', label: 'verify recruter', icon: faCheckCircle },
          { section: 'Coordinator list', label: 'Coordinator list', icon: faCheckCircle },
          { section: 'create cordinators', label: 'create cordinators', icon: faCheckCircle },
          { section: 'logout', label: 'Logout', icon: faSignOutAlt },
        ];
      case 'Student':
        return [
          { section: 'profile', label: 'Profile', icon: faUser },
          { section: 'JobApplicaton', label: 'JobApplicaton', icon: faUser },
          { section: 'appliedJobs', label: 'Applied Jobs', icon: faBriefcase },
          { section: 'updateProfile', label: 'Edit Profile', icon: faEdit },
          { section: 'logout', label: 'Logout', icon: faSignOutAlt },
        ];
      default:
        return [];
    }
  };
  