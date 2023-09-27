import React from "react";

interface ImageProps {
  image: File;
  name: string;
}

const ImageComponent: React.FC<ImageProps> = ({ image, name }) => {
  return (
    <div className="text-center">
      <img
        src={URL.createObjectURL(image)} // Establece la URL de la imagen
        alt={name} // Establece el atributo "alt"
        className="w-32 h-auto cursor-pointer"
        onClick={() => window.open(URL.createObjectURL(image), "_blank")} // Abre la imagen en una nueva ventana al hacer clic
      />
    </div>
  );
};

export default ImageComponent;
