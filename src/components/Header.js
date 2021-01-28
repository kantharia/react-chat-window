import React, { Component } from "react";
import closeIcon from "./../assets/close-icon.png";

class Header extends Component {
  render() {
    let { colors } = this.props;
    let { secondary, headerBg, headerText } = colors;
    return (
      <div className="sc-header" style={{ backgroundColor: headerBg }}>
        <img className="sc-header--img" src={this.props.imageUrl} alt="" />
        <div className="sc-header--team-name" style={{ color: headerText }}>
          {" "}
          {this.props.teamName}{" "}
        </div>
        <div className="" onClick={this.props.onClose}>
          <i
            className="icon-close-button sc-header-close-button"
            style={{
              top: "0px",
              color: secondary,
            }}
          ></i>
        </div>
      </div>
    );
  }
}

export default Header;
