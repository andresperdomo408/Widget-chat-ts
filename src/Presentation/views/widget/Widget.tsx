import useViewModel from "./ViewModel";
import Message from "../../../assets/conversacion.png";
import MessageComponent from "../../components/widget/MessageComponent";
import HeaderComponent from "../../components/widget/HeaderComponent";
import FooterComponent from "../../components/widget/FooterComponent";
import FormComponent from "../../components/widget/FormComponent";
import FormChatComponent from "../../components/widget/FormChatComponent";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const WidgetView = () => {
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMessageVisible(true);
    }, 3000);
  }, []);

  const chatVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
      },
    },
  };

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
    <div className="fixed bottom-10 right-0   flex flex-col justify-end items-end h-screen w-screen">
      {showChatForm && <FormChatComponent toggleChatForm={toggleChatForm} />}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="fixed bottom-15 right-20 md:right-20 max-w-8xl bg-white shadow-xl border-lg rounded-lg" // Ajusta la clase 'max-w-2xl' para hacerlo más ancho
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={chatVariants}
          >
            <HeaderComponent showChat={showChat} />
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={chatVariants}
            >
              <div
                id="messages"
                className="flex flex-col p-5 static overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch max-h-60 bg-slate-100"
              >
                <div ref={messagesEndRef}></div>
                {chatMessages.map((message, index) => (
                  <MessageComponent key={index} message={message} />
                ))}
              </div>
              <div className="flex items-center space-x-5 p-5">
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {isMessageVisible && (
        <motion.div
          className="w-15 h-14 mb-3 rounded-full shadow-lg bg-blue-500 m- transform hover:animate-jump cursor-pointer"
          onClick={toggleChat}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity:2 , scale: 1 }}
          transition={{ duration: 1.0 }}
        >
          <img
            src={Message}
            alt="Message"
            className="w-full h-full p-3 border-2 border-white object-cover rounded-full"
          />
        </motion.div>
      )}
    </div>
  );
};

export default WidgetView;
