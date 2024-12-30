import React, { Component } from "react";
// import { Link as RouteLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
// import Link from "next/link";
import "./cssFiles/NavigationBar.css";
import CLogo from "../images/logo sitecraft solutions.png";
import CLogoText from "../images/logo sitecraft text only.png";

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMobileMenu: false,
      isSticky: false,
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    if (window.scrollY > 100) {
      this.setState({ isSticky: true });
    } else {
      this.setState({ isSticky: false });
    }
  };
  toggleMobileMenu = () => {
    this.setState((prevState) => ({
      showMobileMenu: !prevState.showMobileMenu,
    }));
  };

  render() {
    const { isSticky } = this.state;
    return (
      <>
        <nav className={`${isSticky ? "sticky" : ""}`}>
          <div className="navbar">
            <div className="left-side">
              <Link to="/">
                <img src={CLogo} alt="Logo" className="logo" />
                <img src={CLogoText} alt="Logo" className="logo" />
              </Link>
            </div>
            <div className="right-side">
              <div className="hover-links">
                <Link smooth to="/#hero">
                  Home
                </Link>
                <Link smooth to="/#calculator">
                  Calculator
                </Link>
                <Link smooth to="/#services">
                  Services
                </Link>
                <Link smooth to="/#projects">
                  Projects
                </Link>
                <Link smooth to="/#aboutUs">
                  About Us
                </Link>
              </div>
              <div
                className="mobile-menu-button"
                onClick={this.toggleMobileMenu}
              >
                ☰
              </div>
              {this.state.showMobileMenu && (
                <div className="mobile-menu">
                  <a href="/">Home</a>
                  <a href="/">Calculator</a>
                  <a href="/">Services</a>
                  <a href="/">Projects</a>
                  <a href="/">About Us</a>
                </div>
              )}
              <div className="scroll-button">
                <Link smooth to="/#footer">
                  <button onClick={this.handleScrollToFooter}>
                    Have Any Questions?
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </>
    );
  }
}
