import { ConversationRepositoryImpl } from "../../../Data/repositories/ConversationRepositoryImpl";

const { removeByid } = new ConversationRepositoryImpl();

export const RemoveByIDConversationUseCase = async (_id: string) => {
  return await removeByid(_id);
};
