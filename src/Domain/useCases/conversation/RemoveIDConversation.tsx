import { ConversationRepositoryImpl } from "../../../Data/repositories/ConversationRepositoryImpl";

const { removeById } = new ConversationRepositoryImpl();

export const RemoveByIDConversationUseCase = async (_id: string) => {
  return await removeById(_id);
};
