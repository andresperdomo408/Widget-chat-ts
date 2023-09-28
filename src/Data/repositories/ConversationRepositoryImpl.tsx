import { AxiosError } from "axios";
import { ConversationRepository } from "../../Domain/repositories/ConversationRepository";
import { ResponseConversation } from "../sources/remote/models/ConversationToken";
import ApiMainBackend from "../sources/remote/api/ApiMainBackend";

export class ConversationRepositoryImpl implements ConversationRepository {
  async getById(_id: string): Promise<ResponseConversation> {
    try {
      const response = await ApiMainBackend.get<ResponseConversation>(`/conversation/get-conversation/${_id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("Error: " + JSON.stringify(e.response?.data));
      const apiError: ResponseConversation = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async create(name: string): Promise<ResponseConversation> {
    try {
      const response = await ApiMainBackend.post<ResponseConversation>("/conversation", { name });
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("Error: " + JSON.stringify(e.response?.data));
      const apiError: ResponseConversation = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }

  async removeByid(_id: string): Promise<ResponseConversation> {
    try {
      const response = await ApiMainBackend.delete<ResponseConversation>(`/conversation/delete-conversation/${_id}`);
      return Promise.resolve(response.data);
    } catch (error) {
      let e = error as AxiosError;
      console.log("Error: " + JSON.stringify(e.response?.data));
      const apiError: ResponseConversation = JSON.parse(JSON.stringify(e.response?.data));
      return Promise.resolve(apiError);
    }
  }
}
