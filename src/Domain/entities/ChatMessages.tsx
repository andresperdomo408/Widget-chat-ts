export interface ChatMessage {
  _id?: String;
  text?: string;
  image?: string | File;
  name?: string;
  from: string;
  icon?: string;
  file?: string | File;
  nodes?: Nodes[];
  author?: string;
  createdAt?: Date | string;
  updatedAt?: Date;
}

export interface Nodes {
  id: string;
  type: string;
  skip: boolean;
  text: string;
  next: string;
  validationMessage: string;
  options: Options[];
}

export interface Options {
  key: string;
  label: string;
  value: string;
}
