import React from "react";
import { BsRobot } from "react-icons/bs";

interface IconProps {
  icon: string | File | undefined;
}

const IconComponent: React.FC<IconProps> = ({ icon }) => {
  const getIconComponent = () => {
    switch (icon) {
      case "bot":
        return <BsRobot size={20} color="white" className="bg-blue-500 rounded-full w-3 h-3" />;
      default:
        return <BsRobot size={20} color="white" className="bg-blue-500 rounded-full w-3 h-3" />;
    }
  };

  const iconComponent = getIconComponent();

  return <div className="flex items-center space-x-1 justify-end">{iconComponent && iconComponent}</div>;
};

export default IconComponent;
