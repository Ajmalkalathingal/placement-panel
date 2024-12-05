const Header = () => {

  const handleNavClick = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 60; // Adjust for fixed header
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="hero_area ">
        <header className="header_section long_section px-0">
          <nav className="navbar navbar-expand-lg custom_nav-container">
            <a className="navbar-brand" href="index.html">
              <img
                src={"src/assets/images/logo2.png"}
                alt="University Logo"
                width="40"
                height="40"
                className="me-2 ml-4"
              />
              <span>DCMS Placement</span>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className> </span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="d-flex mx-auto flex-column flex-lg-row align-items-center">
                <ul className="navbar-nav  ">
                  <li className="nav-item active">
                    <a className="nav-link" href="#home" onClick={handleNavClick}>
                      Home <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#contact" onClick={handleNavClick} className="nav-link"> About</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#why-dcms" onClick={handleNavClick}>
                      why Dcms
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Blog
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#contact" onClick={handleNavClick} className="nav-link">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="quote_btn-container">
                <a href>
                  <span>Login</span>
                  <i className="fa fa-user" aria-hidden="true" />
                </a>
              </div>
            </div>
          </nav>
        </header>
        {/* end header section */}
        
        {/* slider section */}
        <section id="home" className="slider_section long_section">
          <div
            id="customCarousel"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-box">
                        <h1>
                          For All Your <br />
                          Student Needs
                        </h1>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Minus quidem maiores perspiciatis, illo maxime
                          voluptatem a itaque suscipit.
                        </p>
                        <div className="btn-box">
                          <a href className="btn1">
                            Contact Us
                          </a>
                          <a href className="btn2">
                            About Us
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="img-box">
                        <img src="images/slider-img.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-box">
                        <h1>
                          For All Your <br />
                          student Needs
                        </h1>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Minus quidem maiores perspiciatis, illo maxime
                          voluptatem a itaque suscipit.
                        </p>
                        <div className="btn-box">
                          <a href className="btn1">
                            Contact Us
                          </a>
                          <a href className="btn2">
                            About Us
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="img-box">
                        <img src="images/slider-img.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="container ">
                  <div className="row">
                    <div className="col-md-5">
                      <div className="detail-box">
                        <h1>
                          For All Your <br />
                          student Needs
                        </h1>
                        <p>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Minus quidem maiores perspiciatis, illo maxime
                          voluptatem a itaque suscipit.
                        </p>
                        <div className="btn-box">
                          <a href className="btn1">
                            Contact Us
                          </a>
                          <a href className="btn2">
                            About Us
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <div className="img-box">
                        <img src="images/slider-img.png" alt />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ol className="carousel-indicators">
              <li
                data-target="#customCarousel"
                data-slide-to={0}
                className="active"
              />
              <li data-target="#customCarousel" data-slide-to={1} />
              <li data-target="#customCarousel" data-slide-to={2} />
            </ol>
          </div>
        </section>
        {/* end slider section */}
      </div>
    </>
  );
};

export default Header;
