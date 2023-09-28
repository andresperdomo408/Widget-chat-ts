import { ResponseConversation } from "../../Data/sources/remote/models/ConversationToken";

export interface ConversationRepository {
  create(name: string): Promise<ResponseConversation>;
  getById(_id: string): Promise<ResponseConversation>;
  removeById(_id: string): Promise<ResponseConversation>;
}
