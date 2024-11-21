import { Link } from "react-router-dom";
import './style.css';
import { useEffect, useState } from "react";
import { faUserGraduate, faBriefcase, faChalkboardTeacher, faUsersCog,faFilePdf  } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Verifier from "../../componets/verifier";
import Header from "../../componets/header";



const Home = () => {

  const students = [
    { imgSrc: "src/assets/2024 placements/1.png", title: "Student 1", description: "Placed at Company 1" },
    { imgSrc: "src/assets/2024 placements/2.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/3.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/4.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/5.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/1.png", title: "Student 1", description: "Placed at Company 1" },
    { imgSrc: "src/assets/2024 placements/2.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/3.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/4.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/5.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/1.png", title: "Student 1", description: "Placed at Company 1" },
    { imgSrc: "src/assets/2024 placements/2.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/3.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/4.png", title: "Student 2", description: "Placed at Company 2" },
    { imgSrc: "src/assets/2024 placements/5.png", title: "Student 2", description: "Placed at Company 2" },
  ];

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const getImagesPerSlide = () => {
    if (window.innerWidth < 576) {
      return 1; 
    } else if (window.innerWidth < 992) {
      return 2; 
    } else {
      return 4; 
    }
  };

  const [imagesPerSlide, setImagesPerSlide] = useState(getImagesPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setImagesPerSlide(getImagesPerSlide());
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    const handleDownload = () => {
      // This can be a local file in your public folder or an API endpoint serving the PDF
      const pdfUrl = 'src/assets/pdf/placement brochure.pdf';
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'placement-report.pdf';  // The name of the file when downloading
      link.click();  // Trigger the download
    };

  const slides = chunkArray(students, imagesPerSlide);
  
  return (
    <>
<div className="container">
  <Header />
</div>

<div className="hero my-5 position-relative">
  <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img
          src="https://ugcmmttc.uoc.ac.in/images/banner_3.jpg"
          className="d-block w-100"
          alt="Slide 1"
        />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="display-5 fw-bold text-white">Slide 1 Title</h1>
          <p className="lead text-white">
            This is a description for the first slide, making it stand out with an overlay.
          </p>
        </div>
      </div>
      <div className="carousel-item">
        <img
          src="https://ugcmmttc.uoc.ac.in/images/banner_3.jpg"
          className="d-block w-100"
          alt="Slide 2"
        />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="display-5 fw-bold text-white">Slide 2 Title</h1>
          <p className="lead text-white">
            This is a description for the second slide, giving more details here.
          </p>
        </div>
      </div>
      <div className="carousel-item">
        <img
          src="https://ugcmmttc.uoc.ac.in/images/banner_3.jpg"
          className="d-block w-100"
          alt="Slide 3"
        />
        <div className="carousel-caption d-none d-md-block">
          <h1 className="display-5 fw-bold text-white">Slide 3 Title</h1>
          <p className="lead text-white">
            This is a description for the third slide, making it look professional.
          </p>
        </div>
      </div>
    </div>
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="prev"
    >
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#heroCarousel"
      data-bs-slide="next"
    >
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  </div>


  <div className="container">
  <div className="row mt-4">
      <div className="col-12 col-md-3 mb-4">
        <Link to={'/signup-for-student'} className="card shadow-sm hover-shadow rounded-lg hover-card">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faUserGraduate} size="4x" className="text-primary mb-3" />
            <h5 className="card-title">Student</h5>
            <p className="card-text">Sign up as a student to access placement resources and apply for opportunities.</p>
          </div>
        </Link>
      </div>

      <div className="col-12 col-md-3 mb-4">
        <Link to={'/signup-for-recruiter'} className="card shadow-sm hover-shadow rounded-lg hover-card">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faBriefcase} size="4x" className="text-primary mb-3" />
            <h5 className="card-title">Recruiter</h5>
            <p className="card-text">Sign up as a recruiter to post job openings and connect with students.</p>
          </div>
        </Link>
      </div>

      <div className="col-12 col-md-3 mb-4">
        <Link to={'/signup-for-coordinator'} className="card shadow-sm hover-shadow rounded-lg hover-card">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faChalkboardTeacher} size="4x" className="text-primary mb-3" />
            <h5 className="card-title">Coordinator</h5>
            <p className="card-text">Sign up as a coordinator to manage events and track placements.</p>
          </div>
        </Link>
      </div>

      <div className="col-12 col-md-3 mb-4">
        <Link to={'/signup-for-coordinator'} className="card shadow-sm hover-shadow rounded-lg hover-card">
          <div className="card-body text-center">
            <FontAwesomeIcon icon={faUsersCog} size="4x" className="text-primary mb-3" />
            <h5 className="card-title">Coordinator</h5>
            <p className="card-text">Sign up as a coordinator to manage events and track placements.</p>
          </div>
        </Link>
      </div>
    </div>
  </div>

        <div className="container-fuid m-3">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-9" >
            <div className="bg-light text-secondary px-4 py-5 text-center">
              <div className="py-5" style={{backgroundColor:'#fff'}}>
                <h1 className="display-5 fw-bold text-dark">Why DCMS</h1>
                <div className="col-lg-6 mx-auto" >
                  <p className="fs-5 mb-4">
                    Quickly design and customize responsive mobile-first sites
                    with Bootstrap, the world’s most popular front-end open source
                    toolkit, featuring Sass variables and mixins, responsive grid
                    system, extensive prebuilt components, and powerful JavaScript
                    plugins.
                  </p>
                  <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                    <button
                      type="button"
                      className="btn btn-outline-info btn-lg px-4 me-sm-3 fw-bold"
                    >
                      Custom button
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-light btn-lg px-4"
                    >
                      Secondary
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Card */}
          <div className="col-md-3">
          <div
      className="card shadow-lg rounded-lg border-0"
      style={{
        width: '100%',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
      }}
      onClick={handleDownload}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}  // Hover effect
      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}  // Reset hover effect
    >
      <div className="card-body p-4">
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faFilePdf} size="2x" className="text-danger mr-3" />
          <div>
            <h5 className="card-title text-primary font-weight-bold">Download Placement Report</h5>
            <strong className="card-text">
              which contains key insights on student placements, recruitment trends, and more.
            </strong>
          </div>
        </div>
      </div>
    </div>
            <div className="card" style={{ width: '100%'}}>
              {/* <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="..."
              /> */}
              <div className="card-body">
                <h5 className="card-title">Placement report</h5>
                <p className="card-text">
                  Some quick example text to build on the Placement report and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
            <div className="card" style={{ width: '100%' }}>
              {/* <img
                src="https://via.placeholder.com/150"
                className="card-img-top"
                alt="..."
              /> */}
              <div className="card-body">
                <h5 className="card-title">Placement report</h5>
                <p className="card-text">
                  Some quick example text to build on the Placement report and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 className="m-b-xs text-center"><strong>Recent placement</strong></h1>
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <div className="cards-wrapper">
                {slide.map((student, i) => (
                  <div key={i} className="card" >
                    <img src={student.imgSrc} style={{height:'300px' }} className="card-img-top" alt={student.title} />
                    <div className="card-body">
                      <h5 className="card-title">{student.title}</h5>
                      <p className="card-text">{student.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Carousel controls */}
        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </a>
      </div>

<div className="container-fuild">
        
<footer class="footer_area section_padding_130_0 mt-3 pt-5" style={{backgroundColor:'#fff'}}>
      <div class="container">
        <div class="row">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="single-footer-widget section_padding_0_130">
              <div class="footer-logo mb-3"></div>
              <p>Appland is completely creative, lightweight, clean app landing page.</p>
              <div class="copywrite-text mb-5">
                <p class="mb-0">Made with <i class="lni-heart mr-1"></i>by<a class="ml-1" href="https://wrapbootstrap.com/user/DesigningWorld">Designing World</a></p>
              </div>
              <div class="footer_social_area"><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Facebook"><i class="fa fa-facebook"></i></a><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Pinterest"><i class="fa fa-pinterest"></i></a><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Skype"><i class="fa fa-skype"></i></a><a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Twitter"><i class="fa fa-twitter"></i></a></div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <div class="single-footer-widget section_padding_0_130">
              <h5 class="widget-title">About</h5>
              <div class="footer_menu">
                <ul>
                  <li><a href="#">About Us</a></li>
                  <li><a href="#">Corporate Sale</a></li>
                  <li><a href="#">Terms &amp; Policy</a></li>
                  <li><a href="#">Community</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <div class="single-footer-widget section_padding_0_130">
              <h5 class="widget-title">Support</h5>
              <div class="footer_menu">
                <ul>
                  <li><a href="#">Help</a></li>
                  <li><a href="#">Support</a></li>
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Term &amp; Conditions</a></li>
                  <li><a href="#">Help &amp; Support</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg">
            <div class="single-footer-widget section_padding_0_130">
              <h5 class="widget-title">Contact</h5>
              <div class="footer_menu">
                <ul>
                  <li><a href="#">Call Centre</a></li>
                  <li><a href="#">Email Us</a></li>
                  <li><a href="#">Term &amp; Conditions</a></li>
                  <li><a href="#">Help Center</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
</div>
    </>
  );
};

export default Home;


  