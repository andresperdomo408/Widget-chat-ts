import Message from "../../../assets/conversacion.png";

const HeaderComponent = () => {
  return (
    <div className="bg-blue-500 flex w-full h-20 shadow-lg rounded-t-lg items-center">
      <div className="w-14 h-14 mb-3 rounded-full shadow-lg bg-blue-500 m-3 transform cursor-pointer">
        <img
          src={Message}
          alt="Message"
          className="w-full h-full p-3 border-2 border-white object-cover rounded-full"
        />
        <div className="w-2 h-2 bg-green-400 rounded-full border-2 border-white absolute left-10 top-9"></div>
      </div>
      <div className="text-left ml-2">
        <h2 className="text-white text-lg font-semibold">Agente</h2>
        <h2 className="text-white text-xs">Online</h2>
      </div>
    </div>
  );
};

export default HeaderComponent;
