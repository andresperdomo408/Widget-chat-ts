export interface ResponseConversation {
  _id?: string;
  name: string;
  conversation: Conversation[];
  updatedAt: string;
  createdAt: string;
}

export interface Conversation {
  _id?: string;
  image?: string;
  text?: string;
  name?: string;
  from: string;
  icon?: string;
  file?: string;
  createdAt: Date;
  updatedAt: Date;
}
