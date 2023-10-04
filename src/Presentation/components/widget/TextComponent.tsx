import React from "react";

interface TextProps {
  text: string;
}

const TextComponent: React.FC<TextProps> = ({ text }) => {
  return (
    <p className="text-xs font-white" style={{ wordWrap: "break-word", maxWidth: "35ch" }}>
      {text}
    </p>
  );
};

export default TextComponent;
