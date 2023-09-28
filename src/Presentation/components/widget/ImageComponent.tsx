import React from "react";

interface ImageProps {
  image: string | File;
  name: string;
}

const ImageComponent: React.FC<ImageProps> = ({ image, name }) => {
  return (
    <div className="text-center">
      <img
        src={typeof image === "string" ? image : URL.createObjectURL(image)}
        alt={name}
        className="w-32 h-auto cursor-pointer"
        onClick={() => {
          if (typeof image === "object") {
            window.open(URL.createObjectURL(image), "_blank");
          }
        }}
      />
    </div>
  );
};

export default ImageComponent;
