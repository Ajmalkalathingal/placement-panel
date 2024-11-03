import {
    faUser,
    faCalendar,
    faBriefcase,
    faBook,
    faInbox,
    faEdit,
    faSignOutAlt,
    faTachometerAlt,
    faTable,
    faBox,
    faUsers,
    faHome,
    faCheckCircle
  } from '@fortawesome/free-solid-svg-icons';
  
  export const getMenuItems = (role) => {
    switch (role) {
      case 'Coordinator':
        return [
          { section: 'home', label: 'Home', icon: faHome },
          { section: 'studentList', label: 'Student List', icon: faUsers },
          { section: 'registration', label: 'Registration', icon: faTable },
          { section: 'products', label: 'Products', icon: faBox },
          { section: 'customers', label: 'Customers', icon: faUsers },
          { section: 'logout', label: 'Logout', icon: faSignOutAlt },
        ];
      case 'Recruiter':
        return [
          { section: 'profile', label: 'Profile', icon: faUser },
          { section: 'CreateJobpost', label: 'Create Job Post', icon: faBriefcase },
          { section: 'postlist', label: 'Post List', icon: faCalendar },
          { section: 'appliedStudents', label: 'Applied Students', icon: faUsers },
          { section: 'updateProfile', label: 'Edit Profile', icon: faEdit },
          { section: 'logout', label: 'Logout', icon: faSignOutAlt },
        ];
      case 'Verifier':
        return [
          { section: 'profile', label: 'Profile', icon: faUser },
          { section: 'verifyPosts', label: 'Verify Posts', icon: faCheckCircle },
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
  