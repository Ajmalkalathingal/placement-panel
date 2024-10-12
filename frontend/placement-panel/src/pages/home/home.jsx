import { Link } from "react-router-dom";
import Nav from "../../componets/nav"
import './style.css';


const Home = () => {
  return (
    <>
      <div className="container">
        <Nav />
      </div>
      <div className="hero my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-sm">
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
            <p className="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Link to={'/signup-for-student'} type="button" className="btn btn-primary btn-lg px-4 me-md-2">Student</Link>
              <Link to={'/signup-for-recruiter'} type="button" className="btn btn-primary btn-lg px-4">Recruiter</Link>
              <Link to={'/signup-for-coordinator'} type="button" className="btn btn-primary btn-lg px-4">Coordinator</Link>
              <button type="button" className="btn btn-primary btn-lg px-4">Verify</button>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
            <img className="rounded-lg-3" src="https://ugcmmttc.uoc.ac.in/images/banner_3.jpg" alt="Hero banner" width="720"/>
          </div>
        </div>
      </div>
      <h1 className="m-b-xs text-center"><strong>Recent placement</strong></h1>
      <div className="container bg-light">
        <div className="row">
          <div className="col-md-3">
            <div className="contact-box center-version">
              <a href="#profile.html">
                <img alt="John Smith" className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar1.png"/>
                <h3 className="m-b-xs"><strong>John Smith</strong></h3>
                <div className="font-bold">Graphics designer</div>
                <address className="m-t-md">
                  <strong>Twitter, Inc.</strong><br/>
                  795 Folsom Ave, Suite 600<br/>
                  San Francisco, CA 94107<br/>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </a>
              <div className="contact-box-footer">
                <div className="m-t-xs btn-group">
                  <a className="btn btn-xs btn-white"><i className="fa fa-phone"></i> Call</a>
                  <a className="btn btn-xs btn-white"><i className="fa fa-envelope"></i> Email</a>
                
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="contact-box center-version">
              <a href="#profile.html">
                <img alt="John Smith" className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar6.png"/>
                <h3 className="m-b-xs"><strong>John Smith</strong></h3>
                <div className="font-bold">Graphics designer</div>
                <address className="m-t-md">
                  <strong>Twitter, Inc.</strong><br/>
                  795 Folsom Ave, Suite 600<br/>
                  San Francisco, CA 94107<br/>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </a>
              <div className="contact-box-footer">
                <div className="m-t-xs btn-group">
                  <a className="btn btn-xs btn-white"><i className="fa fa-phone"></i> Call</a>
                  <a className="btn btn-xs btn-white"><i className="fa fa-envelope"></i> Email</a>
                
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="contact-box center-version">
              <a href="#profile.html">
                <img alt="John Smith" className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png"/>
                <h3 className="m-b-xs"><strong>John Smith</strong></h3>
                <div className="font-bold">Graphics designer</div>
                <address className="m-t-md">
                  <strong>Twitter, Inc.</strong><br/>
                  795 Folsom Ave, Suite 600<br/>
                  San Francisco, CA 94107<br/>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </a>
              <div className="contact-box-footer">
                <div className="m-t-xs btn-group">
                  <a className="btn btn-xs btn-white"><i className="fa fa-phone"></i> Call</a>
                  <a className="btn btn-xs btn-white"><i className="fa fa-envelope"></i> Email</a>
                  <a className="btn btn-xs btn-white"><i className="fa fa-user-plus"></i> Follow</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="contact-box center-version">
              <a href="#profile.html">
                <img alt="John Smith" className="img-circle" src="https://bootdey.com/img/Content/avatar/avatar3.png"/>
                <h3 className="m-b-xs"><strong>John Smith</strong></h3>
                <div className="font-bold">Graphics designer</div>
                <address className="m-t-md">
                  <strong>Twitter, Inc.</strong><br/>
                  795 Folsom Ave, Suite 600<br/>
                  San Francisco, CA 94107<br/>
                  <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </a>
              <div className="contact-box-footer">
                <div className="m-t-xs btn-group">
                  <a className="btn btn-xs btn-white"><i className="fa fa-phone"></i> Call</a>
                  <a className="btn btn-xs btn-white"><i className="fa fa-envelope"></i> Email</a>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="container-fuid m-3 ">
        <div className="row">
          {/* Left Section */}
          <div className="col-md-9">
            <div className="bg-light text-secondary px-4 py-5 text-center">
              <div className="py-5">
                <h1 className="display-5 fw-bold text-dark">Why DCMS</h1>
                <div className="col-lg-6 mx-auto">
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


      <div class="footer">
  <footer class="row row-cols-1 row-cols-sm-2 row-cols-md-5 py-5 my-5 border-top">
    <div class="col mb-3">
      <a href="/" class="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      </a>
      <p class="text-body-secondary">© 2024</p>
    </div>

    <div class="col mb-3">

    </div>

    <div class="col mb-3">
      <h5>Section</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Section</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>

    <div class="col mb-3">
      <h5>Section</h5>
      <ul class="nav flex-column">
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Home</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Features</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">Pricing</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">FAQs</a></li>
        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-body-secondary">About</a></li>
      </ul>
    </div>
  </footer>
</div>
    </>
  );
};

export default Home;


  