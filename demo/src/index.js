import React, { Component } from "react";
import { render } from "react-dom";
import { Launcher } from "../../src";
import messageHistory from "./messageHistory";
import TestArea from "./TestArea";
import Header from "./Header";
import Footer from "./Footer";
import monsterImgUrl from "./../assets/monster.png";
import "./../assets/styles";

class Demo extends Component {
  constructor() {
    super();
    this.state = {
      messageList: messageHistory,
      newMessagesCount: 0,
      isOpen: true,
    };
  }

  _onMessageWasSent(message) {
    this.setState({
      messageList: [...this.state.messageList, message],
    });
  }

  _onFilesSelected(fileList) {
    const objectURL = window.URL.createObjectURL(fileList[0]);
    this.setState({
      messageList: [
        ...this.state.messageList,
        {
          type: "file",
          author: "me",
          data: {
            url: objectURL,
            fileName: fileList[0].name,
          },
        },
      ],
    });
  }

  _sendMessage(text) {
    if (text.length > 0) {
      const newMessagesCount = this.state.isOpen
        ? this.state.newMessagesCount
        : this.state.newMessagesCount + 1;
      this.setState({
        newMessagesCount: newMessagesCount,
        messageList: [
          ...this.state.messageList,
          {
            author: "them",
            type: "text",
            data: { text },
          },
        ],
      });
    }
  }

  _handleClick() {
    this.setState({
      isOpen: !this.state.isOpen,
      newMessagesCount: 0,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <TestArea onMessage={this._sendMessage.bind(this)} />
        <Launcher
          agentProfile={{
            teamName: "react-chat-window",
            imageUrl:
              "https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png",
          }}
          onMessageWasSent={this._onMessageWasSent.bind(this)}
          onFilesSelected={this._onFilesSelected.bind(this)}
          messageList={this.state.messageList}
          newMessagesCount={this.state.newMessagesCount}
          handleClick={this._handleClick.bind(this)}
          isOpen={this.state.isOpen}
          showEmoji={false}
          colors={{
            primary: "#2c2c54",
            secondary: "#706fd3",
            headerBg: "red",
            headerText: "#ecf0f1",
            headerFontSize: "32px",
            chatListBg: "#474787",
            chatMeBg: "#706fd3",
            chatMeText: "#ecf0f1",
            chatThemBg: "#706fd3",
            chatThemText: "#bdc3c7",
            inputBg: "#2c2c54",
            inputPlaceholder: "#aaa69d",
            inputText: "#ffda79",
            inputIconColor: "#ffda79",
          }}
        />
        <img className="demo-monster-img" src={monsterImgUrl} />
        <Footer />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
