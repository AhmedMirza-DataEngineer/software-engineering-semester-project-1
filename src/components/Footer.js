import React, { Component } from "react";
import emailjs from "emailjs-com";
import "./cssFiles/Footer.css";
import footerLineIcon from "../icons/footerLineIcon.png";
import facebookIcon from "../icons/footerFacebookIcon.png";
import locationIcon from "../icons/footerLocationIcon.png";
import mailIcon from "../icons/footerMailIcon.png";
import phoneIcon from "../icons/footerPhoneIcon.png";
import twitterIcon from "../icons/footerTwitterIcon.png";
import linkedinIcon from "../icons/footerLinkedInIcon.png";
export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showThankYou: false,
      showError: false,
    };
  }

  sendEmail = (e) => {
    e.preventDefault();
    console.log("sending mail");
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    console.log(name, email, message);
    if (!this.validateForm(name, email, message)) {
      this.setState({ showError: true, showThankYou: false });
      return;
    }

    const serviceId = "service_sarzndn";
    const templateId = "template_9j48hav";
    const userId = "WHGVkEkru6MfUng00";
    console.log(serviceId, templateId, userId);
    emailjs
      .send(serviceId, templateId, { name, email, message }, userId)
      .then(() => {
        this.setState({ showThankYou: true, showError: false });
        console.log("email");
        this.clearForm();
      })
      .catch(() => {
        console.log("error");
        this.setState({ showError: true, showThankYou: false });
      });
  };

  validateForm = (name, email, message) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return name && email && message && emailRegex.test(email);
  };

  clearForm = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  };

  render() {
    return (
      <>
        <div className="footer-container" id="footer">
          <div className="left-footer">
            <div className="footer-left-content">
              <h1>Contact Us</h1>
              <img src={footerLineIcon} alt="tick img" />
              <form>
                <div className="footer-form-group">
                  <label htmlFor="name">Name:</label>
                  <input type="text" id="name" placeholder="" />
                </div>
                <div className="footer-form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" placeholder="" />
                </div>
                <div className="footer-form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    name="message"
                    id="message"
                    placeholder=""
                  ></textarea>
                </div>
                <button className="footer-btn" onClick={this.sendEmail}>
                  Send Message
                </button>
                {this.state.showError && (
                  <div style={{ color: "red" }}>
                    Invalid entry. Please fill in all fields with valid
                    information.
                  </div>
                )}
                {this.state.showThankYou && (
                  <div style={{ color: "green" }}>
                    Thank you! Your email has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="right-footer">
            <div className="upper-right">
              <div>
                <img
                  src={facebookIcon}
                  alt="facebook"
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/Umar.fayyaz.545",
                      "_blank"
                    )
                  }
                />
              </div>
              <div>
                <img
                  src={twitterIcon}
                  alt="twitter"
                  onClick={() =>
                    window.open("https://twitter.com/umeree_fayyaz", "_blank")
                  }
                />
              </div>
              <div>
                <img
                  src={linkedinIcon}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/muhammad-umar-fayyaz-38245b242/",
                      "_blank"
                    )
                  }
                  alt="linkedIn"
                />
              </div>
            </div>
            <div className="lower-right">
              <div className="small-lower-right">
                <div className="flex-lower-right">
                  <img id="locationIcon" src={locationIcon} alt="location" />
                  <p>University of Engineering & Technology, Lahore</p>
                </div>
                <div className="flex-lower-right">
                  <img id="phoneIcon" src={phoneIcon} alt="phone" />
                  <p>
                    Call us at <a href="tel:+923464583675">+923464583675</a>
                  </p>
                </div>
                <div className="flex-lower-right">
                  <img id="emailIcon" src={mailIcon} alt="email" />
                  <p>
                    <a href="mailto:umarfayyaz010@gmail.com">
                      umarfayyaz010@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
