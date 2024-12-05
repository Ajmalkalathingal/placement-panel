const ContactUs = () => {
    return <>
            <div id="contact" className="container contact-area section-padding border">
          <div className="container">										
            <div className="section-title text-center">
              <h1>Contact us</h1>
            </div>					
            <div className="row">
              <div className="col-lg-7">	
                <div className="contact">
                  <form className="form" name="enq" method="post" action="contact.php" onsubmit="return validation();">
                    <div className="row">
                      <div className="form-group col-md-6">
                        <input type="text" name="name" className="form-control" placeholder="Name" required="required" />
                      </div>
                      <div className="form-group col-md-6">
                        <input type="email" name="email" className="form-control" placeholder="Email" required="required" />
                      </div>
                      <div className="form-group col-md-12">
                        <input type="text" name="subject" className="form-control" placeholder="Subject" required="required" />
                      </div>
                      <div className="form-group col-md-12">
                        <textarea rows={6} name="message" className="form-control" placeholder="Your Message" required="required" defaultValue={""} />
                      </div>
                      <div className="col-md-12 text-center">
                        <button type="submit" className="btn btn-contact-bg text-center" title="Submit Your Message!">Send Message</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>{/*- END COL */} 
              <div className="col-lg-5">
                <div className="single_address">
                  <i className="fa fa-map-marker" />
                  <h4>Our Address</h4>
                  <p>3481 Melrose Place, Beverly Hills</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-envelope" />
                  <h4>Send your message</h4>
                  <p>Info@example.com</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-phone" />
                  <h4>Call us on</h4>
                  <p>(+1) 517 397 7100</p>
                </div>
                <div className="single_address">
                  <i className="fa fa-clock-o" />
                  <h4>Work Time</h4>
                  <p>Mon - Fri: 08.00 - 16.00. <br />Sat: 10.00 - 14.00</p>
                </div>					
              </div>{/*- END COL */} 
            </div>{/*- END ROW */}
          </div>{/*- END CONTAINER */}	
        </div>
        </>
}

export default ContactUs;