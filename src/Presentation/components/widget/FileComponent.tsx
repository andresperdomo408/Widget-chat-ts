import React from "react";
import { AiFillFilePdf, AiFillFileExcel, AiFillFileWord, AiFillFileText, AiFillFile } from "react-icons/ai";

interface FileProps {
  file: File;
  name: string;
}

const FileComponent: React.FC<FileProps> = ({ file, name }) => {
  const getFileIcon = () => {
    const fileType = file.type;

    if (fileType === "application/pdf") {
      return <AiFillFilePdf color="red" size={30} />;
    } else if (fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      return <AiFillFileExcel color="green" size={30} />;
    } else if (fileType === "application/msword") {
      return <AiFillFileWord color="blue" size={30} />;
    } else if (fileType === "text/plain") {
      return <AiFillFileText color="gray" size={30} />;
    } else {
      return <AiFillFile color="gray" size={30} />;
    }
  };

  const fileIcon = getFileIcon();

  return (
    <div className="flex flex-row justify-center items-center text-center">
      {fileIcon}
      <a
        href={URL.createObjectURL(file)} // Establece el enlace al archivo
        download={file.name} // Establece el atributo "download" para permitir la descarga
        className="text-blue-500" // Agrega estilos para el enlace
        style={{ wordWrap: "break-word", maxWidth: "20ch" }}
      >
        {name}
      </a>
    </div>
  );
};

export default FileComponent;
