function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import PropTypes from "prop-types";
import React, { Component } from "react";
import ChatWindow from "./ChatWindow";
import launcherIcon from "./../assets/logo-no-bg.svg";
import incomingMessageSound from "./../assets/sounds/notification.mp3";
import launcherIconActive from "./../assets/close-icon.png";
import "./../assets/css/intro-social-icons.css";

var Launcher = function (_Component) {
  _inherits(Launcher, _Component);

  function Launcher(props) {
    _classCallCheck(this, Launcher);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      launcherIcon: launcherIcon,
      isOpen: false,
      colors: props.colors || {}
    };
    return _this;
  }

  Launcher.prototype.UNSAFE_componentWillReceiveProps = function UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.mute) {
      return;
    }
    var nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    var isIncoming = (nextMessage || {}).author === "them";
    var isNew = nextProps.messageList.length > this.props.messageList.length;
    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  };

  Launcher.prototype.playIncomingMessageSound = function playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  };

  Launcher.prototype.handleClick = function handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
  };

  Launcher.prototype.render = function render() {
    var colors = this.state.colors;
    var primary = colors.primary,
        secondary = colors.secondary;


    var isOpen = this.props["isOpen"] ? this.props.isOpen : this.state.isOpen;
    // const classList = ["sc-launcher", isOpen ? "opened" : ""];
    return React.createElement(
      "div",
      { id: "sc-launcher" },
      React.createElement(
        "div",
        {
          // className={classList.join(" ")}
          onClick: this.handleClick.bind(this),
          style: {
            height: "60px",
            width: "60px",
            borderRadius: "50%",
            backgroundColor: primary || "#888888",
            position: "fixed",
            bottom: "25px",
            right: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: isOpen ? "1px 1px 15px rgba(136,136,136,0.5)" : "none"
          }
        },
        React.createElement(MessageCount, { count: this.props.newMessagesCount, isOpen: isOpen }),
        React.createElement(
          "div",
          { style: { marginTop: "5px" } },
          isOpen ? React.createElement("i", {
            className: "icon-close-button sc-cloud-icon",
            style: { fontSize: "24pt", color: secondary }
          }) : React.createElement("i", {
            className: "icon-chat-widget-cloud sc-close-icon",
            style: {
              fontSize: "24pt",
              color: secondary
            }
          })
        )
      ),
      React.createElement(ChatWindow, {
        messageList: this.props.messageList,
        onUserInputSubmit: this.props.onMessageWasSent,
        onFilesSelected: this.props.onFilesSelected,
        agentProfile: this.props.agentProfile,
        isOpen: isOpen,
        onClose: this.handleClick.bind(this),
        showEmoji: this.props.showEmoji,
        showFilePicker: this.props.showFilePicker,
        colors: colors || {}
      })
    );
  };

  return Launcher;
}(Component);

var MessageCount = function MessageCount(props) {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return React.createElement(
    "div",
    { className: "sc-new-messages-count" },
    props.count
  );
};

Launcher.propTypes = process.env.NODE_ENV !== "production" ? {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool
} : {};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true
};

export default Launcher;