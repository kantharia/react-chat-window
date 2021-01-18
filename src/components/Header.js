import React, { Component } from "react";
import closeIcon from "./../assets/close-icon.png";

class Header extends Component {
  render() {
    return (
      <div className="sc-header">
        <img className="sc-header--img" src={this.props.imageUrl} alt="" />
        <div className="sc-header--team-name"> {this.props.teamName} </div>
        <div className="" onClick={this.props.onClose}>
          <i className="icon-close-button sc-header-close-button"></i>
        </div>
      </div>
    );
  }
}

export default Header;
