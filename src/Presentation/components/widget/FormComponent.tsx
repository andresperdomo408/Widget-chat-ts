import { FiImage, FiFile } from "react-icons/fi";
import { BsPaperclip } from "react-icons/bs";
import { BiSolidSend } from "react-icons/bi";

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
}) => {
  return (
    <>
      <form onSubmit={handleFormSubmit} className="flex flex-row space-x-0">
        <div>
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            className={`w-auto px-2  text-sm outline-none transition-colors ${
              userMessage.trim() !== "" ? "border-blue-500" : ""
            }`}
          />
        </div>

        <div className="bg-slate-200 rounded-2xl p-1">
          <label className="cursor-pointer ">
            <BsPaperclip size={22} className="text-gray-500 hover:text-blue-500" onClick={toggleButtons} />
          </label>
        </div>

        {hiddenButtons && (
          <div className="animate-fade-up animate-duration-300 fixed right-16 bottom-32 md:right-32 bg-white border-2 rounded-lg p-1 space-y-1 ">
            <div className="bg-slate-200 rounded-2xl p-1">
              <label htmlFor="imageInput" className="cursor-pointer">
                <FiImage size={22} className="text-gray-500 hover:text-blue-500" />
                <input type="file" accept="image/*" className="hidden" id="imageInput" onChange={handleImageChange} />
              </label>
            </div>
            <div className="bg-slate-200 rounded-2xl p-1">
              <label htmlFor="fileInput" className="cursor-pointer">
                <FiFile size={22} className="text-gray-500 hover:text-blue-500" />
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
          <button className="">
            <BiSolidSend
              size={22}
              className={
                userMessage.trim() !== "" || isFileLoaded || isImageLoaded
                  ? "text-blue-500 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }
              onClick={handleFormSubmit}
            />
          </button>
        </div>
      </form>
    </>
  );
};

export default FormComponent;
