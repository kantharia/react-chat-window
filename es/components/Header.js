function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from "react";
import closeIcon from "./../assets/close-icon.png";

var Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    var colors = this.props.colors;
    var secondary = colors.secondary,
        headerBg = colors.headerBg,
        headerText = colors.headerText;

    return React.createElement(
      "div",
      { className: "sc-header", style: { backgroundColor: headerBg } },
      React.createElement("img", { className: "sc-header--img", src: this.props.imageUrl, alt: "" }),
      React.createElement(
        "div",
        { className: "sc-header--team-name", style: { color: headerText } },
        " ",
        this.props.teamName,
        " "
      ),
      React.createElement(
        "div",
        { className: "", onClick: this.props.onClose },
        React.createElement("i", {
          className: "icon-close-button sc-header-close-button",
          style: { top: "0px", color: secondary }
        })
      )
    );
  };

  return Header;
}(Component);

export default Header;