import { ConversationRepositoryImpl } from "../../../Data/repositories/ConversationRepositoryImpl";

const { create } = new ConversationRepositoryImpl();

export const CreateConversationUseCase = async (name: string) => {
  return await create(name);
};
