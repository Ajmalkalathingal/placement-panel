const RHome = ({profile}) => {
  return (
    <>
      <div className="">
        <div className="card">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  value={`${profile.user.first_name} ${profile.user.last_name}`}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  value={profile.user.email}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Phone</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  value={profile.contact_number}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Position</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  value={profile.position}
                  readOnly
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-3">
                <h6 className="mb-0">Company</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="text"
                  className="form-control"
                  value={profile.company_name}
                  readOnly
                />
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3"></div>
              <div className="col-sm-9 text-secondary">
                <input
                  type="button"
                  className="btn btn-primary px-4"
                  value="Save Changes"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row gutters-sm">
          <div className="col-sm-6 mb-3">
            <div className="card h-100">
              <div className="card-body"></div>
            </div>
          </div>
          <div className="col-sm-6 mb-3">
            <div className="card h-100">
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RHome