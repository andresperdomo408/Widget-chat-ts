import React from "react";
import { AiFillFilePdf, AiFillFileExcel, AiFillFileWord, AiFillFileText, AiFillFile } from "react-icons/ai";

interface FileProps {
  file: string | File;
  name: string;
  icon: string;
}

const FileComponent: React.FC<FileProps> = ({ file, name, icon }) => {
  const getFileIcon = () => {
    const fileType = icon;

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
        href={typeof file === "string" ? file : URL.createObjectURL(file)}
        download={file}
        className="text-blue-500"
        style={{ wordWrap: "break-word", maxWidth: "20ch" }}
      >
        {name}
      </a>
    </div>
  );
};

export default FileComponent;
