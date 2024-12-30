import React, { Component } from "react";
import "./cssFiles/QuoteSection.css";
import quoteOpen from "../icons/QuoteOpenComma.png";
import quoteClose from "../icons/QuoteCloseComma.png";

export default class Quote extends Component {
  render() {
    return (
      <>
        <div className="quote-Section">
          <img src={quoteOpen} alt="Quote Comma" />
          <h1>
            Turning Dreams into Reality,
            <br /> One Brick at a Time.
          </h1>
          <img id="close-Comma" src={quoteClose} alt="Quote Comma" />
        </div>
      </>
    );
  }
}
