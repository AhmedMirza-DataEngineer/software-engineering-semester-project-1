import React, { Component } from "react";

import "./cssFiles/Calculator.css";
import calculatorIcon1 from "../icons/CalculatorIcon1.png";
import calculatorIcon2 from "../icons/CalculatorIcon2.png";
import calculatorIcon3 from "../icons/CalculatorIcon3.png";
import calculatorIcon11 from "../icons/CalculatorIcon11.png";
import calculatorIcon22 from "../icons/CalculatorIcon22.png";
import calculatorIcon33 from "../icons/CalculatorIcon33.png";
export default class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "Commercial",
      floatValue: 3,
      floors: 1,
      result: 0 + " Million",
    };
  }
  handleCategoryChange = (event) => {
    this.setState({ category: event.target.value });
  };

  handleFloatValueChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      this.setState({ floatValue: Math.abs(inputValue) });
    }
  };

  handleFloorsChange = (event) => {
    const inputValue = parseFloat(event.target.value);
    if (!isNaN(inputValue)) {
      this.setState({ floors: Math.abs(inputValue) });
    }
  };
  toggleContainer = () => {
    // Find the elements with the relevant classes
    const timeContainer = document.querySelector(".whenTimeOpen");
    const costContainer = document.querySelector(".whenCostOpen");

    // Toggle the "hidden" class on the containers
    timeContainer.classList.toggle("hidden");
    costContainer.classList.toggle("hidden");
  };
  calculateCost = () => {
    const { category, floatValue, floors } = this.state;

    let result = 0;

    if (category === "Commercial") {
      if (floatValue <= 5) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.2 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.5 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.8 * floors + " Millions";
        }
      } else if (floatValue <= 10) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.3 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.4 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.6 * floors + " Millions";
        }
      } else if (floatValue <= 20) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.3 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.4 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.5 * floors + " Millions";
        }
      } else if (floatValue > 20) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.4 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.5 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.6 * floors + " Millions";
        }
      }
    } else if (category === "Residential") {
      if (floatValue <= 5) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.2 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.3 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.3 * floors + " Millions";
        }
      } else if (floatValue <= 10) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.3 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.4 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.5 * floors + " Millions";
        }
      } else if (floatValue <= 20) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.4 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.5 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.6 * floors + " Millions";
        }
      } else if (floatValue > 20) {
        if (floors === 1) {
          result = "≈ " + floatValue * 0.4 * floors + " Millions";
        } else if (floors <= 3) {
          result = "≈ " + floatValue * 0.5 * floors + " Millions";
        } else if (floors <= 5) {
          result = "≈ " + floatValue * 0.6 * floors + " Millions";
        }
      }
    }

    console.log(result);
    // Display the result
    this.setState({ result });
  };
  calculateTime = () => {
    const { category, floatValue, floors } = this.state;

    let result = 0;

    if (category === "Commercial") {
      if (floatValue <= 5) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.1 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.15 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.18 * floors).toFixed(1) + " Months";
        }
      } else if (floatValue <= 10) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.2 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.25 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.28 * floors).toFixed(1) + " Months";
        }
      } else if (floatValue <= 20) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.3 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.35 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.4 * floors).toFixed(1) + " Months";
        }
      } else if (floatValue > 20) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.42 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.46 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.5 * floors).toFixed(1) + " Months";
        }
      }
    } else if (category === "Residential") {
      if (floatValue <= 5) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.135 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.15 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.18 * floors).toFixed(1) + " Months";
        }
      } else if (floatValue <= 10) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.21 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.22 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.23 * floors).toFixed(1) + " Months";
        }
      } else if (floatValue <= 20) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.31 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.33 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.35 * floors).toFixed(1) + " Months";
        }
      } else if (floatValue > 20) {
        if (floors === 1) {
          result = "≈ " + (floatValue * 0.41 * floors).toFixed(1) + " Months";
        } else if (floors <= 3) {
          result = "≈ " + (floatValue * 0.43 * floors).toFixed(1) + " Months";
        } else if (floors <= 5) {
          result = "≈ " + (floatValue * 0.45 * floors).toFixed(1) + " Months";
        }
      }
    }

    // Display the result
    this.setState({ result });
  };
  render() {
    const { category, floatValue, floors, result } = this.state;

    return (
      <>
        <div id="calculator" className="bdy">
          <div className="container">
            <h1>Calculator</h1>
            <div className="calculator-body whenCostOpen">
              <div className="cost openCost ">
                <h2>Cost</h2>
                <div className="fields">
                  <div className="form-group">
                    <label htmlFor="options">Category</label>
                    <div className="input-container">
                      <select
                        id="options"
                        name="Commercial"
                        onChange={this.handleCategoryChange}
                        value={category}
                      >
                        <option value="Commercial">Commercial Building</option>
                        <option value="Residential">Residential House</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="floatValue">Area (Marla)</label>
                    <div className="input-container">
                      <input
                        type="number"
                        id="floatValue"
                        name="floatValue"
                        step="1"
                        min="3"
                        onChange={this.handleFloatValueChange}
                        value={floatValue}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="multipleOptions">Floors</label>
                    <div className="input-container">
                      <select
                        id="multipleOptions"
                        name="multipleOptions"
                        onChange={this.handleFloorsChange}
                        value={floors}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <button id="calculateButton" onClick={this.calculateCost}>
                      Calculate
                    </button>

                    <div className="output-container">
                      <div id="result" className="output">
                        {result}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="time closeTime" onClick={this.toggleContainer}>
                <h2>Time</h2>
                <div className="icons">
                  <img src={calculatorIcon1} alt="Category" />
                  <img src={calculatorIcon2} alt="Area" />
                  <img src={calculatorIcon3} alt="Floors" />
                </div>
              </div>
            </div>
            <div className="calculator-body whenTimeOpen hidden">
              <div className="cost closeCost" onClick={this.toggleContainer}>
                <h2 id="case1">Cost</h2>
                <div className="icons">
                  <img src={calculatorIcon11} alt="Category" />
                  <img src={calculatorIcon22} alt="Area" />
                  <img src={calculatorIcon33} alt="Floors" />
                </div>
              </div>
              <div className="cost openTime">
                <h2 id="case2">Cost</h2>
                <div className="fields">
                  <div className="form-group">
                    <label htmlFor="options">Category</label>
                    <div className="input-container">
                      <select
                        id="options"
                        name="Commercial"
                        onChange={this.handleCategoryChange}
                        value={category}
                      >
                        <option value="Commercial">Commercial Building</option>
                        <option value="Residential">Residential House</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="floatValue">Area (Marla)</label>
                    <div className="input-container">
                      <input
                        type="number"
                        id="floatValue"
                        name="floatValue"
                        step="1"
                        min="3"
                        onChange={this.handleFloatValueChange}
                        value={floatValue}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="multipleOptions">Floors</label>
                    <div className="input-container">
                      <select
                        id="multipleOptions"
                        name="multipleOptions"
                        onChange={this.handleFloorsChange}
                        value={floors}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <button id="calculateButton" onClick={this.calculateTime}>
                      Calculate
                    </button>

                    <div className="output-container">
                      <div id="result" className="output">
                        {result}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
