import React, { Component } from "react";
import TextMessage from "./TextMessage";
import EmojiMessage from "./EmojiMessage";
import FileMessage from "./FileMessage";
import chatIconUrl from "./../../assets/chat-icon.svg";

class Message extends Component {
  _renderMessageOfType(type) {
    switch (type) {
      case "text":
        console.log("TYPE :", this.props);
        let { colors } = this.props;
        let messageBg =
          this.props.message.author === "me"
            ? colors.chatMeBg
            : colors.chatThemBg;
        let textColor =
          this.props.message.author === "me"
            ? colors.chatMeText
            : colors.chatThemText;

        return (
          <TextMessage
            {...this.props.message}
            style={{ backgroundColor: messageBg, color: textColor }}
          />
        );
      case "emoji":
        return <EmojiMessage {...this.props.message} />;
      case "file":
        return <FileMessage {...this.props.message} />;
      default:
        console.error(
          `Attempting to load message with unsupported file type '${type}'`
        );
    }
  }

  render() {
    let contentClassList = [
      "sc-message--content",
      this.props.message.author === "me" ? "sent" : "received",
    ];

    return (
      <div className="sc-message">
        <div className={contentClassList.join(" ")}>
          {/* <div
            className="sc-message--avatar"
            style={{
              backgroundImage: `url(${chatIconUrl})`,
            }}
          ></div> */}
          {this._renderMessageOfType(this.props.message.type)}
        </div>
      </div>
    );
  }
}

export default Message;
