import { useState } from "react";
import React from 'react'; // Asegúrate de importar React
import Message from "../../../assets/conversacion.png";
import { AiOutlineCloseCircle, AiOutlineMinusCircle } from "react-icons/ai";
import Modal from "../modal/ModallogoutComponent";

interface HeaderComponentProps {
  showChat: (value: boolean) => void; 
}

const HeaderComponent: React.FC<HeaderComponentProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-blue-500 flex w-full h-20 shadow-lg rounded-t-lg items-center">
      <div className="w-14 h-14 mb-3 rounded-full shadow-lg bg-blue-500 m-5 transform cursor-pointer">
        <img
          src={Message}
          alt="Message"
          className="w-full h-full p-3 border-2 border-white object-cover rounded-full"
        />
        <div className="w-2 h-2 bg-green-400 rounded-full border-2 border-white absolute left-10 top-9"></div>
      </div>
      <div className="text-left ml-2">
        <h2 className="text-white text-lg font-semibold">Agente</h2>
        <h2 className="text-white text-xs">Online</h2>
      </div>
     
      {/* Botón de cerrar */}
      <button onClick={openModal}>
        <AiOutlineCloseCircle className="text-white text-2xl ml-20" />
      </button>
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default HeaderComponent;
