import React, { Component } from "react";
import "./cssFiles/Projects.css";
import projectImage1 from "../images/projectsImg1.png";
import projectImage2 from "../images/projectsImg2.png";
import projectImage3 from "../images/projectsImg3.png";
import projectsPlusIcon from "../icons/projectsPlusIcon.png";
import { Link } from "react-router-dom";

export default class Projects extends Component {
  render() {
    return (
      <>
        <section className="projects-container" id="projects">
          <h1>Projects</h1>
          <div className="projects-container-section">
            <Link to="/projects">
              <div className="project-image-container">
                <img
                  className="project-images-for"
                  src={projectImage1}
                  alt="project 1"
                />

                <div className="project-overlay">
                  <p>COMMERCIAL</p>
                  <h3>Sports Complex</h3>
                  <img
                    className="project-images-for"
                    src={projectsPlusIcon}
                    alt="plus icon"
                  />
                </div>
              </div>
            </Link>
            <Link to="/projects">
              <div className="project-image-container">
                <img
                  className="project-images-for"
                  src={projectImage2}
                  alt="project 1"
                />
                <div className="project-overlay">
                  <p>COMMERCIAL</p>
                  <h3>Squash Complex</h3>
                  <img
                    className="project-images-for"
                    src={projectsPlusIcon}
                    alt="plus icon"
                  />
                </div>
              </div>
            </Link>{" "}
            <Link to="/projects">
              <div className="project-image-container">
                <img
                  className="project-images-for"
                  src={projectImage3}
                  alt="project 2"
                />
                <div className="project-overlay">
                  <p>RESIDENTIAL</p>
                  <h3>Johar Town</h3>
                  <img
                    className="project-images-for"
                    src={projectsPlusIcon}
                    alt="plus icon"
                  />
                </div>
              </div>
            </Link>
          </div>{" "}
          <Link to="/projects">
            <button className="projects-btn">VIEW ALL</button>{" "}
          </Link>
        </section>
      </>
    );
  }
}
