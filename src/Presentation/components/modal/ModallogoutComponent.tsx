import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import { RemoveByIDConversationUseCase } from "../../../Domain/useCases/conversation/RemoveIDConversation";
import { useDispatch, useSelector } from "react-redux";
import { rootReducer } from "../../../Domain/storage/storage";
import { clearChat } from "../../../Domain/storage/widget/widgetSlice";
import { clearChatMessage } from "../../../Domain/storage/messageAutomatic/messageAutomaticSlice";

interface ModelProps {
  closeModal: () => void;
}

const Modal: React.FC<ModelProps> = ({ closeModal }) => {
  const [isLoading, setIsLoading] = useState(true);
  const controls = useAnimation();
  const { _id } = useSelector((state: ReturnType<typeof rootReducer>) => state.widgetState);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      controls.start({ opacity: 0, width: 0 });
      setTimeout(closeModal, 300);
    }, 10000);

    return () => clearTimeout(timer);
  }, [closeModal, controls]);

  const handleDisconnect = async () => {
    try {
      if (_id) {
        await RemoveByIDConversationUseCase(_id);
        dispatch(clearChat());
        dispatch(clearChatMessage());
        window.location.reload();
        closeModal();
      }
    } catch (error) {
      console.error("Error al desconectar:", error);
    }
  };

  return (
    <div className="fixed bottom-40 right-8 md:right-20  z-50">
      <div className="modal bg-white p-2 rounded shadow-md">
        <h2 className="text-center text-lg font-semibold mb-2">¿Deseas desconectarte?</h2>
        <div className="flex justify-center mb-2">
          <button onClick={closeModal} className="bg-green-500 text-white px-3 py-1 rounded mr-2">
            Permanecer en línea
          </button>
          <button
            onClick={handleDisconnect} // Asocia la función handleDisconnect al botón "Desconectar"
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Desconectar
          </button>
        </div>
      </div>
      {isLoading && (
        <motion.div
          className="bg-green-500 h-2 w-full rounded-full"
          initial={{ opacity: 1, width: "100%" }}
          animate={{ opacity: 1, width: "0%" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 10 }}
        />
      )}
    </div>
  );
};

export default Modal;
