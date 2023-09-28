import React from "react";
import { ChatMessage } from "../../../Domain/entities/ChatMessages";
import IconComponent from "./IconComponent";
import ImageComponent from "./ImageComponent";
import TextComponent from "./TextComponent";
import FileComponent from "./FileComponent";

interface MessageProps {
  message: ChatMessage;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  return (
    <div key={message.name} className={`message ${message.from === "user" ? "self-end" : "self-start"}`}>
      <div style={{ maxWidth: "100%", wordWrap: "break-word", marginBottom: "5px" }}>
        <div className={`flex items-center space-x-1 ${message.from === "user" && "justify-end"}`}>
          {message.from !== "user" && <IconComponent icon={message.icon} />}
          <h1 className="text-sm font-light">{message.from !== "user" ? "Chatbot" : "You"}</h1>
        </div>
        <div
          className={`bg-white p-1 my-1 rounded-t-lg ${message.from !== "user" ? "rounded-r-lg" : "rounded-l-lg"}`}
          style={{ whiteSpace: "pre-wrap" }}
        >
          {message.icon && <FileComponent file={message.file!} name={message.name!} icon={message.icon!} />}
          {message.image && <ImageComponent image={message.image} name={message.name!} />}
          {message.text && <TextComponent text={message.text} />}
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
