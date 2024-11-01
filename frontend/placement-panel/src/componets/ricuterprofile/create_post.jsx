import { useState } from "react";
import api from "../../api";

const CreateJobPost = (profile) => {

    const [formData, setFormData] = useState({
        recruiter: profile.id, 
        title: '',
        description: '',
        location: '',
        salary: '',
        requirements: '',
        deadline: '',
        job_type: 'full-time',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // API call to submit job post
        const response = await api.post('/api/recruiters/create-job-post/', formData);

        if (response) {
            alert('Job post created successfully!');
            // setFormData({
            //     recruiter:'',
            //     title: '',
            //     description: '',
            //     location: '',
            //     salary: '',
            //     requirements: '',
            //     deadline: '',
            //     job_type: 'full-time',
            // });
        } else {
            alert('Error creating job post');
        }
    };
    return <>
                <div className="container register-form ">
                <div className="form card">
                    <div className="form-content">
                        <p className="text-center heading">Create Job Post</p>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Job Title *" 
                                            name="title" 
                                            value={formData.title} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="text" 
                                            className="form-control" 
                                            placeholder="Location *" 
                                            name="location" 
                                            value={formData.location} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input 
                                            type="number" 
                                            className="form-control" 
                                            placeholder="Salary *" 
                                            name="salary" 
                                            value={formData.salary} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <select 
                                            className="form-control" 
                                            name="job_type" 
                                            value={formData.job_type} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="full-time">Full-Time</option>
                                            <option value="internship">Internship</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-group">
                                        <textarea 
                                            className="form-control" 
                                            placeholder="Job Description *" 
                                            name="description" 
                                            value={formData.description} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea 
                                            className="form-control" 
                                            placeholder="Requirements *" 
                                            name="requirements" 
                                            value={formData.requirements} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="form-group">DeadLine
                                        <input 
                                            type="datetime-local" 
                                            className="form-control" 
                                            name="deadline" 
                                            value={formData.deadline} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btnSubmit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
}

export default CreateJobPost