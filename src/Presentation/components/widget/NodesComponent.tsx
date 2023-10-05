import { Nodes, Options } from "../../../Domain/entities/ChatMessages";
import TextComponent from "./TextComponent";

interface NodeProps {
  nodes: Nodes[];
  buttonResponse: (event: string) => void

}

const NodesComponent: React.FC<NodeProps> = ({ nodes, buttonResponse }) => {
  return (
    <>
      {nodes.map((node: Nodes, index: number) => (
        <div key={index}>
          <div>{node.type === "MESSAGE" && <TextComponent text={node.text} />}</div>
          <div>
            {node.type === "OPTION" && (
              <>
                {node.options.map((option: Options) => (
                  <div className="my-2 rounded-lg shadow-md" key={option.key}>
                    <button
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white text-xs font-sans py-1 px-4 rounded"
                      onClick={() => {
                        // Llama a la función de manejo de clics con el valor de la opción
                        buttonResponse(option.value);
                      }}
                    >
                      {option.label}
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      ))}
    </>
  );
};


export default NodesComponent;
