import PropTypes from "prop-types";
import React, { Component } from "react";
import ChatWindow from "./ChatWindow";
import launcherIcon from "./../assets/logo-no-bg.svg";
import incomingMessageSound from "./../assets/sounds/notification.mp3";
import launcherIconActive from "./../assets/close-icon.png";
import "./../assets/css/intro-social-icons.css";

class Launcher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      launcherIcon,
      isOpen: false,
      colors: props.colors || {},
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.mute) {
      return;
    }
    const nextMessage = nextProps.messageList[nextProps.messageList.length - 1];
    const isIncoming = (nextMessage || {}).author === "them";
    const isNew = nextProps.messageList.length > this.props.messageList.length;
    if (isIncoming && isNew) {
      this.playIncomingMessageSound();
    }
  }

  playIncomingMessageSound() {
    var audio = new Audio(incomingMessageSound);
    audio.play();
  }

  handleClick() {
    if (this.props.handleClick !== undefined) {
      this.props.handleClick();
    } else {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }

  render() {
    let { colors } = this.state;
    let { primary, secondary } = colors;

    const isOpen = this.props["isOpen"] ? this.props.isOpen : this.state.isOpen;
    // const classList = ["sc-launcher", isOpen ? "opened" : ""];
    return (
      <div id="sc-launcher">
        <div
          // className={classList.join(" ")}
          onClick={this.handleClick.bind(this)}
          style={{
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
            boxShadow: isOpen ? "1px 1px 15px rgba(136,136,136,0.5)" : "none",
          }}
        >
          <MessageCount count={this.props.newMessagesCount} isOpen={isOpen} />
          <div style={{ paddingTop: "10px" }}>
            {isOpen ? (
              <i
                className="icon-close-button sc-cloud-icon"
                style={{
                  fontSize: "14pt",
                  color: secondary,
                }}
              ></i>
            ) : (
              <i
                className="icon-chat-widget-cloud sc-close-icon"
                style={{
                  fontSize: "24pt",
                  color: secondary,
                }}
              ></i>
            )}
          </div>
          {/* <div style={{backgroundColor:"red"}}>
            <i className="icon-close-button sc-open-icon sc-cloud-icon"></i>
            <i className="icon-chat-widget-cloud sc-closed-icon sc-close-icon"></i>
          </div> */}
        </div>
        <ChatWindow
          messageList={this.props.messageList}
          onUserInputSubmit={this.props.onMessageWasSent}
          onFilesSelected={this.props.onFilesSelected}
          agentProfile={this.props.agentProfile}
          isOpen={isOpen}
          onClose={this.handleClick.bind(this)}
          showEmoji={this.props.showEmoji}
          showFilePicker={this.props.showFilePicker}
          colors={colors || {}}
        />
      </div>
    );
  }
}

const MessageCount = (props) => {
  if (props.count === 0 || props.isOpen === true) {
    return null;
  }
  return <div className={"sc-new-messages-count"}>{props.count}</div>;
};

Launcher.propTypes = {
  onMessageWasReceived: PropTypes.func,
  onMessageWasSent: PropTypes.func,
  newMessagesCount: PropTypes.number,
  isOpen: PropTypes.bool,
  handleClick: PropTypes.func,
  messageList: PropTypes.arrayOf(PropTypes.object),
  mute: PropTypes.bool,
  showEmoji: PropTypes.bool,
};

Launcher.defaultProps = {
  newMessagesCount: 0,
  showEmoji: true,
};

export default Launcher;
