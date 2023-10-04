import { Nodes, Options } from "../../../Domain/entities/ChatMessages";
import TextComponent from "./TextComponent";

interface NodeProps {
  nodes: Nodes[];
}

const NodesComponent: React.FC<NodeProps> = ({ nodes }) => {
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
                        console.log(`Botón presionado: ${option.label}`);
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
