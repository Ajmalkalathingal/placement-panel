import { Link } from "react-router-dom";
import Nav from "../../componets/nav"
import './style.css';

const Home = () => {
    return (
      <>
        <div className="container">
          <Nav />
        </div>
        <div class="hero my-5">
    <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
      <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
        <h1 class="display-4 fw-bold lh-1 text-body-emphasis">Border hero with cropped image and shadows</h1>
        <p class="lead">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
          <Link to={'/signup-for-student'} type="button" class="btn btn-primary btn-lg px-4 me-md-2 " fdprocessedid="wpmzpd">Student</Link>
          <Link to={'/signup-for-ricruter'} type="button" class="btn btn-primary btn-lg px-4" fdprocessedid="m69i5w">Rricruter</Link>
          <button type="button" class="btn btn-primary btn-lg px-4 me-md-2 " fdprocessedid="wpmzpd">coordinator</button>
          <button type="button" class="btn btn-primary btn-lg px-4" fdprocessedid="m69i5w">Verify</button>
        </div>
      </div>
      <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
          <img class="rounded-lg-3" src="https://ugcmmttc.uoc.ac.in/images/banner_3.jpg" alt="" width="720"/>
      </div>
    </div>
  </div>

      </>
    );
  };
  
  export default Home;

  