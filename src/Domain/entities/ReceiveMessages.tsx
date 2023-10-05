export interface receivedChatMessage {
    _id?: string;
    text?: string;
    image?: string | File;
    name?: string;
    from: string;
    icon?: string;
    file?: string | File;
    createdAt?: Date | string;
    updatedAt?: Date;
    __v?: number;
  }
  