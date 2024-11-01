import { faUser, faCalendar, faEdit,faUsers,faBox,faTable,faTachometerAlt,faHome } from '@fortawesome/free-solid-svg-icons';

export const getMenuItems = (role) => {
    switch (role) {
        case 'Coordinator':
            return [
                { section: 'home', label: 'Home', icon: faHome },
                { section: 'studentList', label: 'Student List', icon: faTachometerAlt },
                { section: 'registration', label: 'Registration', icon: faTable },
                { section: 'products', label: 'Products', icon: faBox },
                { section: 'customers', label: 'Customers', icon: faUsers },
            ];
        case 'Recruiter':
            return [
                { section: 'profile', label: 'Profile', icon: faUser },
                { section: 'CreateJobpost', label: 'Create Job Post', icon: faCalendar },
                { section: 'postlist', label: 'Post List', icon: faCalendar },
                { section: 'updateProfile', label: 'Edit Profile', icon: faBox },
                { section: 'appliedStudents', label: 'Applied Students', icon: faEdit },
            ];
        case 'Verifier':
            return [
                { section: 'profile', label: 'Profile', icon: faUser },
                { section: 'verifyPosts', label: 'Verify Posts', icon: faEdit },
            ];
        default:
            return [];
    }
};
