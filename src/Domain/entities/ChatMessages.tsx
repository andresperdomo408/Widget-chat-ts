export interface ChatMessage {
  _id?: String;
  text?: string;
  image?: string | File;
  name?: string;
  from: string;
  icon?: string;
  file?: string | File;
  createdAt?: Date;
  updatedAt?: Date;
}
