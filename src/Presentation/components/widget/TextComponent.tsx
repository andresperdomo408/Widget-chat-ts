import React from "react";

interface TextProps {
  text: string;
}

const TextComponent: React.FC<TextProps> = ({ text }) => {
  return (
    <p className="text-sl font-white" style={{ wordWrap: "break-word", maxWidth: "20ch" }}>
   {text}
    </p>
  );
};

export default TextComponent;
