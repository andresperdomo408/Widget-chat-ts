import { useEffect, useRef, useState } from "react";
import socket from "../../utils/SocketIO";
import { ChatMessage } from "../../../Domain/entities/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../../../Domain/storage/storage";
import { GetByIDConversationUseCase } from "../../../Domain/useCases/conversation/GetByIDConversation";
import { initial } from "../../../Domain/storage/messageAutomatic/messageAutomaticSlice";

const WidgetModel = (messagesDiv: HTMLElement | null) => {
  //Redux
  const { status, _id } = useSelector((state: ReturnType<typeof rootReducer>) => state.widgetState);
  const { welcome } = useSelector((state: ReturnType<typeof rootReducer>) => state.messageAutomaticState);
  const dispatch = useDispatch();

  // Show Chat
  const [showChatForm, setShowChatForm] = useState(false);
  const [showChat, setShowChat] = useState(false);

  // Chat Messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Buttons Widget
  const [hiddenButtons, setHiddenButtons] = useState(false);

  // Upload and Change Images and Files
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isFileLoaded, setIsFileLoaded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  /* 
  
   SOCKET MANAGE ALL TYPES MESSAGES 

  */

  useEffect(() => {
    socket.connect();

    socket.on("chat-message-response", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, { text: message, from: "bot" }]);
    });

    socket.on("file-upload-response", (response) => {
      setChatMessages((prevMessages) => [...prevMessages, { text: response, from: "bot" }]);
    });

    socket.on("image-upload-response", (response) => {
      setChatMessages((prevMessages) => [...prevMessages, { text: response, from: "bot" }]);
    });
  }, []);

  // Toggle Chat
  const toggleChat = () => {
    if (!status) {
      return setShowChatForm(!showChatForm);
    }
    setShowChat(!showChat);
  };

  const toggleChatForm = () => {
    setShowChatForm(false);
    setShowChat(!showChat);
  };

  const getByIdChatMessages = async () => {
    if (_id) {
      const result = await GetByIDConversationUseCase(_id!);
      console.log(result.conversation);
      setChatMessages((prevMessages) => [...prevMessages, ...result.conversation]);
    }
  };

  // Bot set Messages
  useEffect(() => {
    if (showChat && !welcome) {
      socket.emit("chat-message", { _id, text: "¡Hola bienvenido!", from: "bot" });
      setChatMessages((prevMessages) => [...prevMessages, { text: "¡Hola bienvenido!", from: "bot" }]);
      dispatch(initial());
    }
  }, [showChat]);

  // Calculate to high total of box from messages
  useEffect(() => {
    if (chatMessages.length > 0 && messagesDiv) {
      const totalHeight = messagesDiv.scrollHeight;
      messagesDiv.scrollTo(0, totalHeight);
    }
  }, [chatMessages, messagesDiv]);

  // Toggle Buttons
  const toggleButtons = () => {
    setHiddenButtons(!hiddenButtons);
  };

  /*
  
    Upload and Change Images and Files

  
  */

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (fileInput) {
      const file = fileInput.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    }
    setIsFileLoaded(true);
    setHiddenButtons(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageInput = e.target;
    if (imageInput) {
      const imageFile = imageInput.files?.[0];
      if (imageFile) {
        setSelectedImage(imageFile);
      }
    }
    setIsImageLoaded(true);
    setHiddenButtons(false);
  };

  // Submit form

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (userMessage.trim() === "" && !selectedImage && !selectedFile) return;

    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64Data = event.target.result.toString();
          socket.emit("image-upload", {
            _id,
            base64Data,
            name: selectedImage.name,
            from: "user",
            text: userMessage,
          });
          setChatMessages((prevMessages) => [
            ...prevMessages,
            {
              image: selectedImage,
              name: selectedImage.name,
              from: "user",
              text: userMessage,
            },
          ]);
        }
      };
      reader.readAsDataURL(selectedImage);
    } else if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Data = event.target?.result;
        socket.emit("file-upload", {
          _id,
          base64Data,
          icon: selectedFile.type,
          name: selectedFile.name,
          from: "user",
          file: selectedFile,
          text: userMessage,
        });

        setChatMessages((prevMessages) => [
          ...prevMessages,
          { icon: selectedFile.type, name: selectedFile.name, from: "user", file: selectedFile, text: userMessage },
        ]);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      socket.emit("chat-message", { _id, text: userMessage, from: "user" });
      setChatMessages((prevMessages) => [...prevMessages, { text: userMessage, from: "user" }]);
    }

    setUserMessage("");
    setSelectedImage(null);
    setSelectedFile(null);
  };

  return {
    socket,
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
  };
};

export default WidgetModel;

