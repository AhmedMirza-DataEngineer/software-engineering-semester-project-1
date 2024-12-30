import React, { Component } from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./cssFiles/HeroSection.css";
import pIcon from "../icons/HeroSectionLeftIcon.png";
import contractorIcon from "../icons/HeroContractorIcon.png";
import constructionIcon from "../icons/HeroConstructionIcon.png";
import renovationIcon from "../icons/HeroRenovationIcon.png";

export default class HeroSection extends Component {
  render() {
    return (
      <>
        <div className="hero-section" id="hero">
          <div className="left-section">
            <div className="iconP">
              <img
                className="pIcon"
                src={pIcon}
                alt="We Provide Construction & Renovation Services"
              />
              <p>We Provide Construction & Renovation Services</p>
            </div>

            <h1>
              We Are Professional <br /> Quality Services
            </h1>
            <div className="scroll-button" id="HeroButton">
              <Link smooth to="/#projects">
                <button className="HeroButton">VIEW OUR WORK</button>
              </Link>
            </div>
          </div>
          <div className="right-section">
            <h1>Join Us</h1>
            <p>
              Join the community and experience <br />
              more with a single click
            </p>
            <div className="allTextIcons">
              <div className="textIcon">
                <img src={contractorIcon} alt="Contractor Icon" />
                <p>Contractor</p>
              </div>
              <div className="textIcon">
                <img src={constructionIcon} alt="Construction Icon" />
                <p>Construction</p>
              </div>
              <div className="textIcon">
                <img src={renovationIcon} alt="Renovation Icon" />
                <p>Renovation</p>
              </div>
            </div>
            <div id="rightBtns">
              <div className="scroll-button" id="loginBtn">
                <Link to="/login">
                  <button>LOGIN</button>
                </Link>
              </div>
              <div className="scroll-button" id="signupBtn">
                <Link to="/signup">
                  <button>SIGNUP</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
