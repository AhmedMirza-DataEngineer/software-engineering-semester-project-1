import React, { Component } from "react";
import "./cssFiles/NoProjectTooBig.css";
import noProjectTooBigVideo from "../videos/noProjectTooBigVideo.mp4";
import noProjectTooBigIcon from "../icons/noProjectTooBigLineIcon.png";

export default class NoProjectTooBig extends Component {
  render() {
    return (
      <>
        <div className="no-project-container">
          <div className="video-section">
            <video autoPlay muted loop>
              <source src={noProjectTooBigVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <div className="noProjectTooBig-second-section">
            <div className="text-section">
              <h1>No Project Too Big Or Too Small</h1>
              <img src={noProjectTooBigIcon} alt="Underline" />
              <p id="special-p-element-in-npproject">
                Turning Visions into Reality, Regardless of Size
              </p>
              <p>
                Size doesn't define our dedication. Whether it's a grand
                commercial undertaking or a small-scale renovation, we approach
                every project with unwavering commitment. We understand that
                each endeavor, regardless of its scale, is significant to our
                clients. Our skilled team ensures that your vision comes to
                life, catering to your unique needs, timeline, and budget. Your
                project's success is our top priority, no matter the size
              </p>
            </div>
            <div className="bottom-sections">
              <div className="bottom-section section1">
                <h3 className="section1-h3">
                  20+
                  <br />
                  <span className="lower">YEARS ESTABLISH</span>
                </h3>
              </div>
              <div className="bottom-section section2">
                <h3 className="section1-h3">
                  250+
                  <br />
                  <span className="lower">COMPLETED PROJECTS</span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
