import { ResponseConversation } from "../../Data/sources/remote/models/ConversationToken";
import { Nodes } from "../entities/ChatMessages";

export interface ConversationRepository {
  create(name: string): Promise<ResponseConversation>;
  getById(_id: string): Promise<ResponseConversation>;
  removeById(_id: string): Promise<ResponseConversation>;
  update(_id: string, from: string, nodes: Nodes): Promise<ResponseConversation>;
}
