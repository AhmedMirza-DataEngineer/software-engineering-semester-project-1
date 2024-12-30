import React, { Component } from "react";
import "./cssFiles/AboutUs.css";
import aboutUsImg from "../images/aboutUsImg.png";
import aboutUsIcon from "../icons/noProjectTooBigLineIcon.png";
export default class AboutUs extends Component {
  render() {
    return (
      <>
        <div className="aboutUs-section" id="aboutUs">
          <div className="about-us-container">
            <div className="about-us-left">
              <h1>About Us</h1>
              <img src={aboutUsIcon} alt="About Us" />
              <p>
                At SiteCraft Solutions, we are more than just a construction and
                renovation company; we are your partners in realizing your
                vision. With a passion for craftsmanship and an unwavering
                commitment to quality, we've been dedicated to transforming
                spaces and bringing dreams to life for [number] years. Our team
                of experts takes pride in the art of construction and
                renovation, combining innovation with experience to deliver
                exceptional results. From concept to completion, we work closely
                with our clients, turning their ideas into tangible reality. Our
                mission is to build not just structures but lasting
                relationships, and we do it one project at a time.
              </p>
            </div>
            <div className="about-us-right">
              <img src={aboutUsImg} alt="About Us" />
            </div>
          </div>
        </div>
      </>
    );
  }
}
