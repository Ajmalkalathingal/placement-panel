import Header from "../../componets/header";
import { Link } from "react-router-dom";
import {
  faUserGraduate,
  faBriefcase,
  faChalkboardTeacher,
  faUsersCog,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swiper from "../../componets/swiper/swiper";
import Footer from "../../componets/footer/footer";
import Blog from "../../componets/PlacementBlog/Blog";

const Index = () => {
  const handleDownload = () => {
    // This can be a local file in your public folder or an API endpoint serving the PDF
    const pdfUrl = "src/assets/pdf/placement brochure.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "placement-report.pdf"; 
    link.click();
  };
  return (
    <>
      <div>
        <section className="header-section">
        <Header />
        </section>

        {/* user section */}
        <section className="user-section">
        <div className="container">
          <div className="row mt-4">
            <div className="col-12 col-md-3 mb-4">
              <Link
                to={"/signup-for-student"}
                className="card shadow-sm hover-shadow rounded-lg hover-card"
              >
                <div className="card-body text-center">
                  <FontAwesomeIcon
                    icon={faUserGraduate}
                    size="4x"
                    className="text-primary mb-3"
                  />
                  <h5 className="card-title">Student</h5>
                  <p className="card-text">
                    Sign up as a student to access placement resources and apply
                    for opportunities.
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <Link
                to={"/signup-for-recruiter"}
                className="card shadow-sm hover-shadow rounded-lg hover-card"
              >
                <div className="card-body text-center">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    size="4x"
                    className="text-primary mb-3"
                  />
                  <h5 className="card-title">Recruiter</h5>
                  <p className="card-text">
                    Sign up as a recruiter to post job openings and connect with
                    students.
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <Link
                to={"/signup-for-coordinator"}
                className="card shadow-sm hover-shadow rounded-lg hover-card"
              >
                <div className="card-body text-center">
                  <FontAwesomeIcon
                    icon={faChalkboardTeacher}
                    size="4x"
                    className="text-primary mb-3"
                  />
                  <h5 className="card-title">Coordinator</h5>
                  <p className="card-text">
                    Sign up as a coordinator to manage events and track
                    placements.
                  </p>
                </div>
              </Link>
            </div>

            <div className="col-12 col-md-3 mb-4">
              <Link
                to={"/signup-for-coordinator"}
                className="card shadow-sm hover-shadow rounded-lg hover-card"
              >
                <div className="card-body text-center">
                  <FontAwesomeIcon
                    icon={faUsersCog}
                    size="4x"
                    className="text-primary mb-3"
                  />
                  <h5 className="card-title">Verifier</h5>
                  <p className="card-text">
                    Log-in as a Verifier manage events and track.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
        </section>
        
        {/* about section */}
        <section
          id="#about"
          className="about_section layout_padding long_section"
        >
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="img-box">
                  <img src="images/about-img.png" alt />
                </div>
              </div>
              <div className="col-md-6">
                <div className="detail-box">
                  <div className="heading_container">
                    <h2>About Us</h2>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti dolorem eum consequuntur ipsam repellat dolor
                    soluta aliquid laborum, eius odit consectetur vel quasi in
                    quidem, eveniet ab est corporis tempore.
                  </p>
                  <a href>Read More</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* end about section */}

        {/* blog section */}
        <section>
        <Blog />
        </section>
        {/* end blog section */}


        <div className="container-fuid m-3">
          <div className="row">
            {/* Left Section */}
            <div className="col-md-9">
              <div className="bg-light text-secondary px-4 py-5 text-center">
                <div className="py-5" style={{ backgroundColor: "#fff" }}>
                  <h1 className="display-5 fw-bold text-dark">Why DCMS</h1>
                  <div className="col-lg-6 mx-auto">
                    <p className="fs-5 mb-4">
                      Quickly design and customize responsive mobile-first sites
                      with Bootstrap, the world’s most popular front-end open
                      source toolkit, featuring Sass variables and mixins,
                      responsive grid system, extensive prebuilt components, and
                      powerful JavaScript plugins.
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
                  width: "100%",
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
                onClick={handleDownload}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.05)")
                } // Hover effect
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                } // Reset hover effect
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      size="2x"
                      className="text-danger mr-3"
                    />
                    <div>
                      <h5 className="card-title text-primary font-weight-bold">
                        Download Placement Report
                      </h5>
                      <strong className="card-text">
                        which contains key insights on student placements,
                        recruitment trends, and more.
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title">Placement report</h5>
                  <p className="card-text">
                    Some quick example text to build on the Placement report and
                    make up the bulk of the card's content.
                  </p>
                </div>
              </div>
              <div className="card" style={{ width: "100%" }}>
                <div className="card-body">
                  <h5 className="card-title">Placement report</h5>
                  <p className="card-text">
                    Some quick example text to build on the Placement report and
                    make up the bulk of the card's content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* placemet section */}
        <section className="container">
              <h2>Recent Placement</h2>
            <Swiper />
        </section>
        {/* end placment section */}

        {/* footer section */}
        <Footer />
        {/* footer section */}
      </div>
    </>
  );
};

export default Index;
