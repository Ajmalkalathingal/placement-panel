import { useState } from "react";
import api from "../../api";
import { toast } from "react-toastify";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const EditProfile = ({profile}) => {

    const [img, setProfileImage] = useState(null);
    const [resume, setResume] = useState(null);
    const [firstName, setFirstName] = useState(profile.user.first_name);
    const [lastName, setLastName] = useState(profile.user.last_name);

    const handleProfileImageChange = (e) => {
        setProfileImage(e.target.files[0]);  
    };

    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);  
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
  
        const formData = new FormData();

        if (img) {
          formData.append("img", img);
        }
        if (resume) {
          formData.append("resume", resume);;
        }
    
        
        formData.append("user.first_name", firstName);
        formData.append("user.last_name", lastName);
  
        try {
            const response = await api.update(`/api/student-profile/${profile.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
  
            console.log('Profile updated successfully');
            toast.success('Profile updated successfully')
        } catch (error) {
            if (error.response) {
                console.error('Error response data:', error.response.data);
                console.error('Error response status:', error.response.status);
                console.error('Error response headers:', error.response.headers);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    return <>
      <Container className="mt-4">
      <h2 className="text-center text-primary mb-4">Edit Profile</h2>
      <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="profileImage">
              <Form.Label>Profile Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleProfileImageChange}
                accept="image/*"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="resume">
              <Form.Label>Resume</Form.Label>
              <Form.Control
                type="file"
                onChange={handleResumeChange}
                accept=".pdf,.doc,.docx"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Enter your first name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center">
          <Button type="submit" className="mt-3" variant="primary">
            Update Profile
          </Button>
        </div>
      </Form>
    </Container>
            </>
}

export default EditProfile