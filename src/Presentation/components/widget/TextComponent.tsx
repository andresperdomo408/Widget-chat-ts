import React from "react";
import moment from "moment-timezone";

interface TextProps {
  text: string;
  date: string; // Cambia el tipo a string
}

const TextComponent: React.FC<TextProps> = ({ text, date }) => {
  // Formatea la fecha en la zona horaria de Colombia (America/Bogota)
  const formattedDate = date
    ? moment(date).tz("America/Bogota").format(" hh:mm A")
    : null;

  return (
    <div>
      <p className="text-lg font-white" style={{ wordWrap: "break-word", maxWidth: "25ch" }}>
        {text}
      </p>
      <p className="text-xs text-gray-400 font-white" style={{ wordWrap: "break-word", maxWidth: "35ch" }}>
        {formattedDate}
      </p>
    </div>
  );
};

export default TextComponent;
