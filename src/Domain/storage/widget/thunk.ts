import { AnyAction } from "@reduxjs/toolkit";
import { name } from "../../../Presentation/constants/Contants";
import { FormChatInterface } from "../../entities/FormChat";
import { CreateConversationUseCase } from "../../useCases/conversation/CreateConversation";
import { initial } from "./widgetSlice";

export const widgetForm = (form: FormChatInterface) => {
  return async (dispatch: (action: AnyAction) => void) => {
    try {
      const { _id } = await CreateConversationUseCase(name);
      return dispatch(initial({ _id, ...form }));
    } catch (error) {
      console.log(error);
    }
  };
};
