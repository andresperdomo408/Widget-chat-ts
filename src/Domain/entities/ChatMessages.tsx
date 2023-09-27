export interface ChatMessage {
  _id?: String;
  text?: string;
  image?: File | String;
  name?: string;
  from: string;
  icon?: string;
  file?: File | String;
  createdAt?: Date;
  updatedAt?: Date;
}
