import React, { Component } from "react";
import "./cssFiles/OurServices.css";
import ourService1 from "../images/ourServices1Img.png";
import ourService2 from "../images/ourServices2Img.png";
import ourService3 from "../images/ourServices3Img.png";
import ourServicesIcon from "../icons/servicesArrowIcon.png";

export default class OurServices extends Component {
  render() {
    return (
      <>
        <div className="services-body" id="services">
          <div className="our-services-container">
            <h1>Our Services</h1>
            <div className="services-grid">
              {/* Service 1 */}
              <div className="service-item">
                <img src={ourService1} alt="Out Services Home" />
              </div>

              <div className="service-item">
                <div className="inner-services">
                  <h3>House Construction</h3>
                  <p>
                    Our house construction service is dedicated to turning your
                    dream home into a tangible reality. We combine innovative
                    design, quality materials, and expert craftsmanship to
                    create a space that truly reflects your unique vision. From
                    the initial blueprint to the final finishing touches, we're
                    committed to building the perfect home for you.
                  </p>
                  <button className="services-btn">
                    Learn More
                    <img src={ourServicesIcon} alt="Arrow Our services" />
                  </button>
                </div>
              </div>

              {/* Service 2 */}
              <div id="service-item-2" className="service-item">
                <div className="inner-services">
                  <h3>Building Construction</h3>
                  <p>
                    Our building construction service is tailored to meet the
                    commercial needs of your business. With a focus on precision
                    and efficiency, we bring your projects to life. Whether you
                    require a new office space, retail establishment, or any
                    other commercial structure, our team is equipped to provide
                    innovative design and reliable construction solutions.
                  </p>
                  <button className="services-btn">
                    Learn More
                    <img src={ourServicesIcon} alt="Arrow Our services" />
                  </button>
                </div>
              </div>

              <div className="service-item">
                <img src={ourService2} alt="Our Services Building" />
              </div>

              {/* Service 3 */}
              <div className="service-item">
                <img src={ourService3} alt="Out Services Home" />
              </div>

              <div className="service-item">
                <div className="inner-services">
                  <h3>Renovations</h3>
                  <p>
                    Our renovation service is all about revitalizing and
                    transforming spaces. We take pride in breathing new life
                    into homes and businesses. Whether you're looking to update
                    an outdated area, enhance functionality, or modernize your
                    property, our renovation expertise is dedicated to
                    delivering the results you envision, one project at a time.
                  </p>
                  <button className="services-btn">
                    Learn More
                    <img src={ourServicesIcon} alt="Arrow Our services" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
