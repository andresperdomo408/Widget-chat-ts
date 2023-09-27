import { ConversationRepositoryImpl } from "../../../Data/repositories/ConversationRepositoryImpl";

const { getById } = new ConversationRepositoryImpl();

export const GetByIDConversationUseCase = async (_id: string) => {
  return await getById(_id);
};
