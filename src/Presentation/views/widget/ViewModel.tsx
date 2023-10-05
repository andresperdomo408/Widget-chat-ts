import { useEffect, useRef, useState } from "react";
import socket from "../../utils/SocketIO";
import { ChatMessage } from "../../../Domain/entities/ChatMessages";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../../../Domain/storage/storage";
import { GetByIDConversationUseCase } from "../../../Domain/useCases/conversation/GetByIDConversation";
import { initial } from "../../../Domain/storage/messageAutomatic/messageAutomaticSlice";
import { UpdateConversationUseCase } from "../../../Domain/useCases/conversation/UpdateConversation";

const WidgetModel = (messagesDiv: HTMLElement | null) => {
  //Redux
  const data = useSelector((state: ReturnType<typeof rootReducer>) => state.widgetState);
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

  */const handleOptionClick = (optionValue: string) => {
    // You can now access the selected option value here and use it as needed
    console.log(`Selected option: ${optionValue}`);
    // Perform any other actions with the selected option value in your view model
  };

  useEffect(() => {
    socket.connect();

    socket.on("chat-message-response", async (message) => {
      setChatMessages((prevMessages) => [...prevMessages, { nodes: message, from: "bot" }]);
      const from = "bot";
      if (data._id) {
        await UpdateConversationUseCase(data._id!, from, message);
      }
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
    if (!data.status) {
      return setShowChatForm(!showChatForm);
    }
    setShowChat(!showChat);
  };

  const toggleChatForm = () => {
    setShowChatForm(false);
    setShowChat(!showChat);
  };

  const getByIdChatMessages = async () => {
    if (data._id) {
      const result = await GetByIDConversationUseCase(data._id!);
      setChatMessages((prevMessages) => [...prevMessages, ...result.conversation]);
      console.log(result.conversation);
    }
  };

  // Bot set Messages
  useEffect(() => {
    if (showChat && !welcome) {
      socket.emit("chat-message", {
        _id: data._id,
        text: "¡Escribe un mensaje para iniciar al conversación.!",
        from: "bot",
      });
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { text: "¡Escribe un mensaje para iniciar al conversación.!", from: "bot" },
      ]);
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
            _id: data._id,
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
          _id: data._id,
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
      socket.emit("chat-message", { _id: data._id, text: userMessage, from: "user", user: data });
      const date = new Date().toISOString()
      setChatMessages((prevMessages) => [...prevMessages, { text: userMessage, from: "user" , createdAt:date}]);
    }

    setUserMessage("");
    setSelectedImage(null);
    setSelectedFile(null);
  };

const buttonResponse =(event:string)=> {

  socket.emit("chat-message", { _id: data._id, text: event , from: "user", user: data });
      setChatMessages((prevMessages) => [...prevMessages, { text: event, from: "user" }]);
}

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
    buttonResponse,
    getByIdChatMessages,
    setUserMessage,
    toggleChatForm,
    toggleChat,
    toggleButtons,
    handleFileChange,
    handleImageChange,
    handleFormSubmit,
    handleOptionClick,
  };
};

export default WidgetModel;
