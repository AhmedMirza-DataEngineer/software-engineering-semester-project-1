import React, { Component } from "react";
import "./cssFiles/WhyChooseUs.css";
import whyChooseUs from "../images/whyChooseUs.jpg";
import whyChooseUsTick from "../icons/whyChooseUSTickIcon.png";

export default class WhyChooseUs extends Component {
  render() {
    return (
      <>
        <div className="whyChooseUs">
          <div className="whyChooseUs-left-section">
            <img src={whyChooseUs} alt="Why Choose Us" className="image-fit" />
          </div>
          <div className="whyChooseUs-right-section">
            <h1>Why Choose Us?</h1>
            <div className="whyChooseUs-center-portion">
              <div className="whyChooseUs-grid-container">
                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Innovation</p>
                </div>
                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Perfection</p>
                </div>

                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Foundation</p>
                </div>
                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Restoration</p>
                </div>
                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Transformation</p>
                </div>

                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Customization</p>
                </div>
                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Dedication</p>
                </div>

                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Satisfaction</p>
                </div>
                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Elevation</p>
                </div>

                <div className="whyChooseUs-grid-item">
                  <img src={whyChooseUsTick} alt="" />
                  <p>Creation</p>
                </div>
              </div>
            </div>
            <div className="last-box">
              <div className="left-content">
                <p>Call for a Quote</p>
              </div>
              <div className="right-content">
                <p>+92 346 4583675</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
