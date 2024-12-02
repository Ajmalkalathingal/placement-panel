import { useEffect, useState } from "react";
import api from "../../api";

const Blog = () => {
  const [placementEvents, setPlacementEvents] = useState([]);

  const getPlacementEvents = async () => {
    try {
      const response = await api.get("api/list-events/");
      if (response.data && response.data.results) {
        setPlacementEvents(response.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlacementEvents(), [];
  });
  return (
    <>
      <section className="blog_section layout_padding">
        <div className="container">
          <div className="heading_container">
            <h2>Latest Updates</h2>
          </div>
          <div className="row">
            {placementEvents.map((event, index) => (
              <div key={index} className="col-md-6 col-lg-4 mx-auto">
                <div className="box">
                  <div className="img-box">
                    <img
                      src={event.image || "images/default.jpg"}
                      alt
                    />
                  </div>
                  <div className="detail-box">
                    <h5>{event.title}</h5>
                    <p>
                    {event.description}
                    </p>
                    <p>
                    <strong>Date:</strong> {new Date(event.event_date).toLocaleDateString()}
                  </p>
                    <a href>Read More</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
