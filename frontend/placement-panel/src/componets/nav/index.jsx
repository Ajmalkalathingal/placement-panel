const Nav = () => {
  return (
    <>
      <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          {/* University Image */}
          <img
            src={'src/assets/images/logo2.png'}
            alt="University Logo"
            width="40"
            height="40"
            className="me-2"
          />
          <span className="fs-4">Placement Cell DCMS</span> 
        </a>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Features
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              FAQs
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              About
            </a>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Nav;
