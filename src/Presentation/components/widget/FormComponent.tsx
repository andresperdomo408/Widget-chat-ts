import React, { useState } from 'react';
import { FiImage, FiFile } from 'react-icons/fi';
import { BsPaperclip, BsEmojiSmile } from 'react-icons/bs';
import { BiSolidSend } from 'react-icons/bi';
import EmojiPicker from 'emoji-picker-react';

interface FormComponentProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  userMessage: string;
  setUserMessage: (value: string) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleButtons: () => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hiddenButtons: boolean;
  isFileLoaded: boolean;
  isImageLoaded: boolean;
  chatMessages: string[]; // Un arreglo para almacenar los mensajes en el chat
}

const FormComponent: React.FC<FormComponentProps> = ({
  handleFormSubmit,
  userMessage,
  setUserMessage,
  handleFileChange,
  toggleButtons,
  handleImageChange,
  hiddenButtons,
  isFileLoaded,
  isImageLoaded,
  chatMessages, // Asumiendo que tienes un arreglo para los mensajes del chat
}) => {
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleEmojiClick = (event, emojiObject) => {
    setSelectedEmoji(emojiObject.emoji);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const messageWithEmoji = userMessage + selectedEmoji;
    setUserMessage(messageWithEmoji);
    setSelectedEmoji(''); // Restablecemos el emoji seleccionado
    handleFormSubmit(e);
  
    // Aquí debes enviar messageWithEmoji al servidor en tiempo real
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-row space-x-0">
      <div>
  <input
    type="text"
    value={userMessage}
    onChange={(e) => setUserMessage(e.target.value)}
    placeholder="Escribe un mensaje..."
    className={`w-auto px-5 text-sm outline-none ${
      userMessage.trim() !== '' ? 'border-blue-500' : ''
    }`}
  />
  {selectedEmoji && (
    <span role="img" aria-label="Emoji seleccionado">
      {selectedEmoji}
    </span>
  )}
</div>

    
        <div className="bg-blue-500 rounded-2xl p-1 relative">
          <label className="cursor-pointer">
            <BsPaperclip
              size={22}
              className="text-white hover:text-blue-500"
              onClick={toggleButtons}
            />
          </label>
          {isEmojiPickerVisible && (
  <div className="absolute right-0 transform translate-x-1/4 bottom-12 ">
    <div className="bg-white rounded-lg p-1">
      <EmojiPicker
        onEmojiClick={handleEmojiClick}
        pickerStyle={{ width: '30px !important', height: '30px !important' }}
      />
    </div>
  </div>
)}


        </div>

        {hiddenButtons && (
          <div className="animate-fade-up animate-duration-300 fixed right-16 bottom-32 md:right-32 bg-white border-2 rounded-lg p-1 space-y-1">
            <div className="bg-slate-200 rounded-2xl p-1">
              <label htmlFor="imageInput" className="cursor-pointer">
                <FiImage
                  size={22}
                  className="text-gray-500 hover:text-blue-500"
                />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="imageInput"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="bg-slate-200 rounded-3xl p-1">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FiFile
                  size={22}
                  className="text-gray-500 hover:text-blue-500"
                />
                <input
                  type="file"
                  accept=".doc,.pdf,.txt,.xlsx"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                />
              </label>
              
            </div>
            
          </div>
          
        )}

        <div className="flex items-center">
        <button
          className=""
          onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
        >
          <BsEmojiSmile size={20} className="text-gray-500 mr-1 ml-1" />
        </button>
          <button
            className=""
            onClick={handleSubmit}
            disabled={
              userMessage.trim() === '' && !isFileLoaded && !isImageLoaded
            }
          >
            
            <BiSolidSend
              size={22}
              className={
                userMessage.trim() !== '' || isFileLoaded || isImageLoaded
                  ? 'text-blue-400 cursor-pointer'
                  : 'text-gray-300 cursor-not-allowed'
              }
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
