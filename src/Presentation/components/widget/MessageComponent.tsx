import React from "react";
import { ChatMessage } from "../../../Domain/entities/ChatMessages";

import IconComponent from "./IconComponent";
import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";
import FileComponent from "./FileComponent";
import NodesComponent from "./NodesComponent";

interface MessageProps {
  message: ChatMessage;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const messageClass = message.from === "user" ? "self-end" : "self-start";

  const messageStyle = {
    backgroundColor: "white",
    fontSize: "1.0rem",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div key={message.name} className={`message ${messageClass}`}>
      <div style={{ maxWidth: "100%", wordWrap: "break-word", marginBottom: "10px" }}>
        <div className={`flex items-center space-x-1 ${message.from === "user" && "justify-end"}`}>
          {message.from !== "user" && <IconComponent icon={message.icon} />}
          <h1 className="text-sm font-light">{message.from !== "user" ? "Chatbot" : "You"}</h1>
        </div>
        <div
          className={`p-3 my-2 rounded-lg ${message.from !== "user" ? "rounded-r-lg" : "rounded-l-lg"}`}
          style={{ ...messageStyle, whiteSpace: "pre-wrap" }}
        >
          {message.icon && <FileComponent file={message.file!} name={message.name!} icon={message.icon!} />}
          {message.image && <ImageComponent image={message.image} name={message.name!} />}
          {message.text && <TextComponent text={message.text} />}
          {message.nodes && message.nodes.length > 0 && <NodesComponent nodes={message.nodes} />}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
