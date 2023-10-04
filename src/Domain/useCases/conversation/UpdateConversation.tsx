import { ConversationRepositoryImpl } from "../../../Data/repositories/ConversationRepositoryImpl";
import { Nodes } from "../../entities/ChatMessages";

const { update } = new ConversationRepositoryImpl();

export const UpdateConversationUseCase = async (_id: string, from: string, nodes: Nodes) => {
  return await update(_id, from, nodes);
};
