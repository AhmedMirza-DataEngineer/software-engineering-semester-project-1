import React, { Component } from "react";
import NavigationBar from "./NavigationBar";
import "./cssFiles/ProjectNextPage.css";
import img1 from "../images/projectsNextPgImg1.png";
import img2 from "../images/projectsNextPgImg2.png";
import Footer from "./Footer";

export default class ProjectsNextPage extends Component {
  render() {
    return (
      <>
        <NavigationBar />
        <div className="projects-next-hero">
          <h1>Projects</h1>
        </div>
        <div className="projects-next-page">
          <div className="projects-next-">
            <div className="projects-next-grid-container">
              <div>
                <img src={img1} alt="Project1" />
              </div>

              <div className="projects-next-grid-cell">
                <h1>Squash Complex</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                  justo. Nullam dictum felis eu pede mollis pretium. Integer
                  tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                  vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                  nulla ut metus varius laoreet. Quisque rutrum. Aenean
                  imperdiet. Etiam ultricies
                </p>
              </div>

              <div
                className="projects-next-grid-cell"
                id="projects-next-grid-right"
              >
                <h1>Johar Town House</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                  natoque penatibus et magnis dis parturient montes, nascetur
                  ridiculus mus. Donec quam felis, ultricies nec, pellentesque
                  eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu.
                  In enim justo, rhoncus ut, imperdiet a, venenatis vitae,
                  justo. Nullam dictum felis eu pede mollis pretium. Integer
                  tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean
                  vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim. Aliquam lorem ante,
                  dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                  nulla ut metus varius laoreet. Quisque rutrum. Aenean
                  imperdiet. Etiam ultricies
                </p>
              </div>

              <div>
                <img src={img2} alt="projects2" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
}
