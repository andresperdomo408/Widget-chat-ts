import useViewModel from "./ViewModel";
import Message from "../../../assets/conversacion.png";

import MessageComponent from "../../components/widget/MessageComponent";
import HeaderComponent from "../../components/widget/HeaderComponent";
import FooterComponent from "../../components/widget/FooterComponent";
import FormComponent from "../../components/widget/FormComponent";
import FormChatComponent from "../../components/widget/FormChatComponent";
import { useEffect } from "react";

const WidgetView = () => {
  const messagesDiv = document.getElementById("messages");
  const {
    messagesEndRef,
    isFileLoaded,
    isImageLoaded,
    userMessage,
    showChat,
    showChatForm,
    chatMessages,
    hiddenButtons,
    getByIdChatMessages,
    setUserMessage,
    toggleChatForm,
    toggleChat,
    toggleButtons,
    handleFileChange,
    handleImageChange,
    handleFormSubmit,
  } = useViewModel(messagesDiv);

  useEffect(() => {
    getByIdChatMessages();
  }, []);

  return (
    <div className="fixed bottom-0 right-0 flex flex-col justify-end items-end h-screen w-screen">
      {showChatForm && <FormChatComponent toggleChatForm={toggleChatForm} />}
      {showChat && (
        <div className="fixed bottom-10 right-6 md:right-20 max-w-md bg-white shadow-xl border-lg rounded-lg">
          <HeaderComponent />
          <div
            id="messages"
            className="flex flex-col p-10 static overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch max-h-40 0 bg-slate-200"
          >
            <div ref={messagesEndRef}></div>
            {chatMessages.map((message, index) => (
              <MessageComponent key={index} message={message} />
            ))}
          </div>
          <div className="flex items-center  space-x-5 p-5">
            <FormComponent
              handleFormSubmit={handleFormSubmit}
              userMessage={userMessage}
              setUserMessage={setUserMessage}
              toggleButtons={toggleButtons}
              hiddenButtons={hiddenButtons}
              handleImageChange={handleImageChange}
              handleFileChange={handleFileChange}
              isFileLoaded={isFileLoaded}
              isImageLoaded={isImageLoaded}
            />
          </div>
          <FooterComponent />
        </div>
      )}
      <div
        className="w-14 h-14 mb-3 rounded-full shadow-lg bg-blue-500 m-3 transform hover:animate-jump cursor-pointer"
        onClick={toggleChat}
      >
        <img
          src={Message}
          alt="Message"
          className="w-full h-full p-3 border-2 border-white object-cover rounded-full"
        />
      </div>
    </div>
  );
};

export default WidgetView;
