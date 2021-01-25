import React, { Component } from "react";
import Message from "./Messages";

class MessageList extends Component {
  componentDidUpdate(_prevProps, _prevState) {
    this.scrollList.scrollTop = this.scrollList.scrollHeight;
  }

  render() {
    let { colors } = this.props;
    let { chatListBg } = colors;

    return (
      <div
        className="sc-message-list"
        ref={(el) => (this.scrollList = el)}
        style={{ backgroundColor: chatListBg }}
      >
        {this.props.messages.map((message, i) => {
          return <Message message={message} key={i} colors={colors} />;
        })}
      </div>
    );
  }
}

export default MessageList;
